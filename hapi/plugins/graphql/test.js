import { Schema } from 'mongoose';
const graphqlPlugin = {
    name: 'graphqltest',
	version: '1.0.0',
	register: async function (server, options) {
		const TaskHistorySchema = new Schema({
			jobId: {
				type: Schema.Types.ObjectId,
				ref: 'Job',
				index: true,
			},
			name: { type: String, required: true },
			time: { type: String, required: true },
		})
		const TaskHistory = server.methods.registerMongoModel({
			name: 'TaskHistory',
			schema: TaskHistorySchema,
		});
		server.methods.registerGraphQLSchema({
			name: 'TaskHistory',
			model: TaskHistory,
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
