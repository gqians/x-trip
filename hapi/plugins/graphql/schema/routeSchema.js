import hotelSchema from '../../../mongoModels/route'
const graphqlPlugin = {
	name: 'Route',
	version: '1.0.0',
	register: async function (server, options) {
		const Hotel = server.methods.registerMongoModel({
			name: 'Route',
			schema: hotelSchema
		});
		server.methods.registerGraphQLSchema({
			name: 'Route',
			model: Hotel,
			queryFields: {
				FindOne:'findOne',
				FindMany: 'findMany',
				FindById: 'findById',
				FindByIds: 'findByIds',
			},
			mutationFields: {
				CreateOne: 'createOne',
				CreateMany: 'createMany',
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
