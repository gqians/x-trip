import { Schema } from 'mongoose';
import hotelSchema from '../../../mongoModels/hotel'
const graphqlPlugin = {
	name: 'Hotel',
	version: '1.0.0',
	register: async function (server, options) {
		const Hotel = server.methods.registerMongoModel({
			name: 'hotel',
			schema: hotelSchema
		});
		server.methods.registerGraphQLSchema({
			name: 'Hotel',
			model: Hotel,
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
