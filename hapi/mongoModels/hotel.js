import { Schema } from 'mongoose';

const hotelSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	province:{
		type: String,
		required: false
	},
	city:{
		type: String,
		required: false
	},
	county:{
		type: String,
		required: false
	},
	phoneNumber:{
		type: String,
		required: false
	},
	address:{
		type: String,
		required: false
	},
	hotelType:{
		type: String,
		required: false
	},
	lat: {
		type: String,
		required: false
	},
	lng: {
		type: String,
		required: false
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
export default hotelSchema;
