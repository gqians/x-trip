import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import gql from 'graphql-tag';
const client = new ApolloClient({
	link: createHttpLink({ uri: 'http://localhost:8090/graphql', fetch }),
	// eslint-disable-next-line no-tabs
	// link: createHttpLink({ uri: 'https://graphql-compose.herokuapp.com/user' ,fetch}),
	cache: new InMemoryCache()
});
// client.mutate({
// 	mutation: gql`
// 	mutation {
// 		JobCreate(record:{
// 				sourceIp:"https://www.google.com",
// 				note:"无"
// 			}){
// 				record {
// 					sourceIp
// 					note
// 				}
// 			}
// 	  }
// 	`
// }).then(data => console.log(data)).catch(error => console.error(error));
// client.query({
// 	query: gql`
// 	query {
// 		JobFindMany{
// 			    _id
// 				sourceIp
// 				note
// 			}
// 	  }
// 	`
// }).then(data => console.dir(data.data.JobFindMany)).catch(error => console.error(error));

// client.mutate({
// 	mutation: gql`
// 	mutation {
// 		TaskHistoryCreate(record:{
// 			jobId:"5e38dca286786050d987571a"
// 			name:"qsda",
// 			time:"2123"
// 		}){
// 			record {
// 				jobId
// 				name
// 				time
// 			}
// 		}
// 	 }
// 	`
// }).then(data => console.log(data.data.TaskHistoryCreate)).catch(error => console.error(error));

client.query({
	query: gql`
	query {
		TaskHistoryFindMany{
				name
				time

			}
	  }
	`
}).then((data) => console.dir(data.data.TaskHistoryFindMany)).catch((error) => console.error(error));
// mutation{
// 	JobCreateOne(record:{
// 	  enableMonitor:true
// 	  enableAlert:false
// 	  target:{
// 		protocol:"http"
// 		host:"http://www.163.com"
// 		hostname:"www.163.com"
// 		port:22
// 		ipType:4
// 	  }
// 	  taskStatus:{
// 		vul:{
// 		  triggerType:manual
// 		  status:waiting
// 		  startTime:"2019-10-19T10:08:16.000Z"
// 		}
// 		asset:{
// 		  triggerType:manual
// 		  status:waiting
// 		  startTime:"2019-10-19T10:08:16.000Z"
// 		}
// 	  }
// 	  taskSettings:{
// 		vul:{
// 		  enable:true
// 		}
// 		asset:{
// 		  enable:true
// 		}
// 	  }
// 	}){
// 	  record{
// 		taskStatus{
// 		  vul{
// 			triggerType
// 			status
// 			startTime
// 		  }
// 		}
// 	  }
// 	}
//   }
