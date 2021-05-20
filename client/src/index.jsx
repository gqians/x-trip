import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import App from './App';
import config from './config';
// 连接apollo服务

const client = new ApolloClient({
	link: createHttpLink({ uri: config.graphqlUri, fetch }),
	cache: new InMemoryCache(),
});
// 应用主题的 CSS 变量
Object.entries(config.theme).forEach(([key, value]) => {
	document.documentElement.style.setProperty(key, value);
});
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('app')
);
