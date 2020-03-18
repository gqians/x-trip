import { Schema } from 'mongoose';
import hotelSchema from '../../../mongoModels/hotel'
const graphqlPlugin = {
	name: 'Hotel',
	version: '1.0.0',
	register: async function (server, options) {
		const Hotel = server.methods.registerMongoModel({
			name: 'Hotel',
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
				Pagination: 'pagination'
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
			},
			onPreAddFields(tc){
				// tc.addRelation(
				// 	'getOrder',
				// 	{
				// 	  resolver: () => orderTC.getResolver('findByIds'),
				// 	  prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
				// 		_ids: (source) => source.orderId,
				// 	  },
				// 	projection: { orderId: true }, // point fields in source object, which should be fetched from DB
				// 	}
				// );
				tc.setResolver(
					'pagination',
					tc.getResolver('pagination').addFilterArg({
						name: 'nameRegex',
						type: 'String',
						description: '正则过滤: target.name',
						query: (query, value) => {
							query['name'] = { $regex: value, $options: 'i' };
						},
					})
				);
				return tc;
			}
		});
	}
};
export default graphqlPlugin;
