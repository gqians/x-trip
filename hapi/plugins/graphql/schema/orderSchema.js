import OrderSchema from '../../../mongoModels/Order'
const graphqlPlugin = {
	name: 'Order',
	version: '1.0.0',
	register: async function (server, options) {
		const Order = server.methods.registerMongoModel({
			name: 'Order',
			schema: OrderSchema
		});
		server.methods.registerGraphQLSchema({
			name: 'Order',
			model: Order,
			queryFields: {
				FindOne:'findOne',
				FindMany: 'findMany',
				FindById: 'findById',
				FindByIds: 'findByIds',
			},
			mutationFields: {
				CreateMany: 'createMany',
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
