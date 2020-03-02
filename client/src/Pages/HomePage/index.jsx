import React from 'react';
// import PropTypes from 'prop-types';
import { HashRouter as Router, Route	} from 'react-router-dom';
import Order from '../OrderPage';
import Sidebar from './sidebarPage';
import Index from '../IndexPage';
import Report from '../ReportPage';
import s from './style.css';
// import Index from '../IndexPage';
function Home () {
	return (
		<div className={ s.home }>
			<div className={ s.left }>
				<Sidebar />
			</div>
			<div className={ s.right }>
				<Router>
					<Route path="/home/order" component={ Order } />
					<Route path="/home/index" component={ Index } />
					<Route path="/home/report" component={ Report }/>
				</Router>
			</div>
		</div>
	);
}

export default Home;
