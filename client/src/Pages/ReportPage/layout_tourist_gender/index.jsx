import React from 'react';
import s from './style.css';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import PropTypes from 'prop-types';

class Layout extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		history: PropTypes.shape({
			push: PropTypes.func
		}),
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		glContainer: PropTypes.object,
		id: PropTypes.string,
		label: PropTypes.string,
		data: PropTypes.shape({
			manCount: PropTypes.object,
			womanCount: PropTypes.object
		})
	};
	state={
		myChart: null,
		data: null
	}

	componentDidMount () {
		if (!document.getElementById(this.props.id)) {
			this.forceUpdate();
			return;
		}
		// this.props.glContainer.setTitle('123');
		console.log(this.props.data.manCount.count);
		// 基于准备好的dom，初始化echarts实例
		const myChart = echarts.init(document.getElementById(this.props.id));
		// 指定图表的配置项和数据
		const option = {
			backgroundColor: 'hsl(0,0%,88%)',

			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},

			visualMap: {
				show: false,
				min: 80,
				max: 600,
				inRange: {
					colorLightness: [0, 1]
				}
			},
			series: [
				{
					name: '游客男女比例',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: [
						{value: this.props.data.manCount.count, name: '男性比例'},
						{value: this.props.data.womanCount.count, name: '女性比例'}
					].sort(function (a, b) { return a.value - b.value; }),
					roseType: 'radius',
					label: {
						color: 'hsl(233,8%,23%)'
					},
					labelLine: {
						lineStyle: {
							color: 'hsl(233,8%,23%)'
						},
						smooth: 0.2,
						length: 10,
						length2: 20
					},
					itemStyle: {
						color: 'hsl(201,72%,51%)',
						shadowBlur: 100,
						shadowColor: 'hsl(201,42%,31%)'
					},

					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				}
			]
		};
		this.setState({
			myChart
		});
		myChart.setOption(option);
		this.props.glContainer.on('resize', () => {
			if (this.state.myChart) { this.state.myChart.resize(); }
		});
	}
	// componentDidUpdate () {
	// }
	componentDidUpdate () {
		if (!document.getElementById(this.props.id)) {
			this.forceUpdate();
			return;
		}
		// 基于准备好的dom，初始化echarts实例
		const myChart = echarts.init(document.getElementById(this.props.id));
		// 指定图表的配置项和数据
		const option = {
			backgroundColor: 'hsl(0,0%,88%)',

			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},

			visualMap: {
				show: false,
				min: 80,
				max: 600,
				inRange: {
					colorLightness: [0, 1]
				}
			},
			series: [
				{
					name: '游客男女比例',
					type: 'pie',
					radius: '55%',
					center: ['50%', '50%'],
					data: [
						{value: this.props.data.manCount.count, name: '男性比例'},
						{value: this.props.data.womanCount.count, name: '女性比例'}
					].sort(function (a, b) { return a.value - b.value; }),
					roseType: 'radius',
					label: {
						color: 'hsl(233,8%,23%)'
					},
					labelLine: {
						lineStyle: {
							color: 'hsl(233,8%,23%)'
						},
						smooth: 0.2,
						length: 10,
						length2: 20
					},
					itemStyle: {
						color: 'hsl(201,72%,51%)',
						shadowBlur: 100,
						shadowColor: 'hsl(201,42%,31%)'
					},

					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				}
			]
		};
		this.setState({
			myChart
		});
		myChart.setOption(option);
		this.props.glContainer.on('resize', () => {
			if (this.state.myChart) { this.state.myChart.resize(); }
		});
	}
	render () {
		return (
			<div className={ s.report }>
				<div className={ s.chart } id={ this.props.id } />

			</div>
		);
	}
}
export default Layout;
