/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
import s from './style.css';
// import Layout from './layout';
// import LayoutCopy from './layout_copy';
import GoldenLayout from 'golden-layout';
import SideBar from './sidebar';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';
import config from './config';
class Report extends React.PureComponent {
	state={
		layout: null
	}
	componentDidMount () {
		const myLayout = new GoldenLayout({
			content: [{
				type: 'column',
				content: [{
					type: 'react-component',
					component: 'test-component',
					props: { label: 'A' },
					id: 'ec1'
				}, {
					type: 'column',
					content: [{
						type: 'react-component',
						component: 'test-component1',
						id: 'ec2',
						props: { label: 'B' }
					}, {
						type: 'react-component',
						component: 'test-component',
						props: { label: 'C' },
						id: 'ec3'
					}]
				}]
			}]
		}, '#report');
		// myLayout.toconfig.stateChanged(() => {
		// 	console.log('123');
		// });
		setTimeout(() => {
			// myLayout.registerComponent('test-component', Layout);
			// myLayout.registerComponent('test-component1', LayoutCopy);
			// myLayout.registerComponent('test-component3', LayoutCopy);
			for (const item of config) {
				myLayout.registerComponent(item.name, item.component);
			}
			myLayout.init();
			console.log(myLayout.toConfig());
			this.setState({
				layout: myLayout
			});
		}, 0);
	}
	render () {
		const {layout} = this.state;
		return (
			<div className={ s.container }>
				<div className={ s.report } id="report">
					<SideBar layout={ layout }/>
				</div>
			</div>
		);
	}
}

export default Report;
