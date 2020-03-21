/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
import React from 'react';
import s from './style.css';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
class LayoutVip extends React.PureComponent {
	state={
		myChart: null
	}

	componentDidMount () {
		// this.props.glContainer.setTitle('123');
		console.log(this.props.id);
		// 基于准备好的dom，初始化echarts实例
		const myChart = echarts.init(document.getElementById(this.props.id));

		// 指定图表的配置项和数据
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: ['普通用户', 'VIP', 'SVIP']
			},
			series: [
				{
					name: '游客等级',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [
						{value: this.props.data.normalVipCount.count, name: '普通用户'},
						{value: this.props.data.vipCount.count, name: 'VIP'},
						{value: this.props.data.superVipCount.count, name: 'SVIP'}
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
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
	render () {
		console.log(this.props.data);
		return (
			<div className={ s.report }>
				<div className={ s.chart } id={ this.props.id } />

			</div>
		);
	}
}
export default LayoutVip;
