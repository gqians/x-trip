import gql from 'graphql-tag';

export default gql`
	fragment TouristFields on Tourist{
		_id
		name
		sex
		Avatar
		vipLevel
		blackList
	}
`;
