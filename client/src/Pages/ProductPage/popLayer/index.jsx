/* eslint-disable no-unreachable */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';
// import RadioButton from '../../../components/RadioButton';
import Button from '../../../components/button';
import Input from '../../../components/input';
import InputNum from 'rc-input-number';
import Upload from 'rc-upload';
import 'rc-input-number/assets/index.css';
import 'rmc-dialog/assets/index.css';
import 'rc-progress/assets/index.css';
import moment from 'moment';
import cn from 'classnames';
import TimePicker from 'rc-time-picker';
import {withRouter} from 'react-router-dom';
import 'rc-time-picker/assets/index.css';
import { Line } from 'rc-progress';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
class ProductRoute extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			replace: PropTypes.func.isRequired,
			go: PropTypes.func.isRequired
		}),
		location: PropTypes.shape({
			search: PropTypes.string.isRequired
		}),
		GraphqlMethod: PropTypes.func,
		myrecode: PropTypes.object,
		fileds: PropTypes.array
	};
	static defaultProps = {
		className: '',
		myrecode: null,
		fileds: ['id', 'onSale', 'name', 'address', 'lat', 'lng', 'description', 'price', 'startTime', 'endTime', 'picture']
	};
	state={
		setting: {
			type: 'tourist'
		},
		hotelType: '',
		onSale: true,
		phoneNumber: '',
		name: '',
		address: '',
		lat: 0,
		lng: 0,
		price: '',
		description: '',
		startTime: moment(),
		endTime: moment(),
		id: '',
		imageName: '',
		percent: 0
	}
	checkConfig={
		hotelType: {
			maxLength: 15,
			minLength: 1,
			title: '住宿点类型'
		},
		phoneNumber: {
			maxLength: 15,
			minLength: 1,
			title: '电话号码'
		},
		name: {
			maxLength: 15,
			minLength: 1,
			title: '商品名称'
		},
		address: {
			maxLength: 15,
			minLength: 1,
			title: '商品地址'
		},
		price: {
			maxLength: 6,
			minLength: 1,
			title: '商品价格'
		},
		description: {
			maxLength: 150,
			minLength: 1,
			title: '商品描述'
		}
	}
	uploaderProps = {
		action: '/upload',
		multiple: true,
		beforeUpload: (file) => {
			// const type = [...file.name.matchAll(/\.(.*)/g)][0][0];
			// // const formData = new FormData();
			// // formData.append('file', file, uuidv4() + type);
			// // file = formData;
			// Object.defineProperty(file, 'name', {
			// 	writable: true
			// });
			// console.log(type);
			// file.name = uuidv4() + type;
			console.log('beforeUpload', file.name);
			this.setState({
				imageName: file.name
			});
		},
		onStart: (file) => {
			// console.log('onStart', file.name);
			// console.log(this.refs.inner.abort(file));
		},
		onSuccess (file) {
			console.log('onSuccess', file);
		},
		onProgress: (step, file) => {
			console.log(this);
			this.setState({
				percent: step.percent
			});
			console.log('onProgress', Math.round(step.percent), file.name);
		},
		onError (err) {
			console.log('onError', err);
		}
	};
	typeClickHandler=(type, e) => {
		this.setState({
			setting: {
				type
			}
		});
	}
	searchChangeHandler=(type, e) => {
		if (type === 'lat' || type === 'lng') {
			this.setState({
				[type]: e
			});
			return;
		}
		if (type === 'startTime' || type === 'endTime') {
			this.setState({
				[type]: e
			});
			return;
		}
		if (e.target.value.length > this.checkConfig[type]?.maxLength) {
			toastr.options.timeOut = 1000;
			toastr.error(`当前输入的长度的超过了${ this.checkConfig[type]?.maxLength }`, `${ this.checkConfig[type]?.title }输入出错`);
			return;
		}
		if (e.target.value.length >= this.checkConfig[type]?.minLength || this.checkConfig[type]?.minLength) {
			toastr.options.timeOut = 1000;
			toastr.success(`输入的长度在${ this.checkConfig[type]?.minLength }-${ this.checkConfig[type]?.maxLength }个之间`, `${ this.checkConfig[type]?.title }输入符合需求`);
		}
		this.setState({
			[type]: typeof e === 'object' ? e.target.value : e
		});
	}
	componentDidMount () {
		const {myrecode} = this.props;
		// console.log(moment(myrecode.businessHours.startTime));
		if (myrecode) {
			this.setState({
				name: myrecode.name || this.state.name,
				address: myrecode.address || this.state.address,
				lat: myrecode.lat || this.state.lat,
				lng: myrecode.lng || this.state.lng,
				price: myrecode.price || this.state.price,
				description: myrecode.description || this.state.description,
				startTime: myrecode.businessHours ? moment(myrecode.businessHours.startTime) : moment(),
				endTime: myrecode.businessHours ? moment(myrecode.businessHours.endTime) : moment(),
				id: myrecode._id || this.state.id,
				hotelType: myrecode.hotelType || this.state.hotelType,
				phoneNumber: myrecode.phoneNumber || this.state.phoneNumber
			});
		}
	}
	buttonClick=() => {
		// 检查各个输入时候符合要求
		let haveBug = false;
		for (const i in this.checkConfig) {
			if (this.props.fileds.indexOf(i) < 0) {
				continue;
			}
			if (this.state[i].length > this.checkConfig[i].maxLength || this.state[i].length < this.checkConfig[i].minLength) {
				toastr.options.timeOut = 4000;
				toastr.error(`${ this.checkConfig[i].title }输入信息存在错误，请检查后再提交`, `输入出错`);
				haveBug = true;
			}
		}
		if (haveBug) {
			return;
		}
		//
		const { GraphqlMethod, fileds } = this.props;
		const argument = [];
		for (const filed of fileds) {
			let tmp = this.state[filed];
			if (filed === 'startTime' || filed === 'endTime' || filed === 'lat' || filed === 'lng') {
				tmp = tmp.toString();
			}
			// tmp = String(tmp);
			argument.push(tmp);
		}
		GraphqlMethod(...argument).then(() => {
			this.props.history.go(0);
		});
	}
	render () {
		const { name, address, lat, lng, price, description, startTime, endTime, percent, hotelType, phoneNumber } = this.state;
		return (
			<div className={ s.pop }>
				<div className={ s.firstRow }>
					<Button onClick={ this.buttonClick } text="提交" />
				</div>
				<div className={ s.secondRow }>
					<div className={ s.title }>
						请输入商品名称:
					</div>
					<div className={ s.input }>
						<Input
							size="default"
							value={ name }
							// searchHandler={ this.searchHandler }
							onChange={ (e) => this.searchChangeHandler('name', e) }
							placeholder="输入商品名称"
							showIcon={ false }
						/>
					</div>
				</div>
				<div className={ s.secondRow }>
					<div className={ s.title }>
						请输入商品地址:
					</div>
					<div className={ s.input }>
						<Input
							size="default"
							value={ address }
							// searchHandler={ this.searchHandler }
							onChange={ (e) => this.searchChangeHandler('address', e) }
							placeholder="输入商品地址"
							showIcon={ false }
						/>
					</div>
				</div>
				{
					this.props.fileds.indexOf('hotelType') < 0 ||
					(
						<div className={ s.secondRow }>
							<div className={ s.title }>
								请输入住宿点类型:
							</div>
							<div className={ s.input }>
								<Input
									size="default"
									value={ hotelType }
									// searchHandler={ this.searchHandler }
									onChange={ (e) => this.searchChangeHandler('hotelType', e) }
									placeholder="请输入住宿点类型"
									showIcon={ false }
								/>
							</div>
						</div>
					)
				}
				{
					this.props.fileds.indexOf('phoneNumber') < 0 ||
					(
						<div className={ s.secondRow }>
							<div className={ s.title }>
								请输入住宿点电话号码:
							</div>
							<div className={ s.input }>
								<Input
									size="default"
									value={ phoneNumber }
									// searchHandler={ this.searchHandler }
									onChange={ (e) => this.searchChangeHandler('phoneNumber', e) }
									placeholder="输入电话号码"
									showIcon={ false }
								/>
							</div>
						</div>
					)
				}
				<div className={ s.secondRow }>
					<div className={ s.title }>
						请输入经度:
					</div>
					<div className={ s.input }>
						<InputNum
							aria-label="请输入经度"
							step={ 10 }
							value={ lat }
							style={ { width: 150 } }
							readOnly={ this.state.readOnly }
							onChange={ (e) => { this.searchChangeHandler('lat', e); } }
							disabled={ this.state.disabled }
						/>
					</div>
					<div className={ s.title }>
						请输入纬度:
					</div>
					<div className={ s.input }>
						<InputNum
							aria-label="请输入纬度"
							step={ 10 }
							value={ lng }
							style={ { width: 150 } }
							readOnly={ this.state.readOnly }
							onChange={ (e) => { this.searchChangeHandler('lng', e); } }
							disabled={ this.state.disabled }
						/>
					</div>
				</div>
				<div className={ s.secondRow }>
					<div className={ s.title }>
						请输入商品价格:
					</div>
					<div className={ s.input }>
						<Input
							size="default"
							value={ price }
							// searchHandler={ this.searchHandler }
							onChange={ (e) => this.searchChangeHandler('price', e) }
							placeholder="输入商品价格"
							showIcon={ false }
						/>
					</div>
				</div>
				<div className={ s.secondRow }>
					<div className={ cn(s.title, s.description) }>
						请输入商品描述:
					</div>
					<div className={ s.input }>
						<textarea
							value={ description }
							className={ s.textarea }
							onChange={ (e) => this.searchChangeHandler('description', e) }
						/>
					</div>
				</div>
				<div className={ s.secondRow }>
					<div className={ cn(s.title, s.description) }>
						请选择营业时间:
					</div>
					<div className={ s.input }>
						<span className={ s.timeIcon } />
						<TimePicker
							showSecond = { false }
							value={ startTime }
							onChange={ (e) => this.searchChangeHandler('startTime', e) }
							inputReadOnly
						/>
					</div>
					<div className={ s.input }>
						<span className={ s.timeIconend } />
						<TimePicker
							showSecond={ false }
							value={ endTime }
							onChange={ (e) => this.searchChangeHandler('endTime', e) }
							inputReadOnly
						/>
					</div>
				</div>
				<div className={ s.secondRow }>
					<div className={ cn(s.title, s.description) }>
						请上传图片:
					</div>
					<div className={ s.input }>
						<Upload { ...this.uploaderProps } ref="inner"><a className={ s.upload }>点击上传</a></Upload>
					</div>
					{
						percent === 0 ||
						<div className={ s.progress }>
							<Line strokeWidth="4" percent={ percent } />
						</div>
					}
					<div className={ s.upload }>
						{(() => {
							switch (percent) {
							case 0:
								return '';
								break;
							case 100:
								return '上传完毕';
								break;
							default :
								return '正在上传';
							}
						}
						)()}

					</div>
				</div>
			</div>);
	}
}
export default withRouter(ProductRoute);
