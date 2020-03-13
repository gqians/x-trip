import fs from 'fs';
import path from 'path';
const graphqlPlugin = fs.readdirSync(path.join(process.cwd(), './hapi/plugins/graphql/schema'));
// import Hotel from './schema/hotelSchema';
// import Order from './schema/orderSchema';
// import Route from './schema/routeSchema';
// import  Tourist from './schema/touristSchema';
// import TouristSpots from './schema/TouristSpotsSchema';
const graphqlSchema = {
	name: 'graphqlSchema',
	version: '1.0.0',
	register: async function (server, options) {
		graphqlPlugin.forEach( async (item)=>{
			if(item!=='orderSchema.js'){
				let graPath= `./hapi/plugins/graphql/schema/${item}`;
				let plugin =require(path.join(process.cwd(), graPath));
				await server.register([{
					plugin:plugin['default'],
					options
				}])
			}
		})
	// 	await server.register[{
	// 		plugin: TouristSpots,
	// 		options
	// 	},{
	// 		plugin: Hotel,
	// 		options
	// 	},{
	// 		plugin: Route,
	// 		options
	// 	},{
	// 		plugin: Tourist,
	// 		options
	// 	},{
	// 		plugin: Order,
	// 		options
	// 	}]
	 }
}
export default graphqlSchema;
//此插件用于加载./schema文件夹全部graphql schema
