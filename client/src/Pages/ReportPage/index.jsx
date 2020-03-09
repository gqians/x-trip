/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
import s from './style.css';
import Layout from './layout';
import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';
// var myLayout1 = new GoldenLayout({
// 	content: [{
// 		type: 'row',
// 		content: [{
// 			type: 'react-component',
// 			component: 'test-component',
// 			props: { label: 'A' }
// 		}, {
// 			type: 'column',
// 			content: [{
// 				type: 'react-component',
// 				component: 'test-component',
// 				props: { label: 'B' }
// 			}, {
// 				type: 'react-component',
// 				component: 'test-component',
// 				props: { label: 'C' }
// 			}]
// 		}]
// 	}]
// }, '#report');
class Report extends React.PureComponent {
	state={
		layout: null
	}
	componentDidMount () {
		const myLayout = new GoldenLayout({
			content: [{
				type: 'row',
				content: [{
					type: 'react-component',
					component: 'test-component',
					props: { label: 'A' },
					id: 'ec1'
				}, {
					type: 'column',
					content: [{
						type: 'react-component',
						component: 'test-component',
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
			myLayout.registerComponent('test-component', Layout);
			myLayout.init();
			console.log(myLayout.toConfig());
			this.setState({
				layout: myLayout
			});
		}, 0);
	}
	render () {
		return (
			<div className={ s.report } id="report" />
		);
	}
}

export default Report;
