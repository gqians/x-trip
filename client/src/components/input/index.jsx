import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { CloseFilled16 as ClearIcon } from '@carbon/icons-react';
import s from './style.css';

export default class Input extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		type: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		size: PropTypes.oneOf(['small', 'default', 'large']),
		before: PropTypes.node,
		after: PropTypes.node,
		allowClear: PropTypes.bool,
		onPressEnter: PropTypes.func,
		onChange: PropTypes.func
	};

	static defaultProps = {
		className: '',
		type: 'text',
		size: 'default',
		allowClear: false,
		onChange () {}
	};

	static getDerivedStateFromProps (props, state) {
		if (props.hasOwnProperty('value') && props.value !== state.value) {
			return { value: props.value };
		}

		return null;
	}

	state = {
		value: this.props.value
	};

	handleChange = e => {
		if (this.props.hasOwnProperty('value')) {
			this.props.onChange(e.target.value);
		} else {
			this.setState({ value: e.target.value });
		}
	};

	handleClear = () => {
		if (!this.state.value) return;
		this.setState({ value: '' }, () => {
			this.props.onChange('');
		});
	};

	handleKeyDown = e => {
		if (e.key === 'Enter') this.props.onPressEnter(e);
	};

	render () {
		const {
			className,
			type,
			size,
			before,
			after,
			allowClear,
			onPressEnter,
			onChange,
			...props
		} = this.props;
		const { value } = this.state;

		if (type !== 'text') {
			return (
				<input
					className={ cn(className, s.inputWrapper, s[size]) }
					type={ type }
					{ ...props }
					value={ value }
					onChange={ this.handleChange }
				/>
			);
		}

		let afterContent = after;
		if (allowClear) {
			afterContent = (
				<ClearIcon className={ s.clearIcon } onClick={ this.handleClear } />
			);
		}

		if (!before && !afterContent) {
			return (
				<input
					className={ cn(className, s.inputWrapper, s[size]) }
					{ ...props }
					value={ value }
					onChange={ this.handleChange }
					onKeyDown={ onPressEnter ? this.handleKeyDown : undefined }
				/>
			);
		}

		const beforeElem = before && React.Children.only(before);
		const afterElem = afterContent && React.Children.only(afterContent);

		return (
			<div
				className={ cn(className, s.inputWrapper, s[size]) }
				disabled={ props.disabled }
			>
				{before &&
					React.cloneElement(React.Children.only(beforeElem), {
						...beforeElem.props,
						className: cn(s.before, beforeElem.props.className)
					})}
				<input
					className={ s.input }
					{ ...props }
					value={ value }
					onChange={ this.handleChange }
					onKeyDown={ onPressEnter ? this.handleKeyDown : undefined }
				/>
				{afterElem &&
					React.cloneElement(afterElem, {
						...afterElem.props,
						className: cn(s.after, afterElem.props.className)
					})}
			</div>
		);
	}
}
