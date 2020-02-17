import React from 'react';
// import PropTypes from 'prop-types';
import {HashRouter as Router, Route} from 'react-router-dom';
import Order from '../orderPage';
import Sidebar from './sidebarPage';
import s from './style.css';
function Home () {
	return (
		<div className={ s.home }>
			<div className={ s.left }>
				<Sidebar />
			</div>
			<div className={ s.right }>
				right
				<Router>
					<Route path="/home/order" component={ Order } />
				</Router>
			</div>
		</div>
	);
}

export default Home;
