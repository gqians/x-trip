import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { graphqlHapi } from 'apollo-server-hapi/dist/hapiApollo';
const graphqlPlugin = {
	name: 'graphqlInit',
	version: '1.0.0',
	register: async function (server, options) {
		server.method('registerGraphQLSchema', async ({
			model,
			customizationOptions = {},
			name: schemaName,
			queryFields = {
				ById: 'findById',
				ByIds: 'findByIds',
				One: 'findOne',
				Many: 'findMany',
				Count: 'count',
				Connection: 'connection',
				Pagination: 'pagination'
			},
			mutationFields = {
				Create: 'createOne',
				CreateOne: 'createOne',
				UpdateById: 'updateById',
				UpdateOne: 'updateOne',
				UpdateMany: 'updateMany',
				RemoveById: 'removeById',
				RemoveOne: 'removeOne',
				RemoveMany: 'removeMany'
			},
			onPreAddFields = x => x
		}) => {
			const tc = composeWithMongoose(model, customizationOptions);
			server.app.schema = server.app.schema ? server.app.schema : {};
			server.app.schema[schemaName] = onPreAddFields(tc);
			Object.entries(queryFields).forEach(([suffix, resolerName]) => {
				schemaComposer.Query.addFields({
					[`${schemaName}${suffix}`]: tc.getResolver(resolerName)
				});
			});
			Object.entries(mutationFields).forEach(
				([suffix, resolerName]) => {
					schemaComposer.Mutation.addFields({
						[`${schemaName}${suffix}`]: tc.getResolver(
							resolerName
						)
					});
				}
			);
			return tc;
		});
		server.ext('onPreStart', async () => {
			const graphqlSchema = schemaComposer.buildSchema();
			console.log(options.graphql.graphqlpath);
			await server.register({
				plugin: graphqlHapi,
				options: {
					path: options.graphql.graphqlpath,
					graphqlOptions: {
						schema: graphqlSchema
					},
					route: {
						cors: true
					}
				}
			});
			//   await server.register({
			// 	plugin: graphiqlHapi,
			// 	options: {
			// 	  path: options.graphql.graphiqlpath,
			// 	  route: {
			// 		cors: true,
			// 	  },
			// 	  graphiqlOptions: {
			// 		endpointURL: options.graphql.graphqlpath,
			// 	  },
			// 	},
			//   });
		});
	}
};
export default graphqlPlugin;
