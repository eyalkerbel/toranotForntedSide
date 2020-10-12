import React from "react";
import { BrowserRouter, Route, Switch , Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import SideBar from "./components/SideBar";
// import Tfasim from "./components/Tfasim";
import Contacts from "./components/Contacts";
import Personal from "./components/Personal";
import Shmirot from "./components/shmirot/Shmirot";
import Info from "./components/Info";
import HaadafotSwitcher from "./components/HaadafotSwitcher";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateUser from "./components/CreateUser";
import RedirectorLogin from "./components/RedirectorLogin"
import RedirectorHome from "./components/RedirectorHome"
import ShmirotTable from "./components/ShmirotTable";
import CreateToranut from "./components/createToranot/CreateToranut";
import SendMessage from "./components/SendMessage";
import MailBox from "./components/MailBox";
import {NotificationManager,NotificationContainer} from 'react-notifications';
import CONFIG from "./configs/env";
import Notifications from '../src/components/Notifications';
import ExchangeApprove from "./components/Approve/ExchageApprove";
import PickUsers from "./components/Users/PickUsers";
import { loginAction } from "./Actions/loginAction";
import { connect } from "react-redux";

 class Switcher extends React.Component {
  constructor() {
    super();

    this.state = { log: false,
       redirectState: true,
      userDetails:null,
      info: [],
      exchanges: [],
      loading:true,
      jwt: null,
      ifToDirect:false
     };
  
    this.handleLogin = this.handleLogin.bind(this);
    this.getUserDatails = this.getUserDatails.bind(this);

  }


    componentWillMount() {
      console.log("componentWillMount Swticher");
    }
   
  ReadAndDispaly(i) {
    console.log("readAndDisplay");
    return <Redirect to="/mail" />

  }
//   getMessage() {
//     fetch(CONFIG.API.GETNOTIFACTION, {
//       method:"POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//         Authorization: "Bearer " + localStorage.getItem("jwt")
//     }}).then(dat => dat.json()).then(data => this.handleNoti(data));
// }
// handleNoti(dataAll) {
//   }


  componentDidMount() {
    console.log("componentDidMountSwitcher");
    var jwt = localStorage.getItem("jwt");
    console.log("jwt" , jwt)
    var per = localStorage.getItem("permissionlvl")
    if (jwt !== null) {
      this.setState({ log: true, permissionlvl: per,jwt:jwt});
    }
    fetch(CONFIG.API.GETPERSONDATA, {
      method: "POST",
      headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("jwt")
      }}).then(dat => dat.json()).then(userDetails => this.props.loginDispatch(userDetails.name,userDetails.sn,userDetails.password));
      


  }
 
   getUserDatails(jsonData) {
   console.log("switcher",jsonData);
   this.props.loginDispatch(jsonData.name, jsonData.sn, jsonData.password);

  this.setState({userDetails:jsonData,ifToDirect:true});
  }
 
  handleLogin() {
    console.log("rendring" , this.state.userDetails);
    if (this.state.log === true) {

      return (
        <BrowserRouter>
        {/* <Notifications noti={this.state.noti} /> */}
          <SideBar />
          <Switch>
            <Route path="/home" render={() => <HomePage  />} />
            <Route path="/haadafot" component={HaadafotSwitcher} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/personal" render={() => <Personal userDetails={this.state.userDetails} noti={this.state.noti} /> } />
            <Route path="/shmirot" component={Shmirot} />
            <Route path="/shmirottable" component={ShmirotTable} />
            <Route path="/info" component={Info} />
            <Route path="/createuser" render={() => <CreateUser permissionlvl={this.state.permissionlvl} />} />
            <Route path="/createtoranut" render={() => <CreateToranut permissionlvl={this.state.permissionlvl} />} />
            <Route path="/sendmessage" render={() => <SendMessage permissionlvl={this.state.permissionlvl} /> } />
            <Route path="/approve_change" render={() => <ExchangeApprove permissionlvl={this.state.permissionlvl} /> } />
            <Route path="/mail" render={() => <MailBox permissionlvl={this.state.permissionlvl} /> } />
            <Route path="/pickusers" render={() => <PickUsers permissionlvl={this.state.permissionlvl} />} />
            <Route exact component={RedirectorHome} />
            <NotificationContainer />
          </Switch>
        </BrowserRouter>
      );
    } else if (this.state.log === false) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/signup" render={() => <SignUp getUserDatails={this.getUserDatails} />} />
            <Route path="/login" render={() => <Login getUserDatails={this.getUserDatails}  ifToDirect={this.state.ifToDirect}  />} />
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

const mapDispatchToProps = (dispatch) => ({  
  loginDispatch: (username,sn,password) => dispatch(loginAction(username,sn,password))
});


export default connect(null, mapDispatchToProps)(Switcher);

