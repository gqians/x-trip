/* eslint-disable react/no-array-index-key */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import L from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
// import {tiledMapLayer} from '@supermap/iclient-leaflet';
import 'leaflet.chinatmsproviders';
// import gql from 'graphql-tag';
// import { gql, graphql } from 'react-apollo';
import s from './style.css';
// import axios from 'axios';
// import { withRouter } from 'react-router-dom';
// import fetch from 'node-fetch';
// import Input from '../../components/input';
// const login = gql`query { todos { text } }`;
class Index extends React.PureComponent {
	constructor () {
		super();
		this.map = null;
	}
	static propTypes = {
		className: PropTypes.string,
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		history: PropTypes.shape({
			push: PropTypes.func
		})
	};
	state = {
		route: 0,
		touristSpot: 0,
		ghandruk: 0,
		order: 0
	};
	componentDidMount () {
		this.map = L.map('map', {
			center: [31.59, 120.29],
			zoom: 5
		});
		L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
			key: '8224438ab24856da5d3aae952e06b5de',
			maxZoom: 18,
			minZoom: 5
		}).addTo(this.map);
		L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
			key: '8224438ab24856da5d3aae952e06b5de',
			maxZoom: 18,
			minZoom: 5}).addTo(this.map);
	}
	render () {
		const {className} = this.props;
		const {route, touristSpot, ghandruk, order} = this.state;
		const items = [
			{
				name: '已开通路线',
				num: route
			}, {
				name: '已开通旅游点',
				num: touristSpot
			}, {
				name: '已开通住宿点',
				num: ghandruk
			}, {
				name: '未处理订单',
				num: order
			}
		];
		return (
			<div className={ cn(className, s.index) }>
				<div className={ s.firstRow }>
					{items.map((item, key) => {
						return (
							<div key={ key } className={ s.span }>
								<span>{ item.name }</span>
								<span className={ s.num }>{item.num}</span>
							</div>
						);
					})}
				</div>
				<div className={ s.secondRow }>
					<div className={ s.map } id="map" />
				</div>
			</div>
		);
	}
}
export default Index;
