import React from 'react';
import BreadCrumb from './breadCrumb';
import ProductTourist from './touristSpots';
import ProductHotel from './hotel';
import ProductRoute from './route';
import PropTypes from 'prop-types';
import Pop from './popLayer';
import s from './style.css';
class Product extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		history: PropTypes.shape({
			push: PropTypes.func
		})
	};
	state={
		showPop: false
	}
	tabs = [
		{
			path: '/home/product/tourist',
			title: '旅游点',
			component: ProductTourist
		},
		{
			path: '/home/product/hotel',
			title: '住宿点',
			component: ProductHotel
		},
		{
			path: '/home/product/route',
			title: '路线',
			component: ProductRoute
		}
	];
	toShowPop=() => {
		const { showPop } = this.state;
		this.setState({
			showPop: !showPop
		});
	}
	render () {
		const {showPop} = this.state;
		return (
			<div className={ s.product }>
				{showPop && <Pop showPop={ this.toShowPop }/>}
				{BreadCrumb(this.tabs, this.props.history)}
			</div>);
	}
}
export default Product;
