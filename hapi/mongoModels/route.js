import { Schema } from 'mongoose';
import touristSport from './TouristSpots'
const routeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	touristSport:{
		type:[touristSport],
		default:[]
	},
	tips:{
		type:String
	}
});
export default routeSchema;
