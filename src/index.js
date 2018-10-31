import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";

import deckReducer from "./store/reducers/deckReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	deck: deckReducer
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
