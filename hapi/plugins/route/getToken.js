import { hapiAuthJWT, makeToken, cookieOptions } from '../../auth';
import adminSchema from '../../mongoModels/Administrator';
import fs from 'fs';
import path from 'path';
import { JsonWebTokenError } from 'jsonwebtoken';
const routeGetTokenPlugin = {
	name: 'authInit',
	version: '1.0.0',
	register: async function (server, options) {
		const config = options;
		await server.register(hapiAuthJWT);
		// bring your own validation function
		const validate = async function (decoded, request, h) {
			const information={
				id:decoded.id,
				password:decoded.password
			};
			const Admin = server.app.mongoose.model('Admin', adminSchema);
			const pass = await Admin.exists(information);
			if (!pass) {
				return { isValid: false };
			} else {
				return { isValid: true };
			}
		};
		server.auth.strategy('jwt', 'jwt', {
			key: config.auth.secret,
			validate,
			verifyOptions: {
				ignoreExpiration: config.auth.ignoreExpiration
			}
		});
		server.route([{
			method: 'POST',
			path: '/login',
			config: {
				auth: false,
				handler: async function (request, h) {
					if(!request.payload){
						return h.response({state:false,message:'请求信息不完整，请补充信息'});
					}
					const information = { id: request.payload.id, password: request.payload.password };
					const token = makeToken(information);
					server.app.logger.info('url-getToken：', token);
					const Admin = server.app.mongoose.model('Admin', adminSchema);
					const exists = await Admin.exists({ id: information.id }); // true
					if (!exists) {
						return h
							.response({ state: false, message: '用户名不存在，请注册！' });
					}
					const pass = await Admin.exists(information);
					if (!pass) {
						return h
							.response({ state: false, message: '密码错误！' });
					}
					console.log(token);
					return h
						.response({ token,state:true })
						.header('Authorization', token) // where token is the JWT
						.state('token', token, cookieOptions); // set the cookie with options
				}
			}
		},
		{
			method: 'GET',
			path: '/restricted',
			config: {
				auth: 'jwt',
				handler: function (request, h) {
					const response = h.response({
						message: 'You used a Valid JWT Token to access /restricted endpoint!'
					});
					response.header('Authorization', request.headers.authorization);
					return response;
				}
			}
		}, {
			method: 'POST',
			path: '/register',
			config: {
				auth: false,
				handler: async function (request, h) {
					if(!request.payload){
						return h.response({state:false,message:'请求信息不完整，请补充信息'});
					}
					const Admin = server.app.mongoose.model('Admin', adminSchema);
					const information = { id: request.payload.id, password: request.payload.password };
					const exists = await Admin.exists({ id: information.id }); // true
					if (!exists) {
						try{
							const result = await Admin.create(information);
						}catch(err){
							request.server.app.logger.info('注册失败:', information.id);
						}
						request.server.app.logger.info('注册成功:', information.id);
						return h.response({ state: true, message: '注册成功!' }).code(200);
					} else {
						return h.response({ state: false, message: '用户名已存在，请直接登录' }).code(200);
					}
				}
			}
		},{
			method:'POST',
			path:'/upload',
			config:{
				auth:'jwt',
				payload:{
					output: 'stream',
					parse: 'true',
					allow: 'multipart/form-data',
					multipart: true
			    },
				handler: function (request, h) {
					const data = request.payload;
					console.dir(data);
					if (data.file) {
						const name = data.file.hapi.filename;
						const mypath = path.resolve(process.cwd(),'./hapi/static/picture') +'/'+ name;
						console.log(mypath);
						const file = fs.createWriteStream(mypath);

						file.on('error', (err) => console.error(err));

						data.file.pipe(file);

						data.file.on('end', (err) => {
							const ret = {
								filename: data.file.hapi.filename,
								headers: data.file.hapi.headers
							}
							return JSON.stringify(ret);
						})
					}
					return h.response(request.payload).code(200);
				}
			}
		}
		]);
	}
};
export default routeGetTokenPlugin;
