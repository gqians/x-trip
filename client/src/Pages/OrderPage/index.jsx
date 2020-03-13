/* eslint-disable react/prop-types */
import React from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import List from '../../components/list';
import Select from 'react-select';
import PropTypes from 'prop-types';
import fieldFragment from './fieldsFrags';
import moment from 'moment';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import s from './style.css';
import cn from 'classnames';
// import Order from '../../../../hapi/mongoModels/Order';
const routePrefix = './order';
const vipOptions = [
	{ value: 'tourism', label: '旅游(单景点)' },
	{ value: 'route', label: '旅游(多景点)' },
	{ value: 'hotel', label: '住宿' }
];
const vipOptionsofBlack = [
	{ value: true, label: '完成' },
	{ value: false, label: '未完成' }
];
class Order extends React.PureComponent {
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
		selectedOption: null,
		searchValue: '',
		selectedOptionofBlack: null,
		changed: false
	}
	addBlackHandler=(id, black) => {
		const { TouristUpdateById } = this.props;
		TouristUpdateById(id, black).then((res) => {
			this.props.history.go(0);
		});
		// console.log('11');
	}
	findProduct=() => {
		this.props.history.push('/home/product/route');
	}
	columnsBuilder = () => [
		{
			title: '订单名',
			key: 'name',
			dataIndex: 'name',
			render (x, recode) {
				return recode.name;
			}
		},
		{
			title: '下单时间',
			key: 'orderTime',
			dataIndex: '',
			render (x, recode) {
				const time = moment(recode['order_time']).format('YYYY-MM-DD HH:mm:ss');
				return time;
			}
		},
		{
			title: '是否完成',
			key: 'complete',
			dataIndex: '',
			render (x, recode) {
				// return recode['complete'] ? '完成' : '未完成';
				let iconClassName = 'uncomplete';
				if (recode.complete === true) {
					iconClassName = 'complete';
				}
				return (
					<div className = { s.icon }>
						<span className = { s[iconClassName] } />
					</div>
				);
			}
		},
		{
			title: '订单持有人',
			key: 'owner',
			dataIndex: '',
			render (x, recode) {
				return recode.getTourist.name;
			}
		},
		{
			title: '订单类型',
			key: 'type',
			dataIndex: '',
			render (x, recode) {
				let type = '旅游(单景点)';
				if (recode.productType === 'route') {
					type = '旅游(多景点)';
				} else if (recode.productType === 'hotel') {
					type = '住宿';
				}
				return type;
			}
		},
		{
			title: '费用',
			key: 'spend',
			dataIndex: '',
			render (x, recode) {
				return recode.spend;
			}
		},
		{
			title: '',
			key: 'setting',
			dataIndex: '',
			render: (x, recode) => {
				return (
					<div className={ s.setting }>
						<div className={ s.addBlack } onClick={ () => { this.addBlackHandler(recode._id, !recode.complete); } }>{!recode.complete ? '订单完成' : ''}</div>
						<div className={ s.addBlack } onClick={ () => { this.findProduct(); } }>查看商品</div>
					</div>
				);
			}
		}
	]
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
	selectHandleChange = selectedOption => {
		const { location } = this.props;
		const search = new URLSearchParams(location.search);
		const filter = JSON.parse(search.get('filter') || '{}');
		filter.productType = selectedOption.value;
		this.handleFilterChange(filter);
		this.setState({ selectedOption });
	};
	selectHandleChangeofBlack = selectedOption => {
		const { location } = this.props;
		const search = new URLSearchParams(location.search);
		const filter = JSON.parse(search.get('filter') || '{}');
		filter.complete = selectedOption.value;
		this.handleFilterChange(filter);
		this.setState({ selectedOptionofBlack: selectedOption });
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
	resetHandler=() => {
		this.setState({
			selectedOption: null,
			searchValue: '',
			selectedOptionofBlack: null
		}, this.handleFilterChange({}));
	}
	render () {
		const { selectedOption, searchValue, selectedOptionofBlack } = this.state;
		console.log(this.props);
		return (
			<div className={ cn(s.tourist) }>
				<div className={ s.firstRow }>
					<div className={ s.inputContainer }>
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
					<div className = { s.select }>
						<Select
							value={ selectedOptionofBlack }
							onChange={ this.selectHandleChangeofBlack }
							options={ vipOptionsofBlack }
							placeholder="根据完成状态筛选"
						/>
					</div>
					<div className = { s.select }>
						<Select
							value={ selectedOption }
							onChange={ this.selectHandleChange }
							options={ vipOptions }
							placeholder="根据商品类别筛选"
						/>
					</div>
					<div className={ s.add }>
						<Button text="重置" onClick={ this.resetHandler } />
					</div>
				</div>
				<div className={ s.thirdRow }>
					<List
						className = { s.tableWapper }
						fieldsFragment = { fieldFragment }
						fieldName = "Order"
						fieldsFragmentName = "OrderFields"
						routePrefix= { routePrefix }
						columns={ this.columnsBuilder() }
					/>
				</div>
			</div>
		);
	}
}
// export default Order;

export default compose(
	graphql(gql`
		mutation($id: MongoID!,$black:Boolean) {
			OrderUpdateById(record:{
				complete:$black
				_id:$id
			  }) {
				record{
					complete
				}
			}
		}
  `, {
		props ({
			mutate
			// ownProps: {
			// 	data: { refetch }
			// }
		}) {
			return {
				TouristUpdateById (id, black) {
					return mutate({
						variables: {
							id,
							black
						}
					});
				}
			};
		}
	})
)(Order);
