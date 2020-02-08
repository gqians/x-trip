import { Schema } from 'mongoose';
const graphqlPlugin = {
    name: 'graphqltest2',
	version: '1.0.0',
	register: async function (server, options) {
		const JobSchema = new Schema({
			sourceIp: { type: String },
			note: { type: String },
		})
		const Job = server.methods.registerMongoModel({
			name: 'Job',
			schema: JobSchema,
		});
		server.methods.registerGraphQLSchema({
			name: 'Job',
			model: Job,
			queryFields: {
				FindMany: 'findMany',
			},
			mutationFields:{
				Create: 'createOne',
			}
		});
	}
}
export default graphqlPlugin;
