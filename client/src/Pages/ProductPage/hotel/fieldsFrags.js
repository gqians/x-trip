import gql from 'graphql-tag';

export default gql`
	fragment hotelFields on Hotel{
		_id
		name
		address
		lat
		lng
		picture
		description
		star
		price
		url
		phoneNumber
		hotelType
		onSale
		businessHours{
			startTime
			endTime
		}
	}
`;
