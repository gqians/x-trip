/* eslint-disable react/no-array-index-key */
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import s from './style.css';
class sidebar extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		history: PropTypes.shape({
			push: PropTypes.func
		}),
		layout: PropTypes.object
	};
	state = {
		out: false,
		showInput: false,
		inputData: [],
		finalData: [],
		inputValue: '',
		routeMakers: null
	};
	sidebarHandler= () => {
		this.setState({
			out: !this.state.out
		});
	};
	addItemHandler=() => {
		const { layout } = this.props;
		const newItemConfig = {
			title: '123',
			type: 'react-component',
			component: 'test-component3',
			props: { label: 'kk' },
			componentState: { text: '11' }
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
						<span onClick={ this.addItemHandler }>11</span>
					</div>
				</div>
			</div>);
	}
}
export default sidebar;
