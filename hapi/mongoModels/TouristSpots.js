import { Schema } from 'mongoose';
const TouristSpotsSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	addedTime: {
		type: Date,
		default: Date.now,
		required: false
	},
	address: {
		type: String,
		required: false
	},
	lat: {
		type: String,
		required: true
	},
	lng: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: false
	},
	description:{
		type:String,
		required: false
	},
	star:{
		type: String,
		required: false
	},
	price:{
		type:String,
		required: false
	},
	url:{
		type:String,
		required: false
	},
	businessHours:{
		startTime:{
			type:Date
		},
		endTime:{
			type:Date
		}
	},
	onSale:{
		type: Boolean,
		default: true
	}
});
export default TouristSpotsSchema;
