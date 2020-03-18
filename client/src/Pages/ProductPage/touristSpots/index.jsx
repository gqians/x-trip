import React from 'react';
import Button from '../../../components/button';
import Input from '../../../components/input';
import List from '../../../components/list';
import Pop from '../popLayer';
import fieldFragment from './fieldsFrags';
import PropTypes from 'prop-types';
import moment from 'moment';
import s from './style.css';
import Dialog from 'rmc-dialog';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
const routePrefix = './tourist';
class ProductTourist extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		rolesMap: PropTypes.object,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			replace: PropTypes.func.isRequired,
			go: PropTypes.func.isRequired
		}),
		location: PropTypes.shape({
			search: PropTypes.string.isRequired
		}),
		TouristSpotsUpdateById: PropTypes.func,
		TouristSpotsCreateOne: PropTypes.func
	};
	static defaultProps = {
		className: '',
		rolesMap: {}
	};
	state={
		searchValue: '',
		showDialog: false,
		myrecode: null,
		showDialogAdd: false
	};
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
			title: '状态',
			key: 'status',
			dataIndex: 'name',
			render (x, recode) {
				return <div className={ s.price }>{recode.onSale ? '正在售卖' : '已下架'}</div>;
			}
		},
		{
			title: '',
			key: 'setting',
			dataIndex: '',
			render: (x, recode) => {
				return (
					<div className={ s.setting }>
						<div className={ s.addBlack } onClick={ () => { this.addBlackHandler(recode); } }>修改信息</div>
						<div className={ s.addBlack } onClick={ () => { this.offSale(recode._id, !recode.onSale); } }>
							{
								recode.onSale ? '下架商品' : '上架商品'
							}
						</div>
					</div>
				);
			}
		}
	]
	// 函数
	offSale=(id, offSale) => {
		const { TouristSpotsUpdateById } = this.props;
		TouristSpotsUpdateById(id, offSale).then((res) => {
			this.props.history.go(0);
		});
	}
	addBlackHandler=(recode) => {
		const { showDialog } = this.state;
		this.setState({
			showDialog: !showDialog,
			myrecode: recode
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
	dialogClose=() => {
		const { showDialog } = this.state;
		this.setState({
			showDialog: !showDialog
		});
	}
	resetHandler=() => {
		this.setState({
			searchValue: ''
		}, this.handleFilterChange({}));
	}
	addProduct=() => {
		const { showDialogAdd } = this.state;
		this.setState({
			showDialogAdd: !showDialogAdd
		});
	}
	dialogCloseAdd=() => {
		const { showDialogAdd } = this.state;
		this.setState({
			showDialogAdd: !showDialogAdd
		});
	}
	render () {
		const { searchValue, showDialog, myrecode, showDialogAdd } = this.state;
		return (
			<div className={ s.tourist }>
				<Dialog
					title="修改商品信息"
					visible={ showDialog }
					onClose={ this.dialogClose }
					animation="zoom"
					maskAnimation="fade"
					style={ { width: '70%' } }
				>
					<Pop GraphqlMethod={ this.props.TouristSpotsUpdateById } myrecode={ myrecode }/>
				</Dialog>
				<Dialog
					title="新增旅游点"
					visible={ showDialogAdd }
					onClose={ this.dialogCloseAdd }
					animation="zoom"
					maskAnimation="fade"
					style={ { width: '80%' } }
				>
					<Pop GraphqlMethod={ this.props.TouristSpotsCreateOne } fileds={
						['name', 'address', 'lat', 'lng', 'description', 'price', 'startTime', 'endTime', 'picture'] }
					/>
				</Dialog>
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
					<Button text="添加旅游点" onClick={ this.addProduct }/>
					<span className={ s.space } />
					<Button text="重置" onClick={ this.resetHandler } />
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
export default compose(
	graphql(gql`
		mutation($id: MongoID!,$name:String,$address:String,$lat:String,$lng:String,$picture:String,$description:String,$price:String,$startTime:Date,$endTime:Date,$onSale:Boolean) {
			TouristSpotsUpdateById(record:{
				name:$name
				_id:$id
				address:$address
				lat:$lat
				lng:$lng
				picture:$picture
				description:$description
				price:$price
				onSale:$onSale
				businessHours:{
				startTime:$startTime
				endTime:$endTime
				}
			  }) {
				record{
					name
					addedTime
					address
					lat
					lng
					picture
					description
					star
					price
					url
					businessHours{
						startTime
						endTime
					}
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
				TouristSpotsUpdateById (id, onSale, name, address, lat, lng, description, price, startTime, endTime, picture) {
					return mutate({
						variables: {
							id,
							onSale,
							name,
							address,
							lat,
							lng,
							description,
							price,
							startTime,
							endTime,
							picture
						}
					});
				}
			};
		}
	}),
	graphql(gql`
	mutation($name:String!,$address:String,$lat:String!,$lng:String!,$description:String,$price:String,$startTime:Date,$endTime:Date,$picture:String) {
		TouristSpotsCreateOne(record:{
			name:$name
			address:$address
			lat:$lat
			lng:$lng
			picture:$picture
			description:$description
			price:$price
			businessHours:{
			startTime:$startTime
			endTime:$endTime
			}
		  }) {
			record{
				name
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
				TouristSpotsCreateOne (name, address, lat, lng, description, price, startTime, endTime, picture) {
					return mutate({
						variables: {
							name,
							address,
							lat,
							lng,
							description,
							price,
							startTime,
							endTime,
							picture
						}
					});
				}
			};
		}
	})
)(ProductTourist);
