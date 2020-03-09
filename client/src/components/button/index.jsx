import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import s from './style.css';
export default class Input extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		text: PropTypes.string,
		onClick: PropTypes.func,
		size: PropTypes.oneOf(['small', 'default', 'large'])
	};
	static defaultProps = {
		className: '',
		onClick () {},
		size: 'default',
		text: '点击'
	};
	render () {
		const {className, onClick, size, text} = this.props;
		return (
			<div
				className={ cn(className, s.button, s[size]) }
				onClick={ onClick }
			>
				<span className={ s.text }>{text}</span>
			</div>);
	}
}
