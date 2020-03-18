import hotelSchema from '../../../mongoModels/route'
const graphqlPlugin = {
	name: 'Route',
	version: '1.0.0',
	register: async function (server, options) {
		const Hotel = server.methods.registerMongoModel({
			name: 'Route',
			schema: hotelSchema
		});
		const TouristSpotsTC = server.app.schema.TouristSpots;
		server.methods.registerGraphQLSchema({
			name: 'Route',
			model: Hotel,
			queryFields: {
				FindOne:'findOne',
				FindMany: 'findMany',
				FindById: 'findById',
				FindByIds: 'findByIds',
				Pagination: 'pagination'
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
			},
			onPreAddFields(tc){
				tc.addRelation(
					'getRoute',
					{
						resolver: () => TouristSpotsTC.getResolver('findByIds'),
						prepareArgs: {
							_ids: (source) => source.touristSportIds,
						},
						projection: { touristSportIds: true }
					}
				);
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
