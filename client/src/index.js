import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "react-datepicker/dist/react-datepicker.css" 
import {BrowserRouter as Router} from 'react-router-dom'
import "typeface-ubuntu"

ReactDOM.render(
  <React.StrictMode>
  	<Router>
    	<App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


