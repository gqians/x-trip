import { Schema } from 'mongoose';
const routeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	touristSportIds:{
		type:[Schema.Types.ObjectId],
		default:[]
	},
	tips:{
		type:String
	},
	onSale:{
		type: Boolean,
		default: true
	}
});
export default routeSchema;
