import Hapi from '@hapi/hapi';
import config from './config';
import {hapiAuthJWT,validate,token,cookie_options} from './auth';
const init = async () => {
	const server = Hapi.server({
		port: config.hapi.port,
		host: config.hapi.host,
	});
	await server.register(hapiAuthJWT);
	server.auth.strategy('jwt', 'jwt', {
		key: config.auth.secret,
		validate,
		verifyOptions: {
			ignoreExpiration: config.auth.ignoreExpiration
		},
	});
	server.route([{
			method: 'GET',
			path: '/',
			config: {
				auth: false
			},
			handler: function (request, h) {
				return h
					.response({
						text: 'You have been authenticated!'
					})
					.header('Authorization', token) // where token is the JWT
					.state('token', token, cookie_options); // set the cookie with options
			},
		},
		{
			method: 'GET',
			path: '/restricted',
			config: {
				auth: 'jwt'
			},
			handler: function (request, h) {
				const response = h.response({
					message: 'You used a Valid JWT Token to access /restricted endpoint!',
				});
				response.header('Authorization', request.headers.authorization);
				return response;
			},
		},
	]);

	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);
});

init();
