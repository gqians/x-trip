/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import L from 'leaflet';
import '../../../node_modules/leaflet.markercluster/dist/MarkerCluster.css';
import '../../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../../node_modules/leaflet.markercluster/dist/leaflet.markercluster';
import '../../../node_modules/leaflet/dist/leaflet.css';
import makerImage from '../../../static/images/marker_all.png';
import hotelImage from '../../../static/images/hotel.png';
import 'leaflet.chinatmsproviders';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import s from './style.css';
import LoadingHoc from '../../components/loadingHoc';
import SideBar from './sidebar';
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
		hotels: this.props.data.HotelFindMany,
		routes: this.props.data.RouteFindMany,

		route: this.props.data.RouteFindMany.length,
		touristSpot: this.props.data.TouristSpotsFindMany.length,
		ghandruk: this.props.data.HotelFindMany.length,
		order: this.props.data.TouristFindMany.length,
		active: 0,

		touristSpotMakers: null,
		hotelMakers: null,
		routeMakers: null,
		routeLineMakers: null,

		map: null
	};
	myIcon = L.icon({
		iconUrl: makerImage,
		iconSize: [30, 30],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76]
	});
	hotelIcon = L.icon({
		iconUrl: hotelImage,
		iconSize: [40, 40],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76]
	})
	componentDidMount () {
		let { map, touristSpotMakers, hotelMakers } = this.state;
		const { touristSpots, hotels } = this.state;

		map = L.map('map', {
			center: [32.6055981258, 116.8723554369],
			zoom: 4
		});
		L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
			key: '8224438ab24856da5d3aae952e06b5de',
			maxZoom: 18,
			minZoom: 4
		}).addTo(map);
		L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
			key: '8224438ab24856da5d3aae952e06b5de',
			maxZoom: 18,
			minZoom: 4}).addTo(map);

		// 生成旅游点layer
		touristSpotMakers = L.markerClusterGroup();
		touristSpots.forEach(spot => {
			const title = spot.name;
			const lat = spot.lat;
			const lng = spot.lng;
			const description = spot.description;
			const marker = L.marker(new L.LatLng(lat, lng), { title, icon: this.myIcon });
			marker.bindPopup(description);
			touristSpotMakers.addLayer(marker);
		});
		map.addLayer(touristSpotMakers);
		// 生成住宿点layer
		hotelMakers = L.markerClusterGroup();
		hotels.forEach(hotel => {
			const title = hotel.name;
			const lat = hotel.lng;
			const lng = hotel.lat;
			const description = hotel.address;
			const marker = L.marker(new L.LatLng(lat, lng), { title, icon: this.hotelIcon });
			marker.bindPopup(description);
			hotelMakers.addLayer(marker);
		});

		this.setState({
			map,
			touristSpotMakers,
			hotelMakers
		});
	}
	touristSpotHandler (key) {
		const { map, touristSpotMakers } = this.state;
		map.eachLayer((layer) => {
			if (!layer['_url']) {
				layer.remove();
			}
		});
		map.addLayer(touristSpotMakers);
		this.setState({
			active: key
		});
	}
	hotelHandler (key) {
		const {map, hotelMakers} = this.state;
		map.eachLayer((layer) => {
			if (!layer['_url']) {
				layer.remove();
			}
		});
		map.addLayer(hotelMakers);
		this.setState({
			active: key
		});
	}
	routeHandler (key) {
		const {map} = this.state;
		map.eachLayer((layer) => {
			if (!layer['_url']) {
				layer.remove();
			}
		});
		this.setState({
			active: key
		});
	}
	orderHandler =() => {
		this.props.history.push('/home/tourist');
	}
	render () {
		console.log('index-渲染');
		const {className} = this.props;
		const {active, route, touristSpot, ghandruk, order, touristSpots, hotels, routes} = this.state;
		const items = [
			{
				name: '已开通旅游点',
				num: touristSpot,
				key: 0,
				handler: this.touristSpotHandler
			}, {
				name: '已开通路线',
				num: route,
				key: 1,
				handler: this.routeHandler
			}, {
				name: '已开通住宿点',
				num: ghandruk,
				key: 2,
				handler: this.hotelHandler
			}, {
				name: '已注册用户',
				num: order,
				key: 3,
				handler: this.orderHandler
			}
		];
		return (
			<div className={ cn(className, s.index) }>
				<div className={ s.firstRow }>
					{items.map((item) => {
						return (
							<div key={ item.key } className={ cn(s.span, active === item.key ? s.active : '') } onClick={ item.handler.bind(this, item.key) }>
								<span>{ item.name }</span>
								<span className={ s.num }>{item.num}</span>
							</div>
						);
					})}
				</div>
				<div className={ s.secondRow }>
					<div className={ s.map } id="map" />
					{(active === 0 || active === 2) &&
						<SideBar data={ active === 0 ? touristSpots : hotels } map={ this.state.map }/>
					}
					{
						(active === 1) &&
						<SideBar data={ routes } map={ this.state.map } active={ {active} }/>
					}
				</div>
			</div>
		);
	}
}
export default compose(
	graphql(gql`
	  query{
		  TouristSpotsFindMany(limit:2000){
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
		RouteFindMany{
			name
			tips
			getRoute {
			  name
			  addedTime
			  address
			  lat
			  lng
			  picture
			  description
			  star
			  price
			  url
			}
		  }
		HotelFindMany(limit:20000){
			name
			province
			city
			county
			phoneNumber
			address
			hotelType
			lat
			lng
		}
		TouristFindMany{
			name
		}
	  }
  `)
)(LoadingHoc(Index));
