var xlsx = require("node-xlsx");
var path=require("path");
var d = xlsx.parse(path.join(process.cwd(), './hapi/static/qunar_jingdian_utf8_final_sample_1000.xls'));
console.dir(d[0].data[1][6]);
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
	}
});
  var touristSpots = mongoose.model('TouristSpots', TouristSpotsSchema);

  var blogs=new Array();
  for(i=1;i<d[0].data.length;i++){
	let blog={
		name:d[0].data[i][1],
		address:d[0].data[i][17],
		lat:d[0].data[i][12],
		lng:d[0].data[i][13],
		picture:d[0].data[i][7],
		description:d[0].data[i][16],
		star:d[0].data[i][8],
		price:d[0].data[i][21],
		url:d[0].data[i][19],

	}
    blogs.push(blog);
  }
//console.dir(blogs);
  touristSpots.insertMany(blogs,function(err){
    console.log(err);
  });
  console.log('加载成功');
