import Hapi from '@hapi/hapi';
import config from './config';
import mongo from './plugins/mongoInit';
import logger from './plugins/loggerInit';
import getToken from './plugins/route/getToken';
import graphql from './plugins/graphqlInit';
// import test from './plugins/graphql/schema/test';
// import test2 from './plugins/graphql/schema/test2';
import graphqlSchema from './plugins/graphql';
import order from './plugins/graphql/schema/orderSchema';
const init = async () => {
	const server = Hapi.server({
		port: config.hapi.port,
		host: config.hapi.host
	});
	await server.register([{
		plugin: logger,
		options: config
	}, {
		plugin: mongo,
		options: config
	}, {
		plugin: getToken,
		options: config
	}, {
		plugin: graphql,
		options: config
	}, {
		plugin: graphqlSchema,
		options: config
	},{
		plugin: order,
		options: config
	}]);
	await server.start();
	console.log('Server running on %s', server.info.uri);
	server.app.logger.info('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
