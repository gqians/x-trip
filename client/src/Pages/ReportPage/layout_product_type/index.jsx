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
			touristCount: PropTypes.object,
			hotelCount: PropTypes.object,
			type1Count: PropTypes.object,
			type2Count: PropTypes.object,
			type3Count: PropTypes.object,
			type4Count: PropTypes.object,
			type5Count: PropTypes.object,
			type6Count: PropTypes.object,
			type7Count: PropTypes.object,
			type8Count: PropTypes.object
		})
	};
	state={
		myChart: null
	}

	componentDidMount () {
		// this.props.glContainer.setTitle('123');
		console.log(this.props.id);
		// 基于准备好的dom，初始化echarts实例
		const myChart = echarts.init(document.getElementById(this.props.id));
		const otherType = this.props.data.hotelCount.count - this.props.data.type1Count.count - this.props.data.type2Count.count - this.props.data.type3Count.count - this.props.data.type4Count.count - this.props.data.type5Count.count - this.props.data.type6Count.count - this.props.data.type7Count.count - this.props.data.type8Count.count;
		// 指定图表的配置项和数据
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 10,
				data: ['旅游点', '客栈旅舍', '三星级酒店', '青年旅舍', '五星级酒店', '度假村', '公寓式酒店', '四星级酒店', '豪华型', '其他住宿类型']
			},
			series: [
				{
					name: '访问来源',
					type: 'pie',
					selectedMode: 'single',
					radius: [0, '30%'],
					label: {
						position: 'inner'
					},
					labelLine: {
						show: false
					},
					data: [
						{value: this.props.data.touristCount.count, name: '旅游点'},
						{value: this.props.data.hotelCount.count, name: '住宿点'}
					]
				},
				{
					name: '访问来源',
					type: 'pie',
					radius: ['40%', '55%'],
					label: {
						formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
						backgroundColor: '#eee',
						borderColor: '#aaa',
						borderWidth: 1,
						borderRadius: 4,
						// shadowBlur:3,
						// shadowOffsetX: 2,
						// shadowOffsetY: 2,
						// shadowColor: '#999',
						// padding: [0, 7],
						rich: {
							a: {
								color: '#999',
								lineHeight: 22,
								align: 'center'
							},
							// abg: {
							//     backgroundColor: '#333',
							//     width: '100%',
							//     align: 'right',
							//     height: 22,
							//     borderRadius: [4, 4, 0, 0]
							// },
							hr: {
								borderColor: '#aaa',
								width: '100%',
								borderWidth: 0.5,
								height: 0
							},
							b: {
								fontSize: 16,
								lineHeight: 33
							},
							per: {
								color: '#eee',
								backgroundColor: '#334455',
								padding: [2, 4],
								borderRadius: 2
							}
						}
					},
					data: [
						{value: this.props.data.touristCount.count, name: '旅游点'},
						{value: this.props.data.type1Count.count, name: '客栈旅舍'},
						{value: this.props.data.type2Count.count, name: '三星级酒店'},
						{value: this.props.data.type3Count.count, name: '青年旅舍'},
						{value: this.props.data.type4Count.count, name: '五星级酒店'},
						{value: this.props.data.type5Count.count, name: '度假村'},
						{value: this.props.data.type6Count.count, name: '公寓式酒店'},
						{value: this.props.data.type7Count.count, name: '四星级酒店'},
						{value: this.props.data.type8Count.count, name: '豪华型'},
						{value: otherType, name: '其他住宿类型'}
					]
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
		console.log('layout: ' + this.props.id);
		return (
			<div className={ s.report }>
				<div className={ s.chart } id={ this.props.id } />

			</div>
		);
	}
}
export default Layout;
