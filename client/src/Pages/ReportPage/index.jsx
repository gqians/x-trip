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
import LoadingHoc from '../../components/loadingHoc';
import config from './config';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import { v4 as uidv4 } from 'uuid';

class Report extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string,
		history: PropTypes.shape({
			push: PropTypes.func
		}),
		client: PropTypes.shape({
			mutate: PropTypes.func
		}),
		data: PropTypes.object
	};
	state={
		layout: null
	}
	componentDidMount () {
		const myLayout = new GoldenLayout({
			content: [{
				type: 'column',
				content: [{
					type: 'row',
					content: [{
						type: 'react-component',
						component: 'tourist_gender_proportion',
						title: '游客性别比例图',
						props: {
							id: uidv4(),
							data: this.props.data
						}
					}, {
						type: 'column',
						content: [
							{
								type: 'react-component',
								component: 'tourist_vip_proportion',
								title: '游客vip比例图',
								props: {
									id: uidv4(),
									data: this.props.data
								}
							}, {
								type: 'react-component',
								component: 'tourist_vip_proportion',
								props: {
									id: uidv4(),
									data: this.props.data
								}
							}
						]
					}, {
						type: 'react-component',
						component: 'tourist_vip_proportion',
						props: {
							id: uidv4(),
							data: this.props.data
						}
					}]
				}, {
					type: 'row',
					content: [{
						type: 'react-component',
						component: 'product_type',
						title: '商品类别比例图',
						props: {
							id: uidv4(),
							data: this.props.data
						}
					}]
				}, {
					type: 'row',
					content: [{
						type: 'react-component',
						component: 'tourist_vip_proportion',
						props: {
							id: uidv4(),
							data: this.props.data
						}
					}, {
						type: 'react-component',
						component: 'tourist_vip_proportion',
						props: {
							id: uidv4(),
							data: this.props.data
						}
					}]
				}]
			}]
		}, '#report');
		setTimeout(() => {
			for (const item of config) {
				myLayout.registerComponent(item.name, item.component);
			}
			myLayout.init();
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
					<SideBar layout={ layout } data={ this.props.data }/>
				</div>
			</div>
		);
	}
}
const QUERY = [];
for (const item of config) {
	QUERY.push(item.query);
}

export default compose(
	graphql(gql`
	  query{
		${ QUERY.join('') }
	  }
  `)
)(LoadingHoc(Report));
