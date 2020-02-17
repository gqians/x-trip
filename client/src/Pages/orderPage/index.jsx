import React from 'react';
// import PropTypes from 'prop-types';
import s from './style.css';
function Home () {
	console.log(s);
	return (
		<div className={ s.home }>
			<div className={ s.left }>
				<div className={ s.title }>x-trip</div>
				<div>order</div>
			</div>
			<div className={ s.right }>right</div>
		</div>
	);
}

export default Home;
