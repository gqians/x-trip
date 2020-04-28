import React from 'react';
import BreadCrumb from './breadCrumb';
import ProductTourist from './touristSpots';
import ProductHotel from './hotel';
// import ProductRoute from './route';
// import ProductAdd from './popLayer';
import PropTypes from 'prop-types';
import s from './style.css';
class Product extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		history: PropTypes.shape({
			push: PropTypes.func
		})
	};
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
		}
		// {
		// 	path: '/home/product/route',
		// 	title: '路线',
		// 	component: ProductRoute
		// },
		// {
		// 	path: '/home/product/add',
		// 	title: '添加商品',
		// 	component: ProductAdd
		// }
	];

	render () {
		return (
			<div className={ s.product }>
				{BreadCrumb(this.tabs, this.props.history)}
			</div>);
	}
}
export default Product;
