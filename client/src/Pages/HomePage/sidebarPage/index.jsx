/* eslint-disable react/no-array-index-key */
import React from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import {Link, withRouter} from 'react-router-dom';
import s from './style.css';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
class Sidebar extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		history: PropTypes.shape({
			push: PropTypes.func,
			listen: PropTypes.func,
			location: PropTypes.object
		})
	};
	state={
		indexColor: '#ffffff',
		orderColor: '#9fa4b2',
		productColor: '#9fa4b2',
		touristColor: '#9fa4b2',
		reportColor: '#9fa4b2',
		settingColor: '#9fa4b2',
		messageColor: '#9fa4b2',
		indexSelect: true,
		orderSelect: false,
		productSelect: false,
		touristSelect: false,
		reportSelect: false,
		settingSelect: false,
		messageSelect: false
	}
	componentDidMount () {
		this.props.history.listen((e) => {
			if (!sessionStorage.getItem('token') && e.pathname !== '/') {
				const path = {
					pathname: '/',
					state: {
						message: '登录信息过期，请重新登录!'
					}
				};
				toastr.error('登录信息过期，请重新登录!', '信息过期');
				this.props.history.push(path);
			}
			if (e.pathname === '/home/index') {
				this.setState({
					indexColor: '#ffffff',
					orderColor: '#9fa4b2',
					productColor: '#9fa4b2',
					touristColor: '#9fa4b2',
					reportColor: '#9fa4b2',
					settingColor: '#9fa4b2',
					messageColor: '#9fa4b2',
					indexSelect: true,
					orderSelect: false,
					productSelect: false,
					touristSelect: false,
					reportSelect: false,
					settingSelect: false,
					messageSelect: false
				});
			} else if (e.pathname === '/home/order') {
				this.setState({
					indexColor: '#9fa4b2',
					orderColor: '#ffffff',
					productColor: '#9fa4b2',
					touristColor: '#9fa4b2',
					reportColor: '#9fa4b2',
					settingColor: '#9fa4b2',
					messageColor: '#9fa4b2',
					indexSelect: false,
					orderSelect: true,
					productSelect: false,
					touristSelect: false,
					reportSelect: false,
					settingSelect: false,
					messageSelect: false
				});
			} else if (e.pathname.startsWith('/home/product')) {
				this.setState({
					indexColor: '#9fa4b2',
					orderColor: '#9fa4b2',
					productColor: '#ffffff',
					touristColor: '#9fa4b2',
					reportColor: '#9fa4b2',
					settingColor: '#9fa4b2',
					messageColor: '#9fa4b2',
					indexSelect: false,
					orderSelect: false,
					productSelect: true,
					touristSelect: false,
					reportSelect: false,
					settingSelect: false,
					messageSelect: false
				});
			} else if (e.pathname === '/home/tourist') {
				this.setState({
					indexColor: '#9fa4b2',
					orderColor: '#9fa4b2',
					productColor: '#9fa4b2',
					touristColor: '#ffffff',
					reportColor: '#9fa4b2',
					settingColor: '#9fa4b2',
					messageColor: '#9fa4b2',
					indexSelect: false,
					orderSelect: false,
					productSelect: false,
					touristSelect: true,
					reportSelect: false,
					settingSelect: false,
					messageSelect: false
				});
			} else if (e.pathname === '/home/report') {
				this.setState({
					indexColor: '#9fa4b2',
					orderColor: '#9fa4b2',
					productColor: '#9fa4b2',
					touristColor: '#9fa4b2',
					reportColor: '#ffffff',
					settingColor: '#9fa4b2',
					messageColor: '#9fa4b2',
					indexSelect: false,
					orderSelect: false,
					productSelect: false,
					touristSelect: false,
					reportSelect: true,
					settingSelect: false,
					messageSelect: false
				});
			} else if (e.pathname === '/home/setting') {
				this.setState({
					indexColor: '#9fa4b2',
					orderColor: '#9fa4b2',
					productColor: '#9fa4b2',
					touristColor: '#9fa4b2',
					reportColor: '#9fa4b2',
					settingColor: '#ffffff',
					messageColor: '#9fa4b2',
					indexSelect: false,
					orderSelect: false,
					productSelect: false,
					touristSelect: false,
					reportSelect: false,
					settingSelect: true,
					messageSelect: false
				});
			} else if (e.pathname === '/home/message') {
				this.setState({
					indexColor: '#9fa4b2',
					orderColor: '#9fa4b2',
					productColor: '#9fa4b2',
					touristColor: '#9fa4b2',
					reportColor: '#9fa4b2',
					settingColor: '#9fa4b2',
					messageColor: '#ffffff',
					indexSelect: false,
					orderSelect: false,
					productSelect: false,
					touristSelect: false,
					reportSelect: false,
					settingSelect: false,
					messageSelect: true
				});
			} else {
				if (e.pathname !== '/') {
					const path = {
						pathname: '/',
						state: {
							message: '404 未找到对应页面!'
						}
					};
					this.props.history.push(path);
				}
			}
		});

		if (this.props.history.location.pathname === '/home/index') {
			this.setState({
				indexColor: '#ffffff',
				orderColor: '#9fa4b2',
				productColor: '#9fa4b2',
				touristColor: '#9fa4b2',
				reportColor: '#9fa4b2',
				settingColor: '#9fa4b2',
				messageColor: '#9fa4b2',
				indexSelect: true,
				orderSelect: false,
				productSelect: false,
				touristSelect: false,
				reportSelect: false,
				settingSelect: false,
				messageSelect: false
			});
		} else if (this.props.history.location.pathname === '/home/order') {
			this.setState({
				indexColor: '#9fa4b2',
				orderColor: '#ffffff',
				productColor: '#9fa4b2',
				touristColor: '#9fa4b2',
				reportColor: '#9fa4b2',
				settingColor: '#9fa4b2',
				messageColor: '#9fa4b2',
				indexSelect: false,
				orderSelect: true,
				productSelect: false,
				touristSelect: false,
				reportSelect: false,
				settingSelect: false,
				messageSelect: false
			});
		} else if (this.props.history.location.pathname.startsWith('/home/product')) {
			this.setState({
				indexColor: '#9fa4b2',
				orderColor: '#9fa4b2',
				productColor: '#ffffff',
				touristColor: '#9fa4b2',
				reportColor: '#9fa4b2',
				settingColor: '#9fa4b2',
				messageColor: '#9fa4b2',
				indexSelect: false,
				orderSelect: false,
				productSelect: true,
				touristSelect: false,
				reportSelect: false,
				settingSelect: false,
				messageSelect: false
			});
		} else if (this.props.history.location.pathname === '/home/tourist') {
			this.setState({
				indexColor: '#9fa4b2',
				orderColor: '#9fa4b2',
				productColor: '#9fa4b2',
				touristColor: '#ffffff',
				reportColor: '#9fa4b2',
				settingColor: '#9fa4b2',
				messageColor: '#9fa4b2',
				indexSelect: false,
				orderSelect: false,
				productSelect: false,
				touristSelect: true,
				reportSelect: false,
				settingSelect: false,
				messageSelect: false
			});
		} else if (this.props.history.location.pathname === '/home/report') {
			this.setState({
				indexColor: '#9fa4b2',
				orderColor: '#9fa4b2',
				productColor: '#9fa4b2',
				touristColor: '#9fa4b2',
				reportColor: '#ffffff',
				settingColor: '#9fa4b2',
				messageColor: '#9fa4b2',
				indexSelect: false,
				orderSelect: false,
				productSelect: false,
				touristSelect: false,
				reportSelect: true,
				settingSelect: false,
				messageSelect: false
			});
		} else if (this.props.history.location.pathname === '/home/setting') {
			this.setState({
				indexColor: '#9fa4b2',
				orderColor: '#9fa4b2',
				productColor: '#9fa4b2',
				touristColor: '#9fa4b2',
				reportColor: '#9fa4b2',
				settingColor: '#ffffff',
				messageColor: '#9fa4b2',
				indexSelect: false,
				orderSelect: false,
				productSelect: false,
				touristSelect: false,
				reportSelect: false,
				settingSelect: true,
				messageSelect: false
			});
		} else if (this.props.history.location.pathname === '/home/message') {
			this.setState({
				indexColor: '#9fa4b2',
				orderColor: '#9fa4b2',
				productColor: '#9fa4b2',
				touristColor: '#9fa4b2',
				reportColor: '#9fa4b2',
				settingColor: '#9fa4b2',
				messageColor: '#ffffff',
				indexSelect: false,
				orderSelect: false,
				productSelect: false,
				touristSelect: false,
				reportSelect: false,
				settingSelect: false,
				messageSelect: true
			});
		}
	}
	render () {
		const { indexColor, orderColor, productColor, touristColor, reportColor, indexSelect, orderSelect, productSelect, touristSelect, reportSelect } = this.state;
		const item = [
			{
				name: '首页',
				link: '/home/index',
				select: indexSelect,
				icon: `<svg t="1581938341927" style="vertical-align:middle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4417" width="20" height="20"><path d="M865.3 927.9H713.2c-34.6 0-62.7-28.1-62.7-62.7V693c0-11.5-9.4-20.9-20.9-20.9H403.9c-11.5 0-20.9 9.4-20.9 20.9v172.2c0 34.6-28.1 62.7-62.7 62.7H160.7c-16.9 0-32.7-6.6-44.6-18.6-11.9-12-18.3-27.9-18.2-44.7l3.7-397.7c0.2-17.9 8-35 21.6-46.7l348.6-303c23.5-20.4 58.8-20.4 82.3 0l348.6 303c13.5 11.8 21.4 28.8 21.6 46.7l3.7 397.7c0.2 16.9-6.3 32.8-18.2 44.7-11.8 12-27.7 18.6-44.5 18.6zM403.9 630.2h225.6c34.6 0 62.7 28.1 62.7 62.7v172.2c0 11.5 9.4 20.9 20.9 20.9h152.1c5.6 0 10.9-2.2 14.9-6.2s6.1-9.3 6.1-14.9l-3.7-397.7c-0.1-6-2.7-11.7-7.2-15.6l-348.6-303c-7.8-6.8-19.6-6.8-27.4 0l-348.6 303c-4.5 3.9-7.1 9.6-7.2 15.6L139.8 865c-0.1 5.6 2.1 10.9 6.1 14.9 4 4 9.2 6.2 14.9 6.2h159.6c11.5 0 20.9-9.4 20.9-20.9V693c-0.1-34.6 28-62.8 62.6-62.8z" fill=${ indexColor } p-id="4418"></path></svg>`
			}, {
				name: '订单',
				link: '/home/order',
				select: orderSelect,
				icon: `<svg t="1581948565477" style="vertical-align:middle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5719" width="20" height="20"><path d="M864.75 97h-705.5C124.93 97 97 124.93 97 159.25v705.5c0 34.32 27.93 62.25 62.25 62.25h705.5c34.32 0 62.25-27.93 62.25-62.25v-705.5C927 124.93 899.07 97 864.75 97z m-168.49 41.5v141.14H327.74V138.5h368.52zM885.5 864.75c0 11.45-9.3 20.75-20.75 20.75h-705.5c-11.45 0-20.75-9.3-20.75-20.75v-705.5c0-11.45 9.3-20.75 20.75-20.75h126.99v145.29c0 20.58 16.77 37.35 37.35 37.35h376.82c20.58 0 37.35-16.77 37.35-37.35V138.5h126.99c11.45 0 20.75 9.3 20.75 20.75v705.5z" p-id="5720" fill=${ orderColor }></path><path d="M717.01 509.09H306.99c-11.46 0-20.75-9.29-20.75-20.75s9.29-20.75 20.75-20.75h410.02c11.46 0 20.75 9.29 20.75 20.75s-9.29 20.75-20.75 20.75zM622.39 666.79h-315.4c-11.46 0-20.75-9.29-20.75-20.75s9.29-20.75 20.75-20.75h315.4c11.46 0 20.75 9.29 20.75 20.75s-9.29 20.75-20.75 20.75z" p-id="5721" fill=${ orderColor }></path></svg>`
			}, {
				name: '商品管理',
				link: '/home/product/tourist',
				select: productSelect,
				icon: `<svg t="1581949547170" style="vertical-align:middle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6319" width="20" height="20"><path d="M173.9 447.7h212.5c36.9 0 67.1-30.2 67.1-67.1V168c0-36.9-30.2-67.1-67.1-67.1H173.9c-36.9 0-67.1 30.2-67.1 67.1v212.5c0 37 30.2 67.2 67.1 67.2zM167.3 168c0-3.5 3.1-6.6 6.6-6.6h212.5c3.5 0 6.6 3.1 6.6 6.6v212.5c0 3.5-3.1 6.6-6.6 6.6H173.9c-3.5 0-6.6-3.1-6.6-6.6V168zM640.9 447.7h212.5c36.9 0 67.1-30.2 67.1-67.1V168c0-36.9-30.2-67.1-67.1-67.1H640.9c-36.9 0-67.1 30.2-67.1 67.1v212.5c0 37 30.2 67.2 67.1 67.2z m0-286.3h212.5c3.5 0 6.6 3.1 6.6 6.6v212.5c0 3.5-3.1 6.6-6.6 6.6H640.9c-3.5 0-6.6-3.1-6.6-6.6V168c0-3.5 3.1-6.6 6.6-6.6zM129.6 605.8h768.2c16.7 0 30.3-13.5 30.3-30.3s-13.5-30.3-30.3-30.3H129.6c-16.7 0-30.3 13.5-30.3 30.3s13.6 30.3 30.3 30.3zM897.7 703.7H129.6c-16.7 0-30.3 13.5-30.3 30.3 0 16.7 13.5 30.3 30.3 30.3h768.2c16.7 0 30.3-13.5 30.3-30.3-0.1-16.7-13.7-30.3-30.4-30.3zM897.7 862.2H129.6c-16.7 0-30.3 13.5-30.3 30.3s13.5 30.3 30.3 30.3h768.2c16.7 0 30.3-13.5 30.3-30.3s-13.7-30.3-30.4-30.3z" p-id="6320" fill=${ productColor }></path></svg>`
			}, {
				name: '游客管理',
				link: '/home/tourist',
				select: touristSelect,
				icon: `<svg t="1581949739821" style="vertical-align:middle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7186" width="20" height="20"><path d="M937.813 826.657h-67.215V580.201h22.405c37.065 0 67.215-30.151 67.215-67.215 0-12.384-10.032-22.405-22.405-22.405-12.373 0-22.405 10.021-22.405 22.405 0 12.362-10.054 22.405-22.405 22.405h-7.692l-61.044-61.037c14.509-12.338 23.926-30.493 23.926-50.989 0-12.384-10.032-22.405-22.405-22.405-12.373 0-22.405 10.021-22.405 22.405 0 12.362-10.054 22.405-22.405 22.405h-22.405V333.744h44.81c37.065 0 67.215-30.151 67.215-67.215 0-12.384-10.032-22.405-22.405-22.405-12.373 0-22.405 10.021-22.405 22.405 0 12.362-10.054 22.405-22.405 22.405h-7.692l-72.581-72.575c8.117-11.108 13.058-24.67 13.058-39.451 0-12.384-10.032-22.405-22.405-22.405-12.373 0-22.405 10.021-22.405 22.405 0 12.362-10.054 22.405-22.405 22.405H355.279c-12.351 0-22.405-10.043-22.405-22.405 0-12.384-10.032-22.405-22.405-22.405-12.373 0-22.405 10.021-22.405 22.405 0 16.168 5.972 30.822 15.517 42.429l-69.603 69.596h-13.129c-12.351 0-22.405-10.043-22.405-22.405 0-12.384-10.032-22.405-22.405-22.405-12.373 0-22.405 10.021-22.405 22.405 0 37.065 30.151 67.215 67.215 67.215h44.81V445.77h-22.405c-12.351 0-22.405-10.043-22.405-22.405 0-12.384-10.032-22.405-22.405-22.405-12.373 0-22.405 10.021-22.405 22.405 0 21.883 10.668 41.167 26.904 53.447l-58.585 58.578h-13.129c-12.351 0-22.405-10.043-22.405-22.405 0-12.384-10.032-22.405-22.405-22.405s-22.405 10.021-22.405 22.405c0 37.065 30.151 67.215 67.215 67.215h22.405v246.456H86.418c-12.373 0-22.405 10.021-22.405 22.405s10.032 22.405 22.405 22.405h851.395c12.373 0 22.405-10.021 22.405-22.405s-10.032-22.404-22.405-22.404z m-112.026 0h-44.81V580.201h44.81v246.456zM512.115 692.226c-12.351 0-22.405-10.043-22.405-22.405 0-12.362 10.054-22.405 22.405-22.405s22.405 10.043 22.405 22.405c0 12.362-10.054 22.405-22.405 22.405z m86.44 134.431h-172.88c10.02-38.548 44.803-67.215 86.44-67.215s76.42 28.667 86.44 67.215z m-44.079-105.081c15.043-12.336 24.854-30.826 24.854-51.754 0-37.065-30.151-67.215-67.215-67.215S444.9 632.756 444.9 669.821c0 20.928 9.812 39.418 24.854 51.754-46.525 15.503-81.716 55.746-90.046 105.081h-91.644V580.201h448.103v246.456h-91.644c-8.33-49.335-43.522-89.578-90.047-105.081zM713.761 445.77h-44.81V333.744h44.81V445.77z m-89.62-112.026V445.77H400.09V333.744h224.051z m-281.98-89.62h345.346l44.816 44.81H297.345l44.816-44.81z m-31.692 89.62h44.81V445.77h-44.81V333.744zM252.54 490.58h524.587l44.816 44.81H207.724l44.816-44.81z m-54.097 89.621h44.81v246.456h-44.81V580.201z" fill=${ touristColor } p-id="7187"></path></svg>`
			}, {
				name: '报表',
				link: '/home/report',
				select: reportSelect,
				icon: `<svg t="1581949817991" style="vertical-align:middle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8120" width="20" height="20"><path d="M569.6 115.2L569.6 0 454.4 0l0 115.2L0 115.2l0 115.2 57.6 0 0 576 358.4 0L192 979.2 230.4 1024l275.2-224 0 0 275.2 224 38.4-44.8-217.6-179.2 364.8 0 0-576L1024 224 1024 115.2 569.6 115.2zM908.8 742.4L115.2 742.4l0-512 793.6 0L908.8 742.4zM281.6 627.2L281.6 454.4l172.8 0c0-83.2-70.4-147.2-153.6-147.2-83.2 0-153.6 70.4-153.6 153.6C153.6 544 198.4 627.2 281.6 627.2zM339.2 684.8C428.8 684.8 512 595.2 512 512L339.2 512 339.2 684.8zM793.6 339.2L627.2 339.2l0 57.6 172.8 0L800 339.2zM793.6 454.4L627.2 454.4 627.2 512l172.8 0L800 454.4zM793.6 569.6L627.2 569.6l0 57.6 172.8 0L800 569.6z" fill=${ reportColor } p-id="8121"></path></svg>`
			}
		];
		const system = [
			// {
			// 	name: '设置',
			// 	link: '/home/setting',
			// 	select: settingSelect,
			// 	icon: `<svg t="1581953467243" style="vertical-align:middle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16279" width="20" height="20"><path d="M515.5 353.2c-83.1 0-150.6 67.5-150.6 150.6s67.5 150.7 150.6 150.7 150.6-67.6 150.6-150.7c0.1-83.1-67.5-150.6-150.6-150.6z m0 274.4c-68.2 0-123.7-55.5-123.7-123.7 0-68.3 55.5-123.7 123.7-123.7 68.3 0 123.7 55.5 123.7 123.7 0.1 68.3-55.4 123.7-123.7 123.7z m0 0" fill=${ settingColor } p-id="16280"></path><path d="M1007.8 645.5c-46.9-32.4-74.8-85.4-74.8-141.9 0-54.1 25-104.3 68.4-137.4l8.8-6.7-95.9-198.1-13.3 10c-22.3 16.9-35.5 16.7-64.8 15.9-6-0.1-12.5-0.3-19.8-0.3-57.8 0-111.2-28.7-143.6-77.1l-2.1-3.5C653.2 78.7 644 46.8 644 13.6V0H401.9l-0.6 12.9c-4.3 92.2-79.9 164.4-172 164.4-6.6 0-12.7 0.1-18.5 0.2-28.6 0.5-43.2 0.9-65.3-15.7l-13.2-9.8-92 191.5 9.1 6.7c44 32.4 70.2 84.2 70.2 138.4 0 66.6-39.1 128-99.8 156.4l-12.7 6 118.4 233 13-10c30.5-23.6 66.9-36.1 105.3-36.1 95.2 0 172.7 77.4 172.7 172.5v13.6h228.3l-1.3-14.9c-0.5-5.6-0.8-11.4-0.8-17.4 0-95.2 77.4-172.8 172.5-172.8 30.8 0 61.6 8.6 89 24.8l12.5 7.4 100.8-198.8-9.7-6.8zM905.3 813.2c-28.3-14.1-59.2-21.7-90.1-21.7-110.1 0-199.7 89.7-199.7 200 0 1.6 0 3.3 0.1 4.9H443.4c-7-103.8-93.8-186.2-199.5-186.2-38.3 0-76.4 11.4-108.7 32.3L43.8 663.2c63-35.1 103-102.2 103-174.6 0-59-26.9-115.5-72.4-153.3L143 192.8c23.2 12.9 42.8 12.5 68.5 12 5.5-0.1 11.4-0.2 18-0.2 102.3 0 187-77 198.2-177.4h189.8c2.1 31.8 11.8 62.7 28.5 90.2l2.1 3.7c37.2 58.2 100.3 92.9 168.7 92.9 6.9 0 13.2 0.1 19.1 0.3 25.4 0.6 44.9 1.1 68.1-12.2l72.3 149.3c-45 38.2-70.5 93-70.5 152 0 61.5 28.5 119.4 77 157.3l-77.5 152.5z m0 0" fill=${ settingColor } p-id="16281"></path><path d="M514.4 185l-3.3 27c187.8 23 327.2 176.6 310.6 342.6l27.1 2.7c18-180.5-131.9-347.6-334.4-372.3z m0 0M810.5 611.8c0 8.9 7.2 16.2 16.2 16.2 8.9 0 16.2-7.2 16.2-16.2 0-8.9-7.2-16.2-16.2-16.2-9 0.1-16.2 7.3-16.2 16.2z m0 0" fill=${ settingColor } p-id="16282"></path></svg>`
			// }
			// , {
			// 	name: '消息',
			// 	select: messageSelect,
			// 	link: '/home/message',
			// 	icon: `<svg t="1581953660050" style="vertical-align:middle" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17112" width="20" height="20"><path d="M870.4 844.8h-204.8a153.6 153.6 0 0 1-307.2 0H153.6a51.2 51.2 0 0 1-51.2-51.2v-51.2h102.4v-307.2a307.2 307.2 0 0 1 256-302.08V76.8a51.2 51.2 0 0 1 102.4 0v56.32a307.2 307.2 0 0 1 256 302.08v307.2h102.4v51.2a51.2 51.2 0 0 1-51.2 51.2z m-358.4 51.2a51.2 51.2 0 0 0 51.2-51.2H460.8a51.2 51.2 0 0 0 51.2 51.2z m204.8-460.8a204.8 204.8 0 0 0-204.8-204.8 204.8 204.8 0 0 0-204.8 204.8v307.2h409.6z" fill=${ messageColor } p-id="17113"></path></svg>`
			// }
		];

		return (
			<div className={ s.left }>
				<div className={ s.title }>
					<div className={ s.name }>
						<svg t="1581951265425" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15487" width="32" height="32"><path d="M541.135 729.917c8.552 0.132 17.083 0.369 25.59 0.714 8.841-59.602 20.568-200.411-43.532-302.466 15.342 37.091 24.996 79.567 28.718 126.794 5.92 75.103-4.452 142.762-10.776 174.958zM421.234 734.936c29.291-2.873 58.45-4.543 87.4-5.005 5.59-27.049 17.633-96.98 11.505-173.239-8.209-102.158-44.384-176.453-107.714-221.701-1.181-0.488-2.359-0.978-3.557-1.453 0.001 0 109.877 155.17 12.366 401.398z" fill="#FCDE9E" p-id="15488" /><path d="M947.909 826.882c-80.819-39.993-166.72-67.849-256.14-83.151l92.297-171.766 129.689 74.601 7.931-13.786c21.589-37.53 27.258-81.484 15.963-123.767-10.543-39.463-34.662-72.78-68.344-94.737l12.279-21.347c4.38-7.614 1.758-17.338-5.856-21.718-7.615-4.38-17.338-1.758-21.717 5.856l-12.949 22.51c-19.187-7.705-39.763-11.733-60.55-11.733-58.776 0-113.326 31.358-142.362 81.837l-7.931 13.786 126.261 72.629-94.725 176.285a15.82 15.82 0 0 0-1.848 6.448 965.334 965.334 0 0 0-34.785-4.12 994.285 994.285 0 0 0-58.398-4.08c-8.508-0.345-17.038-0.583-25.59-0.714 6.324-32.196 16.696-99.855 10.776-174.958-3.722-47.226-13.376-89.703-28.718-126.794-4.431-10.713-9.313-21-14.693-30.794a284.025 284.025 0 0 0-12.18-20.16l112.384 67.085-1.043-2.818c-22.897-61.93-52.595-104.129-88.27-125.425-3.14-1.874-6.248-3.753-9.332-5.617-28.211-17.052-54.857-33.159-85.43-33.159-7.636 0-15.286 1.018-23.018 3.045l217.138-121.185-2.384-0.726c-19.032-5.796-40.092-8.86-60.902-8.86-33.73 0-65.538 7.801-91.984 22.561-26.575 14.832-47.789 32.021-63.053 51.092-10.079 12.592-17.769 26.283-23.051 40.915l3.65-250.685-1.82 1.701c-39.114 36.556-63.859 89.914-64.578 139.253-0.275 18.88 1.272 36.424 4.605 52.458-11.647-13.789-24.176-24.706-37.545-32.686-3.14-1.874-6.248-3.753-9.332-5.617-28.211-17.052-54.857-33.159-85.43-33.159-19.404 0-38.898 6.471-59.594 19.783l-1.439 0.925 216.937 129.495 0.686 0.949a216.823 216.823 0 0 0-29.784-2.075c-33.73 0-65.538 7.801-91.984 22.561-26.575 14.832-47.789 32.021-63.053 51.092-17.119 21.387-27.403 45.919-30.567 72.913l-0.242 2.06 228.959-127.782a154.087 154.087 0 0 1 2.201 3.613c-29.669 35.037-47.833 80.117-48.447 122.273-0.443 30.431 3.837 57.398 12.72 80.152 9.963 25.519 26.066 46.691 47.861 62.929l1.663 1.24 3.367-231.249c7.024 17.346 14.424 39.859 19.988 67.366 13.579 67.133 18.135 177.297-37.27 320.879a15.826 15.826 0 0 0-0.356 10.384c-4.197 0.654-8.396 1.323-12.596 2.025C184.93 771.85 79.085 824.704 74.658 826.941c-7.84 3.961-10.984 13.528-7.023 21.368 3.962 7.841 13.529 10.983 21.369 7.023 1.041-0.526 105.906-52.9 262.218-79.042 144.132-24.103 362.202-29.95 582.579 79.102a15.837 15.837 0 0 0 7.041 1.653c5.858 0 11.494-3.248 14.268-8.854 3.896-7.872 0.671-17.412-7.201-21.309zM780.512 419.656c10.826 0 21.578 1.369 32.006 4.006L707.089 490.99l-32.583-18.743c24.677-32.776 63.993-52.591 106.006-52.591z m120.697 182.996l-41.327-23.773 5.323-128.049c20.16 17.138 34.678 40.061 41.711 66.393 7.709 28.86 5.637 58.654-5.707 85.429z m-96.538-136.236l-33.127 61.65-33.361-19.19 66.488-42.46z m27.371 16.264l-3.255 78.313-29.658-17.06 32.913-61.253z m-397.05 67.013c4.151-50.288 1.588-98.861-7.617-144.371-6.269-30.993-14.755-56.322-22.802-75.73a231.257 231.257 0 0 1 7.853 5.399c63.329 45.248 99.505 119.543 107.714 221.701 6.128 76.26-5.916 146.19-11.505 173.239-28.949 0.463-58.108 2.132-87.4 5.005a1104.998 1104.998 0 0 0-30.491 3.413c24.35-64.468 39.233-127.909 44.248-188.656z" fill="#58A80A" p-id="15489" /><path d="M812.518 423.662a130.58 130.58 0 0 0-32.006-4.006c-42.013 0-81.329 19.815-106.006 52.591l32.583 18.743 105.429-67.328zM832.042 482.68l-32.914 61.253 29.659 17.06zM865.204 450.831l-5.323 128.049 41.327 23.773c11.345-26.775 13.417-56.569 5.707-85.429-7.034-26.332-21.551-49.255-41.711-66.393zM804.671 466.416l-66.488 42.46 33.361 19.19z" fill="#FCDE9E" p-id="15490" />
						</svg>
						<div className={ s.text }>x-trip</div>
					</div>
				</div>
				{item.map((i, k) => {
					return (
						<div key={ k } className={ cn(i.select && s.whiteBackgrpond, s.item) }>
							<Link to={ i.link } className={ s.link }>
								<span dangerouslySetInnerHTML={ {__html: i.icon || ''} } />
								<span className={ cn(i.select && s.whiteText, s.textLink) }> {i.name}</span>
							</Link>
						</div>
					);
				})}
				<div className={ s.bottom }>
					{system.map((i, k) => {
						return (
							<div key={ k } className={ cn(i.select && s.whiteBackgrpond, s.item) }>
								<Link to={ i.link } className={ s.link }>
									<span dangerouslySetInnerHTML={ {__html: i.icon || ''} } />
									<span className={ cn(i.select && s.whiteText, s.textLink) }> {i.name}</span>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default withRouter(Sidebar);
