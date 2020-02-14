import React from 'react';
// import cn from 'classnames';
import PropTypes from 'prop-types';
// import gql from 'graphql-tag';
// import { graphql, withApollo } from 'react-apollo';
import s from './style.css';

// import Input from '../../components/input';

class Login extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		history: PropTypes.shape({
			push: PropTypes.func
		}),
		data: PropTypes.shape({
			JobOne: PropTypes.object
		}),
		match: PropTypes.shape({
			params: PropTypes.shape({
				id: PropTypes.string
			})
		}),
		jobCreateOne: PropTypes.func,
		jobUpDateOne: PropTypes.func
	};

	static defaultProps = {
		className: ''
	};

	render () {
		const { className } = this.props;
		console.log(className);
		return (
			<div className={ s.login }>
				<div className={ s.left } >
					<label>登录</label>
				</div>
				<div className={ s.right } >
					<span>欢迎光临，请输入您的电子邮箱和密码以登录！1111111</span>
				</div>
			</div>
		);
	}
}
export default Login;
