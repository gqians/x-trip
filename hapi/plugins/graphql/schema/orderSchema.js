import OrderSchema from '../../../mongoModels/Order'
const graphqlPlugin = {
	name: 'Order',
	version: '1.0.0',
	register: async function (server, options) {
		const Order = server.methods.registerMongoModel({
			name: 'Order',
			schema: OrderSchema
		});
		// server.dependency(['TouristSpots','Tourist','Hotel'],(server)=>{
		// console.log(server.app.schema);
		const TouristTC = server.app.schema.Tourist;
		const HotelTC = server.app.schema.Hotel;
		const TouristSpotsTC = server.app.schema.TouristSpots;
		server.methods.registerGraphQLSchema({
			name: 'Order',
			model: Order,
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
				tc.addRelation(
					'getTourist',
					{
						resolver: () => TouristTC.getResolver('findById'),
						prepareArgs: {
							_id: (source) => source.tourist_Id,
						},
						projection: { tourist_Id: true }
					}
				);
				tc.addRelation(
					'getHotel',
					{
						resolver: () => HotelTC.getResolver('findById'),
						prepareArgs: {
							_id: (source) => source.product_Id,
						},
						projection: { product_Id: true }
					}
				);
				tc.addRelation(
					'getTouristSpots',
					{
						resolver: () => TouristSpotsTC.getResolver('findById'),
						prepareArgs: {
							_id: (source) => source.product_Id,
						},
						projection: { product_Id: true }
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
		// });
		});

	}
};
export default graphqlPlugin;
