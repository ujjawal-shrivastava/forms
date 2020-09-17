import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Router } from 'react-router'
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
