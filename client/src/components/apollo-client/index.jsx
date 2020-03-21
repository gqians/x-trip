import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import React from 'react';
function Client (Component) {
	const client = new ApolloClient({
		link: createHttpLink({ uri: 'http://localhost:8090/graphql', fetch }),
		cache: new InMemoryCache()
	});
	return (
		<ApolloProvider client={ client } >
			<Component />
		</ApolloProvider>
	);
}

export default Client;
