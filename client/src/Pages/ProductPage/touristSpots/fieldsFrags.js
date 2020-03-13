import gql from 'graphql-tag';

export default gql`
	fragment touristSpotsFields on TouristSpots{
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
		businessHours{
			startTime
			endTime
		}
	}
`;
