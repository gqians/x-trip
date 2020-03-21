/* eslint-disable react/prop-types */
import React from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import List from '../../components/list';
import Select from 'react-select';
import PropTypes from 'prop-types';
import fieldFragment from './fieldsFrags';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import s from './style.css';
import cn from 'classnames';
const routePrefix = './tourist';
const vipOptions = [
	{ value: 1, label: '普通用户' },
	{ value: 2, label: 'vip' },
	{ value: 3, label: 'svip' }
];
const vipOptionsofBlack = [
	{ value: true, label: '黑名单' },
	{ value: false, label: '白名单' }
];
class Tourist extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		rolesMap: PropTypes.object,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			replace: PropTypes.func.isRequired
		}).isRequired,
		location: PropTypes.shape({
			search: PropTypes.string.isRequired
		}).isRequired,
		TouristUpdateById: PropTypes.func
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
	columnsBuilder = () => [
		{
			title: '游客昵称',
			key: 'name',
			dataIndex: 'name',
			render (x, recode) {
				return recode.name;
			}
		},
		{
			title: '性别',
			key: 'sex',
			dataIndex: 'sex',
			render (x, recode) {
				return recode.sex;
			}
		},
		{
			title: ' 当前vip等级',
			key: 'vip',
			dataIndex: 'vipLevel',
			render (x, recode) {
				let iconClassName = 'nVip';
				if (recode.vipLevel === 2) {
					iconClassName = 'vip';
				}
				if (recode.vipLevel === 3) {
					iconClassName = 'svip';
				}
				return (
					<div className = { s.icon }>
						<span className = { s[iconClassName] } />
					</div>
				);
			}
		},
		{
			title: '是否被加入黑名单',
			key: 'black',
			dataIndex: 'blackList',
			render (x, recode) {
				let blackIconClassName = 'blackIconpass';
				if (recode.blackList) {
					blackIconClassName = 'blackIcon';
				}
				return (
					<div className={ s.icon }>
						<span className={ s[blackIconClassName] } />
					</div>
				);
			}
		},
		{
			title: '',
			key: 'setting',
			dataIndex: '',
			render: (x, recode) => {
				return (
					<div className={ s.setting }>
						<div className={ s.addBlack } onClick={ () => { this.addBlackHandler(recode._id, !recode.blackList); } }>{!recode.blackList ? '加入黑名单' : '移除黑名单'}</div>
						<div className={ s.addBlack } onClick={ () => { this.lookHandler(recode._id); } }>查看订单</div>
					</div>
				);
			}
		}
	]
	lookHandler=(id) => {
		const filter = {};
		filter['tourist_Id'] = id;
		this.handleFilterChange(filter, './order');
	}
	/**
	 * 生成search字符串
	 */
	searchStringBuilder = fields => {
		const { location } = this.props;
		const search = new URLSearchParams(location.search);

		Object.keys(fields).forEach(name => {
			const value = fields[name];
			value === undefined ? search.delete(name) : search.set(name, value);
		});

		return search;
	};
	handleFilterChange = (filter, routePrefixSelf) => {
		const search = this.searchStringBuilder({
			filter: JSON.stringify(filter),
			page: 1,
			sort: '_ID_DESC'
		});
		if (routePrefixSelf) {
			this.props.history.replace(`${ routePrefixSelf }?${ search }`);
		} else {
			this.props.history.replace(`${ routePrefix }?${ search }`);
		}
	};
	selectHandleChange = selectedOption => {
		const { location } = this.props;
		const search = new URLSearchParams(location.search);
		const filter = JSON.parse(search.get('filter') || '{}');
		filter.vipLevel = Number(selectedOption.value);
		this.handleFilterChange(filter);
		this.setState({ selectedOption });
	};
	selectHandleChangeofBlack = selectedOption => {
		const { location } = this.props;
		const search = new URLSearchParams(location.search);
		const filter = JSON.parse(search.get('filter') || '{}');
		filter.blackList = selectedOption.value;
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
							placeholder="输入昵称搜索"
						/>
					</div>
				</div>
				<div className={ s.secondRow }>
					<div className = { s.select }>
						<Select
							value={ selectedOptionofBlack }
							onChange={ this.selectHandleChangeofBlack }
							options={ vipOptionsofBlack }
							placeholder="根据黑名单筛选"
						/>
					</div>
					<div className = { s.select }>
						<Select
							value={ selectedOption }
							onChange={ this.selectHandleChange }
							options={ vipOptions }
							placeholder="根据vip筛选"
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
						fieldName = "Tourist"
						fieldsFragmentName = "TouristFields"
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
		mutation($id: MongoID!,$black:Boolean) {
			TouristUpdateById(record:{
				blackList:$black
				_id:$id
			  }) {
				record{
					blackList
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
)(Tourist);
