import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../src/Firebase/configFirebase";

initializeApp(firebaseConfig);

ReactDOM.render( 
  <React.StrictMode >
  <App / >
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();