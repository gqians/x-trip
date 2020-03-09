import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
// import loading from '../loading';
import s from './style.css';

export default function Loading ({className}) {
	return (
		<div className={ cn(className, s.loading) }>
			<svg width="100" height="100" className={ s.svg }>
				<g >
					<text x="50" y="55" className={ s.text }>加载中</text>
					<circle cx="50" cy="50" r="40" />
				</g>
			</svg>
		</div>
	);
}
Loading.propTypes = {
	className: PropTypes.string
};

Loading.defaultProps = {
	className: ''
};
