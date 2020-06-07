import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import Switcher from "./Switcher";
import * as serviceWorker from './serviceWorker';
import user from './Reducers/UserReducer'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(rootReducer,composeWithDevTools(),applyMiddleware(thunk));
const store = createStore(
  user,
  composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
  <div className="height100">
    <Switcher />
  </div>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();