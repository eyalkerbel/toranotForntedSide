import React from "react";
import CONFIG from "../configs/env"
import LoginSon from "./sonComps/LoginSon"
import { copyFile } from "fs";
import { connect } from "react-redux";
import {loginAction} from "../Actions/loginAction";
 class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginCred: {
        username: "",
        password: "",
      },
      redirectstate: false,
      isLoaded: false,
      BorderColorState: "input1",
      userDetails:""
    };
  }

  handlelog = () => {
    console.log("logincred" , this.state.loginCred);

    if (this.state.loginCred.password !== "" && this.state.loginCred.username !== "") {
      this.setState({ isLoaded: true });
      var sendableJson = JSON.stringify(this.state.loginCred);
      console.log(CONFIG);
      console.log("starti",CONFIG.API.CHECKUSER);
      fetch(CONFIG.API.CHECKUSER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: sendableJson
      })
        .then(data => data.json())
        .then(async jsoned => {
         await this.props.getUserDatails(jsoned.details);

          console.log("logincred" , this.state.loginCred);


          localStorage.setItem("jwt", jsoned.newpayload.token);
          localStorage.setItem(
            "permissionlvl",
            jsoned.newpayload.permissionlvl
          );
         // this.setState({userDetails:jsoned.details});
        //  this.props.loginUser(this.state.username,"",this.state.loginCred.password);
        })
        .then(jsoned =>{
            console.log("finihs");
          this.setState({redirectstate: true})
      })
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
   window.location.reload();
  // this.props.loginDispatch("user" , 38338, "djjd");

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
const mapDispatchToProps = dispatch => ({
  loginUser: (user,sn,password) => dispatch(loginAction(user,sn,password))
})


export default connect(null, mapDispatchToProps)(Login);
