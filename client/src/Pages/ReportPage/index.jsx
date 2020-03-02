/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import s from './style.css';

function Home ({data: {JobFindMany}}) {
	console.log(JobFindMany);
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

export default graphql(gql`
query{
	JobFindMany{
	  sourceIp
	  note
	}
  }
`)(Home);
