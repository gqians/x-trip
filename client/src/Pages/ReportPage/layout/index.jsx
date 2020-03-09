/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
import React from 'react';
import s from './style.css';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';

class Layout extends React.PureComponent {
	state={
		aa: 1,
		mychart: null
	}

	componentDidMount () {
		// this.props.glContainer.setTitle('123');
		//
		this.props.glContainer.on('resize', () => {
			this.state.myChart.resize();
		});
		console.log(this.props);
		// 基于准备好的dom，初始化echarts实例
		const myChart = echarts.init(document.getElementById('A'));

		// 指定图表的配置项和数据
		const option = {
			title: {
				text: 'ECharts 入门示例'
			},
			tooltip: {},
			legend: {
				data: ['销量']
			},
			xAxis: {
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
			},
			yAxis: {},
			series: [{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}]
		};
		this.setState({
			myChart
		});
		myChart.setOption(option);
	}
	// componentDidUpdate () {
	// }
	render () {
		console.log('reder');
		return (
			<div className={ s.report }>
				<div className={ s.chart } id={ this.props.label }>{this.props.label}<span>{this.state.aa}</span></div>

			</div>
		);
	}
}
export default Layout;
