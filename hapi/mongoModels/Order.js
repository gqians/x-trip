import { Schema } from 'mongoose';
const PRODUCT_TYPE=[
	'tourism',
	'hotel',
	'route'
]
const Order = new Schema({
	productType:{
		type:String,
		enum: PRODUCT_TYPE
	},
	spend:{
		type:String,
		required: true
	},
	order_time:{
		type:Date,
		default:Date.now
	},
	effective_time:{
		type:Date
	},
	product_Id:{
		type: Schema.Types.ObjectId,
		require: true
	},
	tourist_Id:{
		type: Schema.Types.ObjectId,
		require: true
	},
	complete:{
		type: Boolean,
		default: false
	},
	name:{
		type: String
	}
})
export default Order;
