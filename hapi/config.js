import path from 'path';
export default {
	hapi: {
		port: 8090,
		host: 'localhost'
	},
	auth: {
		secret: 'x 刈刂',
		ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
		encoding: 'none', // we already used JWT to encode
		isSecure: false, // warm & fuzzy feelings
		isHttpOnly: true, // prevent client alterations
		clearInvalid: false, // remove invalid cookies
		strictHeader: true, // don't allow violations of RFC 6265
		ignoreExpiration: true
	},
	mongoUri: 'mongodb://127.0.0.1:27017/trip',
	logger: {
		name: 'trip',
		path: path.join(process.cwd(), './hapi/logger'),
		period: '6d',
		count: 7
	},
	graphql: {
		graphqlpath: '/graphql',
		graphiqlpath: '/graphiql'
	}
};
