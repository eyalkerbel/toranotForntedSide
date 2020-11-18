import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import "./styles/shmirotTable.css";
import "./styles/login.css";
import "./styles/userList.css";
import "./styles/searchBar.css";
import "./styles/job.css";
import Switcher from "./Switcher";
import * as serviceWorker from './serviceWorker';
import user from './Reducers/UserReducer'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./Reducers/index";
import 'react-notifications/src/notifications.scss';
import { combineReducers, applyMiddleware,compose } from 'redux'
import {NotificationManager,NotificationContainer} from 'react-notifications';
import { authProvider } from './authProvider';
import { AzureAD } from 'react-aad-msal';

import thunk from 'redux-thunk';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(rootReducer,composeWithDevTools(),applyMiddleware(thunk));
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
  // <AzureAD provider={authProvider} forceLogin={true}>
   <Provider store={store}> 
  <div className="height100">
  <NotificationContainer />
    <Switcher />
  </div>
   </Provider>,
  // </AzureAD>,
  document.getElementById("root")
);

serviceWorker.register();