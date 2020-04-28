/* eslint-disable react/no-array-index-key */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import s from './style.css';
import { v4 as uidv4 } from 'uuid';
import config from '../config';
class sidebar extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		history: PropTypes.shape({
			push: PropTypes.func
		}),
		layout: PropTypes.object,
		data: PropTypes.object
	};
	state = {
		out: false,
		showInput: false,
		inputData: [],
		finalData: [],
		inputValue: '',
		routeMakers: null
	};
	dataConfig = [{
		title: '游客性别比例图',
		component: 'tourist_gender_proportion'
	}, {
		title: '游客vip比例图',
		component: 'tourist_vip_proportion'
	}];
	sidebarHandler= () => {
		this.setState({
			out: !this.state.out
		});
	};
	addItemHandler=(item) => {
		const { layout } = this.props;
		const newItemConfig = {
			type: 'react-component',
			component: item.name,
			title: item.title,
			props: {
				id: uidv4(),
				data: this.props.data
			}
		};
		layout.root.contentItems[ 0 ].addChild(newItemConfig);
	}
	render () {
		const {className} = this.props;
		const {out} = this.state;
		return (
			<div className={ cn(className, s.sidebar) }>
				<div
					className={ cn(out && s.iconOut, s.sideIcon) }
					onClick={ this.sidebarHandler }
				/>
				<div className={ cn(s.list, out && s.listOut) } >
					<div className={ s.content }>
						<span className={ s.title }>点击添加对应图表</span>
						<div className={ s.searchList }>
							{
								config.map((item) => {
									return (
										<p className={ s.showInput } onClick={ () => { this.addItemHandler(item); } } key={ uidv4() }>{item.title}</p>
									);
								})
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default sidebar;
