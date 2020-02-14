import React from 'react';
// import PropTypes from 'prop-types';
import s from './style.css';
function Home () {
	console.log(s);
	return (
		<div className={ s.home }>
			this is HomePage
		</div>
	);
}

export default Home;
