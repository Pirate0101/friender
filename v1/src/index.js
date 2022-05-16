import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App/App';
import { ThemeContextProvider } from './contexts/themeContext';
import './i18n';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import './styles/styles.scss';
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
<Router>
		<React.StrictMode>
			<ThemeContextProvider >
				<App />
			</ThemeContextProvider>
		</React.StrictMode>
	</Router>
  </Provider>
	,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
