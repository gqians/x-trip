import { Schema } from 'mongoose';
import TouristSpotsSchema from '../../../mongoModels/TouristSpots'
const graphqlPlugin = {
	name: 'TouristSpots',
	version: '1.0.0',
	register: async function (server, options) {
		const TaskHistory = server.methods.registerMongoModel({
			name: 'TouristSpots',
			schema: TouristSpotsSchema
		});
		server.methods.registerGraphQLSchema({
			name: 'TouristSpots',
			model: TaskHistory,
			queryFields: {
				FindOne:'findOne',
				FindMany: 'findMany',
				FindById: 'findById',
				FindByIds: 'findByIds',
			},
			mutationFields: {
				CreateOne: 'createOne',
				UpdateById: 'updateById',
				UpdateOne: 'updateOne',
				UpdateMany: 'updateMany',
				RemoveById: 'removeById',
				RemoveOne: 'removeOne',
				RemoveMany: 'removeMany'
			}
		});
	}
};
export default graphqlPlugin;
