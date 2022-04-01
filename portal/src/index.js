import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store  from './redux/store';
import reportWebVitals from './reportWebVitals';



const logger = (store) => {
  return (next) => {
      return (action) => {
          // console.log("[Middleware dispatching : ", action)
          const result = next(action)
          // console.log("[Middleware] next state : ", store.getState())
          return result
      }
  }
}


ReactDOM.render(
<Provider 
  store={store} >
    <App />
</Provider>,
document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
