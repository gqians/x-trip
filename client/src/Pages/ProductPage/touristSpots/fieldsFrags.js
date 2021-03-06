import gql from 'graphql-tag';

export default gql`
	fragment touristSpotsFields on TouristSpots{
		_id
		name
		addedTime
		address
		lat
		lng
		picture
		description
		star
		price
		url
		onSale
		businessHours{
			startTime
			endTime
		}
	}
`;
