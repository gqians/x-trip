import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import config from './config';

// 应用主题的 CSS 变量
Object.entries(config.theme).forEach(([key, value]) => {
	document.documentElement.style.setProperty(key, value);
});
ReactDOM.render(<App />, document.getElementById('app'));
