/* eslint-disable react/no-array-index-key */
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import s from './style.css';

const callback = (tabs, history) => {
	history.push(tabs);
	console.log(history.location.pathname + history.location.search);
};
function BreadCrumb (tabs, history, showPop) {
	return (
		<>
			<div className={ s.breadCrumb }>
				<Tabs defaultActiveKey={ history.location.pathname } onChange={ (myTab) => { callback(myTab, history); } } renderTabBar={ () => <ScrollableInkTabBar /> } renderTabContent={ () => <TabContent /> }>
					{
						tabs.map((tab) => {
							return (
								<TabPane tab={ tab.title } key={ tab.path }>
									<Router>
										<Route path={ tab.path } component={ tab.component } />
									</Router>
								</TabPane>
							);
						})
					}
				</Tabs>
			</div>
		</>
	);
}
export default BreadCrumb;
