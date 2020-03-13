import React from 'react';
import PropTypes from 'prop-types';
import s from './style.css';
class ProductRoute extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			replace: PropTypes.func.isRequired
		}).isRequired,
		location: PropTypes.shape({
			search: PropTypes.string.isRequired
		}).isRequired,
		show: PropTypes.bool
	};
	static defaultProps = {
		className: '',
		show: false
	};
	render () {
		return (<div className={ s.pop }><div className={ s.popUp }>11</div></div>);
	}
}
export default ProductRoute;
