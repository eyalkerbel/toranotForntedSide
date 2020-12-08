import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import "./styles/shmirotTable.css";
import "./styles/login.css";
import "./styles/userList.css";
import "./styles/searchBar.css";
import "./styles/job.css";
import "./styles/DialogCell.css";
import "./styles/menu.css";
import "./styles/personalDetalis.css"
import "./styles/scroolbar.css";
import "./styles/notificationBox.css";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'


// import 'jquery';
// import 'bootstrap/dist/js/bootstrap';
// import "../node_modules/bootstrap/dist/js/bootstrap"


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
import App from "./App";


import thunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)
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
    <App />
  </div>
   </Provider>,
  // </AzureAD>,
  document.getElementById("root")
);

serviceWorker.register();