import gql from 'graphql-tag';

export default gql`
	fragment OrderFields on Order{
		productType
		spend
		order_time
		effective_time
		product_Id
		tourist_Id
		complete
		name
		_id
		getTourist{
			name
			_id
		}
		getHotel{
			name
			_id
		}
		getTouristSpots{
			name
			_id
		}
	}
`;
