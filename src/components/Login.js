import React from "react";
import CONFIG from "../configs/env"
import LoginSon from "./sonComps/LoginSon"
import { copyFile } from "fs";
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginCred: {
        username: "",
        password: ""
      },
      redirectstate: false,
      isLoaded: false,
      BorderColorState: "input1"
    };
  }

  handlelog = () => {
    if (this.state.loginCred.password !== "" && this.state.loginCred.username !== "") {
      this.setState({ isLoaded: true });
      var sendableJson = JSON.stringify(this.state.loginCred);
      console.log(CONFIG);
      console.log("start",CONFIG.API.CHECKUSER);
      fetch(CONFIG.API.CHECKUSER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: sendableJson
      })
        .then(data => data.json())
        .then(jsoned => {
          localStorage.setItem("jwt", jsoned.newpayload.token);
          localStorage.setItem(
            "permissionlvl",
            jsoned.newpayload.permissionlvl
          );
        })
        .then(jsoned => this.setState({ redirectstate: true }))
        .catch(error => this.handleFailedLogin());
    }
    else {
      this.handleFailedLogin();
    }

  }

  handleClass = () => { }

  handleFailedLogin = () => {
    this.setState({ isLoaded: false });
    this.setState({ BorderColorState: "inputfailed" });
  }

  handeChange1 = (event) => {
    this.setState({
      loginCred: {
        ...this.state.loginCred,
        username: event.target.value,
      }
    });
  }
  handeChange2 = (event) => {
    this.setState({
      loginCred: {
        ...this.state.loginCred,
        password: event.target.value
      }
    });
  }
  componentDidMount() {
    console.log("LoginDidmount");
    var jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      this.setState({ redirectstate: true });
    }
  }

  componentDidUpdate() {
    if (this.state.redirectstate) {
      window.location.reload()
    }
  }
  render() {
    return (
      <LoginSon isLoaded={this.state.isLoaded}
        handeChange1={this.handeChange1}
        handeChange2={this.handeChange2}
        handlelog={this.handlelog}
        BorderColorState={this.state.BorderColorState} />
    );
  }
}
