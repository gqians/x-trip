import React from 'react';
import Button from '../../../components/button';
import Input from '../../../components/input';
import List from '../../../components/list';
import fieldFragment from './fieldsFrags';
import PropTypes from 'prop-types';
import moment from 'moment';
import s from './style.css';
const routePrefix = './tourist';
class ProductTourist extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		rolesMap: PropTypes.object,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			replace: PropTypes.func.isRequired
		}).isRequired,
		location: PropTypes.shape({
			search: PropTypes.string.isRequired
		}).isRequired
		// TouristUpdateById: PropTypes.func
	};
	static defaultProps = {
		className: '',
		rolesMap: {}
	};
	state={
		searchValue: '',
		showPop: false
	}
	columnsBuilder = () => [
		{
			title: '景点名',
			key: 'name',
			dataIndex: 'name',
			render (x, recode) {
				return recode.name;
			}
		},
		{
			title: '上架时间',
			key: 'addTime',
			dataIndex: 'name',
			render (x, recode) {
				const time = moment(recode['addedTime']).format('YYYY-MM-DD HH:mm:ss');
				return time;
			}
		},
		{
			title: '地址',
			key: 'address',
			dataIndex: 'name',
			render (x, recode) {
				return <div className={ s.address }>{recode.address || '暂无'}</div>;
			}
		},
		{
			title: '价格',
			key: 'price',
			dataIndex: 'name',
			render (x, recode) {
				return <div className={ s.price }>{recode.price || '暂无'}</div>;
			}
		},
		{
			title: '',
			key: 'setting',
			dataIndex: '',
			render: (x, recode) => {
				return (
					<div className={ s.setting }>
						<div className={ s.addBlack } onClick={ () => { this.addBlackHandler(); } }>修改信息</div>
					</div>
				);
			}
		}
	]
	// 函数
	addBlackHandler=() => {
		const { showPop } = this.state;
		this.setState({
			showPop: !showPop
		});
	}
	/**
	 * 生成search字符串
	 */
	searchStringBuilder = fields => {
		const { location } = this.props;
		const search = new URLSearchParams(location.search);

		Object.keys(fields).forEach(name => {
			const value = fields[name];
			console.log('vaule' + value);
			value === undefined ? search.delete(name) : search.set(name, value);
		});

		return search;
	};
	handleFilterChange = filter => {
		const search = this.searchStringBuilder({
			filter: JSON.stringify(filter),
			page: 1,
			sort: '_ID_DESC'
		});
		console.log(`${ routePrefix }?${ search }`);
		this.props.history.replace(`${ routePrefix }?${ search }`);
		// this.refetc
	};
	searchHandler=() => {
		const {searchValue} = this.state;
		const { location } = this.props;
		const search = new URLSearchParams(location.search);
		const filter = JSON.parse(search.get('filter') || '{}');
		filter.nameRegex = searchValue;
		this.handleFilterChange(filter);
	}
	searchChangeHandler=(e) => {
		this.setState({
			searchValue: e.target.value
		});
	}
	render () {
		const { searchValue } = this.state;
		return (
			<div className={ s.tourist }>
				<div className={ s.firstRow }>
					<div className={ s.search }>
						<Input
							size="default"
							className={ s.input }
							value={ searchValue }
							searchHandler={ this.searchHandler }
							onChange={ this.searchChangeHandler }
							placeholder="输入订单名关键字搜索"
						/>
					</div>
				</div>
				<div className={ s.secondRow }>
					<Button text="添加旅游点" />
					<span className={ s.space } />
					<Button text="重置"/>
				</div>
				<div className={ s.thirdRow }>
					<List
						className = { s.tableWapper }
						fieldsFragment = { fieldFragment }
						fieldName = "TouristSpots"
						fieldsFragmentName = "touristSpotsFields"
						routePrefix= { routePrefix }
						columns={ this.columnsBuilder() }
					/>
				</div>
			</div>
		);
	}
}
export default ProductTourist;
