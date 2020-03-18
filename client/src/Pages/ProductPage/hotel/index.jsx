import React from 'react';
import Button from '../../../components/button';
import Input from '../../../components/input';
import List from '../../../components/list';
import Pop from '../popLayer';
import fieldFragment from './fieldsFrags';
import PropTypes from 'prop-types';
// import moment from 'moment';
import s from './style.css';
import Dialog from 'rmc-dialog';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
const routePrefix = './hotel';
class ProductHotel extends React.PureComponent {
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
		HotelUpdateById: PropTypes.func,
		HotelCreateOne: PropTypes.func
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
			title: '住宿点',
			key: 'name',
			dataIndex: 'name',
			render (x, recode) {
				return recode.name;
			}
		},
		{
			title: '类型',
			key: 'type',
			dataIndex: 'name',
			render (x, recode) {
				// const time = moment(recode['addedTime']).format('YYYY-MM-DD HH:mm:ss');
				// return time;
				return recode.hotelType;
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
		const { HotelUpdateById } = this.props;
		HotelUpdateById(id, offSale).then((res) => {
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
					<Pop GraphqlMethod={ this.props.HotelUpdateById } myrecode={ myrecode } fileds={ ['id', 'onSale', 'name', 'address', 'lat', 'lng', 'description', 'price', 'startTime', 'endTime', 'picture', 'phoneNumber', 'hotelType'] }/>
				</Dialog>
				<Dialog
					title="新增住宿点"
					visible={ showDialogAdd }
					onClose={ this.dialogCloseAdd }
					animation="zoom"
					maskAnimation="fade"
					style={ { width: '80%' } }
				>
					<Pop GraphqlMethod={ this.props.HotelCreateOne } fileds={ ['name', 'address', 'lat', 'lng', 'description', 'price', 'startTime', 'endTime', 'picture', 'phoneNumber', 'hotelType'] }/>
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
					<Button text="添加住宿点" onClick={ this.addProduct }/>
					<span className={ s.space } />
					<Button text="重置" onClick={ this.resetHandler } />
				</div>
				<div className={ s.thirdRow }>
					<List
						className = { s.tableWapper }
						fieldsFragment = { fieldFragment }
						fieldName = "Hotel"
						fieldsFragmentName = "hotelFields"
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
		mutation($id: MongoID!,$name:String,$address:String,$lat:String,$lng:String,$picture:String,$description:String,$price:String,$startTime:Date,$endTime:Date,$phoneNumber:String,$hotelType:String,$onSale:Boolean) {
			HotelUpdateById(record:{
				name:$name
				_id:$id
				address:$address
				lat:$lat
				lng:$lng
				picture:$picture
				description:$description
				price:$price
				phoneNumber:$phoneNumber
				hotelType:$hotelType
				onSale:$onSale
				businessHours:{
				startTime:$startTime
				endTime:$endTime
				}
			  }) {
				record{
					name
					hotelType
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
				HotelUpdateById (id, onSale, name, address, lat, lng, description, price, startTime, endTime, picture, phoneNumber, hotelType) {
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
							picture,
							phoneNumber,
							hotelType
						}
					});
				}
			};
		}
	}),
	graphql(gql`
	mutation($name:String!,$address:String,$lat:String!,$lng:String!,$description:String,$price:String,$startTime:Date,$endTime:Date,$picture:String,$phoneNumber:String,$hotelType:String) {
		HotelCreateOne(record:{
			name:$name
			address:$address
			lat:$lat
			lng:$lng
			picture:$picture
			description:$description
			price:$price
			phoneNumber:$phoneNumber
			hotelType:$hotelType
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
				HotelCreateOne (name, address, lat, lng, description, price, startTime, endTime, picture, phoneNumber, hotelType) {
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
							picture,
							phoneNumber,
							hotelType
						}
					});
				}
			};
		}
	})
)(ProductHotel);
