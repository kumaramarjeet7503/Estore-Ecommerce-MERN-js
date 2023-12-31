import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
 import {Provider} from "react-redux"
 import store from "./store"
 import {transitions, positions , Provider as AlertProvider} from "react-alert"
 import AlertTemplate from "react-alert-template-basic"

 const root = ReactDOM.createRoot(document.getElementById('root'));
// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

root.render(
 
    <React.StrictMode>
      <Provider store={store}>
          <App />
      
    </Provider>
  </React.StrictMode>

  
);

