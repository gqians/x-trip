import fs from 'fs';
import path from 'path';
const graphqlPlugin = fs.readdirSync(path.join(process.cwd(), './hapi/plugins/graphql/schema'));
const graphqlSchema = {
	name: 'graphqlSchema',
	version: '1.0.0',
	register: async function (server, options) {
		graphqlPlugin.forEach( async (item)=>{
			let graPath= `./hapi/plugins/graphql/schema/${item}`;
			let plugin =require(path.join(process.cwd(), graPath));
			await server.register([{
				plugin:plugin['default'],
				options
			}])
		})
	}
}
export default graphqlSchema;
//此插件用于加载./schema文件夹全部graphql schema
