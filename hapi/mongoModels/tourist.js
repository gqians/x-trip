import { Schema } from 'mongoose';
const Tourist = new Schema({
name:{
	type:String
},
// id:{
// 	type:Schema.Types.ObjectId
// }
sex: {
	type: String,
	required: false
},
password: {
	type: String,
	required: true
},
Avatar:{
   type: String
},
vipLevel:{
	type:Number,
	enum:[1,2,3],
	default:1
},
blackList:{
	type:Boolean,
	default: false
},
blackReason:{
	type:String
},
orderId:{
	type:[Schema.Types.ObjectId],
	ref:'Order',
	default:[]
}
});
export default Tourist;
