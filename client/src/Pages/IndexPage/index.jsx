/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import L from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
// import {tiledMapLayer} from '@supermap/iclient-leaflet';
import 'leaflet.chinatmsproviders';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import s from './style.css';
import Loading from '../../components/loading';
class Index extends React.PureComponent {
	constructor (props) {
		super(props);
	}
	static propTypes = {
		className: PropTypes.string,
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		history: PropTypes.shape({
			push: PropTypes.func
		}),
		data: PropTypes.object
	};
	state = {
		touristSpots: this.props.data.TouristSpotsFindMany,
		route: 0,
		touristSpot: this.props.data.TouristSpotsFindMany.length,
		ghandruk: 0,
		order: 0
	};
	map=null;
	componentDidMount () {
		console.log('index-地图渲染');
		this.map = L.map('map', {
			center: [32.6055981258, 116.8723554369],
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
		console.log('index-渲染');
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
export default graphql(gql`
	query{
		TouristSpotsFindMany{
		name
		addedTime
		address
		lat
		lng
		picture
		description
		star
		price
		businessHours{
			startTime
			endTime
		}
		}
	}
`)(Loading(Index));
