import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import thunk from 'redux-thunk';
import authReducer from './store/reducers/Auth/authReducer';
const rootReducer = combineReducers({
  "auth": authReducer
})

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

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

ReactDOM.render(
  <Suspense fallback={<div>Loading</div>}>
    <Provider store={store}><App /></Provider>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
