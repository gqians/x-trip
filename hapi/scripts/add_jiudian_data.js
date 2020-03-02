var xlsx = require("node-xlsx");
var path=require("path");
var d = xlsx.parse(path.join(process.cwd(), '../static/住宿点/郑州-酒店类示例数据_POILIST.CN.xls'));
console.dir(d[0].data[1]);
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://127.0.0.1:27017/trip';

/**
 * 连接
 */
mongoose.connect(DB_URL,{useNewUrlParser: true});

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});
/** 断开连接数据库 */
//mongoose.disconnect();

var Schema = mongoose.Schema;

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
	}
});
  var hotels = mongoose.model('hotel', hotelSchema);

  var blogs=new Array();
  for(i=1;i<d[0].data.length;i++){
	let blog={
		name:d[0].data[i][0],
		province:d[0].data[i][1],
		city:d[0].data[i][2],
		county:d[0].data[i][3],
		phoneNumber:d[0].data[i][5],
		address:d[0].data[i][7],
		hotelType:d[0].data[i][9],
		lat:d[0].data[i][10],
		lng:d[0].data[i][11]
	}
    blogs.push(blog);
  }
console.dir(blogs);
  hotels.insertMany(blogs,function(err){
    console.log(err);
  });
  console.log('加载成功');
