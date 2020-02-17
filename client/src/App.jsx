import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Pages/HomePage';
import Login from './Pages/LoginPage';
function App () {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={ Login } />
				<Route path="/home" component={ Home } />
			</Switch>
		</Router>
	);
}

export default App;
