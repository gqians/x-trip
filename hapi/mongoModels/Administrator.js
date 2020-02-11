import { Schema } from 'mongoose';

const adminSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: true
	}
});
export default adminSchema;
