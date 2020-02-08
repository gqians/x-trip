import {hapiAuthJWT,validate,makeToken,cookie_options} from '../../auth';
import adminSchema from '../../mongoModels/Administrator';
const routeGetTokenPlugin = {
    name: 'authInit',
	version: '1.0.0',
	register: async function (server, options) {
		const config=options;
		await server.register(hapiAuthJWT);
		server.auth.strategy('jwt', 'jwt', {
			key: config.auth.secret,
			validate,
			verifyOptions: {
				ignoreExpiration: config.auth.ignoreExpiration
			},
		});
		server.route([{
				method: 'POST',
				path: '/login',
				config: {
					auth: false,
					handler: async function (request, h) {
						const information={id:request.payload.id,password:request.payload.password};
						const token=makeToken(information);
						server.app.logger.info('url-getToken：', token);
						//const Admin = server.app.mongoose.model('Admin', adminSchema);
						const Admin = server.methods.registerMongoModel('Admin',adminSchema);
						let exists = await Admin.exists({ id: information.id }); // true
						if(!exists){
							return h
							.response({state:false,message:'用户名不存在，请注册！'})
						}
						let pass=await Admin.exists(information);
						if(!pass){
							return h
							.response({state:false,message:'密码错误！'})
						}
						return h
							.response({token})
							.header('Authorization', token) // where token is the JWT
							.state('token', token, cookie_options); // set the cookie with options
					},
				},
			},
			{
				method: 'GET',
				path: '/restricted',
				config: {
					auth: 'jwt',
					handler: function (request, h) {
						const response = h.response({
							message: 'You used a Valid JWT Token to access /restricted endpoint!',
						});
						response.header('Authorization', request.headers.authorization);
						return response;
					},
				},
			},{
				method: 'POST',
				path: '/register',
				config: {
					auth: false,
					handler:async function(request,h){
						const Admin = server.app.mongoose.model('Admin', adminSchema);
						const information={id:request.payload.id,password:request.payload.password};
						let exists = await Admin.exists({ id: information.id }); // true
						if(!exists){
							let result = await Admin.create(information);
							result.then(err=>{
								if(err){
									request.server.app.logger.info('注册失败:', err);
								}
							})
							request.server.app.logger.info('注册成功:', information.id);
							return h.response({state:true,message:'注册成功!'}).code(200);
						}else{
							return h.response({state:false,message:'用户名已存在，请直接登录'}).code(200);
						}
					}
				}
			}
		]);
	}
}
export default routeGetTokenPlugin;
