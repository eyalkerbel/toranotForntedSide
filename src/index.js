import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import Switcher from "./Switcher";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <div className="height100">
    <Switcher />
  </div>,
  document.getElementById("root")
);

serviceWorker.register();