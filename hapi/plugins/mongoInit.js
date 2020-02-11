import mongoose from 'mongoose';
const mongoPlugin = {
	name: 'mongoInit',
	version: '1.0.0',
	register: async function (server, options) {
		mongoose.connect(options.mongoUri);
		const db = mongoose.connection;
		db.on('error', () => { console.error('mongo连接出错'); server.app.logger.error('hapi/plugins/mongoInit', 'mongo连接出错'); });
		db.once('open', function () {
			console.log('数据库连接成功!');
			server.app.logger.info('hapi/plugins/mongoInit', 'mongo连接成功！！');
		});
		server.app.mongoose = mongoose;
		server.method('registerMongoModel', ({ name, schema }) => {
			const mongooseModel = server.app.mongoose.model(name, schema);
			server.app.model = server.app.model ? server.app.model : {};
			server.app.model[name] = mongooseModel;
			return mongooseModel;
		});
	}
};
export default mongoPlugin;
