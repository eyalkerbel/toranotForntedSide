import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import SideBar from "./components/SideBar";
// import Tfasim from "./components/Tfasim";
import Contacts from "./components/Contacts";
import Personal from "./components/Personal";
import Shmirot from "./components/Shmirot";
import Info from "./components/Info";
import HaadafotSwitcher from "./components/HaadafotSwitcher";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateUser from "./components/CreateUser";
import RedirectorLogin from "./components/RedirectorLogin"
import RedirectorHome from "./components/RedirectorHome"
import ShmirotTable from "./components/ShmirotTable";
import CreateToranut from "./components/CreateToranut";
export default class Switcher extends React.Component {
  constructor() {
    super();

    this.state = { log: false,
       redirectState: true,
      userDetails:""
     };
  
    this.handleLogin = this.handleLogin.bind(this);
    this.getUserDatails = this.getUserDatails.bind(this);
  }

  componentDidMount() {
    var jwt = localStorage.getItem("jwt")
    var per = localStorage.getItem("permissionlvl")
    if (jwt !== null) {
      this.setState({ log: true, permissionlvl: per });
    }
  }
  async getUserDatails(jsonData) {
   console.log("switcher",jsonData);
  this.setState({userDetails:jsonData});
  }

  handleLogin() {
    if (this.state.log === true) {
      return (
        <BrowserRouter>
          <SideBar />
          <Switch>
            <Route path="/home" component={HomePage} />
            {/* <Route path="/tfasim" component={Tfasim} /> */}
            <Route path="/haadafot" component={HaadafotSwitcher} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/personal" render={() => <Personal userDetails={this.state.userDetails} /> } />
            <Route path="/shmirot" component={Shmirot} />
            <Route path="/shmirottable" component={ShmirotTable} />
            <Route path="/info" component={Info} />
            <Route path="/createuser" render={() => <CreateUser permissionlvl={this.state.permissionlvl} />} />
            <Route path="/createtoranut" render={() => <CreateToranut permissionlvl={this.state.permissionlvl} />} />
            <Route exact component={RedirectorHome} />
          </Switch>
        </BrowserRouter>
      );
    } else if (this.state.log === false) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/signup" render={() => <SignUp getUserDatails={this.getUserDatails} />} />
            <Route path="/login" render={() => <Login getUserDatails={this.getUserDatails}  />} />
            <Route exact component={RedirectorLogin} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
  render() {
    return this.handleLogin();
  }
}
