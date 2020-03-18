import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import s from './style.css';

function RadioButton ({ className, children, checked, value, onChecked }) {
	return (
		<div
			className={ cn(className, s.radioButton, {
				[s.checked]: checked
			}) }
		>
			<div className={ cn(s.origin) } onClick={ () => onChecked(value) }>
				<div className={ s.circle }>
					<span className={ s.center } />
				</div>
				<span>{children}</span>
			</div>
		</div>
	);
}

RadioButton.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	checked: PropTypes.bool,
	value: PropTypes.string,
	onChecked: PropTypes.func
};
RadioButton.defaultProps = {
	className: '',
	checked: false,
	handleChecked: () => {},
	onChecked: () => {}
};

export default RadioButton;
