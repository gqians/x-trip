import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
// import gql from 'graphql-tag';
// import { gql, graphql } from 'react-apollo';
import anime from 'animejs';
import s from './style.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
class Login extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		history: PropTypes.shape({
			push: PropTypes.func
		}),
		location: PropTypes.object
	};

	static defaultProps = {
		className: ''
	};
	state = {
		current: null,
		password: '',
		user: ''
	};
	// 事件绑定
	userFocusHandler= () => {
		let {current} = this.state;
		if (current) current.pause();
		current = anime({
			targets: 'path',
			strokeDashoffset: {
				value: 0,
				duration: 700,
				easing: 'easeOutQuart'
			},
			strokeDasharray: {
				value: '240 1386',
				duration: 700,
				easing: 'easeOutQuart'
			}
		});
		this.setState({
			current
		});
	}
	loginCheck={
		user: {
			maxLength: 10,
			minLength: 2,
			title: '用户名'
		},
		password: {
			maxLength: 10,
			minLength: 6,
			title: '密码'
		}
	}
	userChangeHandler=(e) => {
		if (e.target.value.length < this.loginCheck.user.minLength) {
			toastr.options.timeOut = 1000;
			toastr.error(`用户名输入长度应该在${ this.loginCheck.user.minLength }-${ this.loginCheck.user.maxLength }之间，请检查后再提交`, `用户名长度出错`);
		}
		if (e.target.value.length > this.loginCheck.user.maxLength) {
			toastr.options.timeOut = 1000;
			toastr.error(`用户名输入长度应该在${ this.loginCheck.user.minLength }-${ this.loginCheck.user.maxLength }之间，请检查后再提交`, `用户名长度出错`);
		}
		if (e.target.value.length <= this.loginCheck.user.maxLength && e.target.value.length >= this.loginCheck.user.minLength) {
			toastr.options.timeOut = 1000;
			toastr.success(`用户名输入长度在${ this.loginCheck.user.minLength }-${ this.loginCheck.user.maxLength }之间`, `用户名输入长度正确`);
		}
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	passFocusHandler=() => {
		let {current} = this.state;
		if (current) current.pause();
		current = anime({
			targets: 'path',
			strokeDashoffset: {
				value: -336,
				duration: 700,
				easing: 'easeOutQuart'
			},
			strokeDasharray: {
				value: '240 1386',
				duration: 700,
				easing: 'easeOutQuart'
			}
		});
		this.setState({
			current
		});
	}
	passChangeHandler=(e) => {
		if (e.target.value.length < this.loginCheck.password.minLength) {
			toastr.options.timeOut = 1000;
			toastr.error(`密码输入长度应该在${ this.loginCheck.password.minLength }-${ this.loginCheck.password.maxLength }之间，请检查后再提交`, `密码长度出错`);
		}
		if (e.target.value.length > this.loginCheck.password.maxLength) {
			toastr.options.timeOut = 1000;
			toastr.error(`密码输入长度应该在${ this.loginCheck.password.minLength }-${ this.loginCheck.password.maxLength }之间，请检查后再提交`, `密码长度出错`);
		}
		if (e.target.value.length <= this.loginCheck.password.maxLength && e.target.value.length >= this.loginCheck.password.minLength) {
			toastr.options.timeOut = 1000;
			toastr.success(`密码输入长度在${ this.loginCheck.password.minLength }-${ this.loginCheck.password.maxLength }之间`, `密码输入长度正确`);
		}
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	subFocusHandler=() => {
		let {current} = this.state;
		if (current) current.pause();
		current = anime({
			targets: 'path',
			strokeDashoffset: {
				value: -730,
				duration: 700,
				easing: 'easeOutQuart'
			},
			strokeDasharray: {
				value: '530 1386',
				duration: 700,
				easing: 'easeOutQuart'
			}
		});
		this.setState({
			current
		});
	}
	clickHandler=() => {
		let haveBug = false;
		for (const i in this.loginCheck) {
			if (this.state[i].length > this.loginCheck[i].maxLength || this.state[i].length < this.loginCheck[i].minLength) {
				toastr.options.timeOut = 4000;
				toastr.error(`${ this.loginCheck[i].title }输入信息存在错误，请检查后再提交`, `输入出错`);
				haveBug = true;
			}
		}
		if (haveBug) {
			return;
		}
		const {user, password} = this.state;
		axios.post('/login', {
			id: user,
			password
		}).then(res => {
			sessionStorage.setItem('token', res.data.token);
			if (res.data.state) {
				this.props.history.push('/home/index');
			} else {
				toastr.options.timeOut = 4000;
				toastr.error(`${ res.data.message }  请核对后重新进行输入！`, `登录出错`);
			}
		}).catch(e => {
			throw Error(e);
		});
	}
	andleEnterKey=(e) => {
		if (e.nativeEvent.keyCode === 13) {
			this.clickHandler();
		};
	}
	render () {
		const { className } = this.props;
		return (
			<div className={ cn(className, s.login) }>
				<div className={ s.left } >
					<div className={ s.textTop }>登录</div>
					<div className={ s.textBto }>x-trip后台管理平台，请输入您的账号和密码以登录!</div>
				</div>
				<div className={ s.right }>

					<svg viewBox="0 0 320 300" className={ s.svg }>
						<defs>
							<linearGradient id="linearGradient" x1="13" y1="193.49992" x2="307" y2="193.49992" gradientUnits="userSpaceOnUse">
								<stop style={ { stopColor: '#ff00ff' } } offset="0" id="stop876" />
								<stop style={ { stopColor: '#ff0000' } } offset="1" id="stop878" />
							</linearGradient>
						</defs>
						<path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" className={ s.path } />
					</svg>

					<div className={ s.form }>
						<div className={ s.user }>
							<label htmlFor="user" className={ s.label }>输入账号</label>
							<input
								id="user"
								name= "user"
								type="text"
								autoComplete="false"
								minLength="4"
								required="required"
								className={ s.input }
								onFocus={ this.userFocusHandler }
								onChange={ this.userChangeHandler }
							/>
						</div>
						<div className={ s.user }>
							<label htmlFor="password" className={ s.label }>输入密码</label>
							<input
								id="password"
								name= "password"
								type="password"
								autoComplete="false"
								minLength="5"
								required="required"
								className={ s.input }
								onKeyPress={ this.andleEnterKey }
								onFocus={ this.passFocusHandler }
								onChange={ this.passChangeHandler }
							/>
						</div>
						<input type="submit" value="登录" className={ s.submit } onFocus={ this.subFocusHandler } onClick={ this.clickHandler }/>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(Login);
