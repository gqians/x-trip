/* eslint-disable react/no-array-index-key */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import s from './style.css';
import L from 'leaflet';
import makerImage from '../../../../static/images/circle.png';
class sidebar extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		history: PropTypes.shape({
			push: PropTypes.func
		}),
		data: PropTypes.array,
		map: PropTypes.object,
		active: PropTypes.object
	};
	state = {
		out: true,
		showInput: false,
		inputData: [],
		finalData: [],
		inputValue: '',
		routeMakers: null
	};
	myIcon = L.icon({
		iconUrl: makerImage,
		iconSize: [30, 30]
	});
	sidebarHandler () {
		if (!this.state.out) {
			this.setState({
				out: true
			});
		} else {
			this.setState({
				out: false
			});
		}
	};
	searchHandler =() => {
		const {inputValue} = this.state;
		const {data} = this.props;
		const finalData = [];
		if (inputValue.length === 0) {
			return;
		}
		data.forEach(element => {
			if (element.name.includes(inputValue)) {
				finalData.push(element);
			};
		});
		this.setState({
			finalData,
			showInput: false
		});
	};
	listClickHandler (text) {
		this.setState({
			inputValue: text,
			showInput: false
		});
	}
	mouseEnterHandler = (ele) => {
		const {map, active} = this.props;
		let {routeMakers} = this.state;
		if (active && active.active === 1) {
			// 生成路线marker layer
			routeMakers = L.layerGroup();
			const path = [];
			ele.getRoute.forEach(spot => {
				const title = spot.name;
				const lat = spot.lat;
				const lng = spot.lng;
				const description = spot.description;
				path.push([lat, lng]);
				const marker = L.marker(new L.LatLng(lat, lng), {
					title,
					icon: this.myIcon,
					riseOffset: 0
				});
				var polyline = L.polyline(path, {color: 'hsl(200,84%,46%)'});
				marker.bindPopup(description);
				routeMakers.addLayer(marker);
				routeMakers.addLayer(polyline);
			});
			map.addLayer(routeMakers);
			map.setZoom(7);
			map.flyTo(path[0]);
			this.setState({
				routeMakers
			});
			return;
		}
		const lat = ele.lat;
		const lng = ele.lng;
		if (Number(lat) > Number(lng)) {
			map.setZoom(11);
			map.flyTo([lng, lat]);
			return;
		}
		map.setZoom(14);
		map.flyTo([lat, lng]);
	}
	searchInputHandler = (event) => {
		const {data} = this.props;
		const inputData = [];
		this.setState({inputValue: event.target.value});
		if (event.target.value.length === 0) {
			this.setState({
				inputData,
				showInput: false
			});
			return;
		}
		data.forEach(element => {
			if (element.name.includes(event.target.value)) {
				inputData.push(element);
			};
		});
		if (inputData.length === 0) {
			this.setState({
				inputData,
				showInput: false
			});
			return;
		}
		this.setState({
			inputData,
			showInput: true
		});
	}
	fucusHandler=(event) => {
		if (event.target.value.length !== 0) {
			return;
		}
		const {data} = this.props;
		let inputData = [];
		if (data.length <= 5) {
			inputData = data;
		} else {
			inputData = data.slice(0, 5);
		}
		this.setState({
			inputData,
			showInput: true
		});
		console.log(event.target.value);
	}
	blurHandler=() => {
		this.setState({
			showInput: false,
			inputData: []
		});
	}
	render () {
		const {className} = this.props;
		const {out, inputData, showInput, inputValue, finalData} = this.state;
		return (
			<div className={ cn(className, s.sidebar) }>
				<div className={ cn(out && s.iconOut, s.sideIcon) } onClick={ this.sidebarHandler.bind(this) } />
				<div className={ cn(s.list, out && s.listOut) } >
					<div className={ s.content }>
						<span className={ s.title }>旅游点</span>
						<div className={ s.asideSearch }>
							<div className={ s.searchBar }>
								<div className={ s.comSearch }>
									<
										input type="text"
										placeholder="搜索"
										value={ inputValue }
										className={ s.searchInput }
										onChange={ this.searchInputHandler }
										maxLength="20"
										onFocus={ this.fucusHandler }
									/>
									<button type="button" className={ s.searchBtn } onClick={ this.searchHandler }> 搜索</button>
								</div>
								{showInput &&
									<div className={ s.searchList } >
										{inputData.map((ele, key) => {
											return (
												<p key={ key } onClick={ this.listClickHandler.bind(this, ele.name) } className={ s.showInput }><span className={ s.text }>{ele.name}</span></p>
											);
										})}
									</div>
								}
							</div>
						</div>
						<div className={ s.searchList } >
							{finalData.map((ele, key) => {
								return (
									<p key={ key } className={ s.showInput1 } onMouseEnter={ this.mouseEnterHandler.bind(this, ele) }>
										<span className={ s.icon }>
											<span className={ s.num }>{key + 1}</span>
										</span>
										<span className={ s.text }>{ele.name}</span>
									</p>
								);
							})}
						</div>
					</div>
				</div>
			</div>);
	}
}
export default sidebar;
