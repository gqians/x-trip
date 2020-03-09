/* eslint-disable react/prop-types */
import React from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import List from '../../components/list';
import Select from 'react-select';
// import PropTypes from 'prop-types';
import fieldFragment from './fieldsFrags';
// import { graphql } from 'react-apollo';
import s from './style.css';
import cn from 'classnames';
const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
];
class Tourist extends React.PureComponent {
	state={
		selectedOption: null
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
			render (x, recode) {
				return (
					<div className={ s.setting }>
						<div>加入黑名单</div>
						<div>查看订单</div>
					</div>
				);
			}
		}
	]
	selectHandleChange = selectedOption => {
		this.setState({ selectedOption });
		console.log(`Option selected:`, selectedOption);
	};
	render () {
		const { selectedOption } = this.state;
		return (
			<div className={ cn(s.tourist) }>
				<div className={ s.firstRow }>
					<div className={ s.inputContainer }>
						<Input size="default"className={ s.input }/>
					</div>
				</div>
				<div className={ s.secondRow }>
					<div className = { s.select }>
						<Select
							value={ selectedOption }
							onChange={ this.selectHandleChange }
							options={ options }
						/>
					</div>
					<div className={ s.add }>
						<Button text="重置"/>
					</div>
				</div>
				<div className={ s.thirdRow }>
					<List
						className = { s.tableWapper }
						fieldsFragment = { fieldFragment }
						fieldName = "Tourist"
						fieldsFragmentName = "TouristFields"
						routePrefix= "./tourist"
						columns={ this.columnsBuilder() }
					/>
				</div>
			</div>
		);
	}
}
export default Tourist;
