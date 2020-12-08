import React from "react";
import { BrowserRouter, Route, Switch , Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import SideBar from "./components/sideBar/SideBar";
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
import ShmirotTable from "./components/ShmirotTable/ShmirotTable";
import CreateToranut from "./components/createToranot/CreateToranut";
import SendMessage from "./components/SendMessage";
import MailBox from "./components/MailBox";
import PickFriends from "./components/pickFriendsToranot/PickFriends";
import {NotificationManager,NotificationContainer} from 'react-notifications';
import CONFIG from "./configs/env";
import Notifications from '../src/components/Notifications';
import ExchangeApprove from "./components/Approve/ExchageApprove";
import UsersSelect from "./components/Users/UsersSelect";
import { loginAction } from "./Actions/loginAction";
import { connect } from "react-redux";
import {initActionMiddleware} from "./Actions/initActionMiddleware";
import LoadingPage from "./components/LoadingPage";
import DefineJobs from "./components/DefineJobs/DefineJobs";
import ChangeUser from "./components/ChangeUser/ChangeUser";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeContext} from './ColorMode/colors';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#303030"
    }
  }
});

const themeDark = createMuiTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});



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
      ifToDirect:false,
      DarkMode:false
     };
  
    this.handleLogin = this.handleLogin.bind(this);
    this.getUserDatails = this.getUserDatails.bind(this);
    this.changeDarkMode = this.changeDarkMode.bind(this);
  }
  static contextType = ThemeContext;

    componentWillMount() {
      
    }
   
  ReadAndDispaly(i) {
    console.log("readAndDisplay");
    return <Redirect to="/mail" />

  }

  componentDidMount() {
    console.log("componentDidMountSwitcher" , this.state);
    var jwt = localStorage.getItem("jwt");
    console.log("jwt" , jwt)
    var per = localStorage.getItem("permissionlvl")
    if (jwt !== null) {
      this.setState({ log: true, permissionlvl: per,jwt:jwt});
       this.props.loginDispatch(per);

    }

  }
 
   getUserDatails(jsonData) {
   console.log("switcher",jsonData);

  this.setState({userDetails:jsonData,ifToDirect:true});
  }
  changeDarkMode() {
    this.props.changeDarkMode();
  }
 
  handleLogin() {
    console.log("rendring" , this.props);
    if (this.state.log === true) {
      if(this.props.pending == true) {

      return (
        <BrowserRouter>
        <SideBar changeDarkMode={this.changeDarkMode} />
        <div style={{width:"100%" , height: "100%" , backgroundColor: this.context.bodyBackGround}}>
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
            {/* <Route path="/pickusers" render={() => <UsersSelect permissionlvl={this.state.permissionlvl} />} /> */}
            <Route path="/pick_friend_toranot_together" render={() => <PickFriends permissionlvl={this.state.permissionlvl} />} />
            <Route path="/manage_jobs" render={() => <DefineJobs permissionlvl={this.state.permissionlvl} />} />
            <Route path="/change_user" render={() => <ChangeUser permissionlvl={this.state.permissionlvl} />} />
            <Route exact component={RedirectorHome} />
            <NotificationContainer />
          </Switch>
          </div>
          </BrowserRouter>);
      
        } else {
       return <LoadingPage />
     }
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
    console.log("componentWillMount Swticher" , this.context);

    return this.handleLogin();
  }
}

const mapDispatchToProps = (dispatch) => ({  
  loginDispatch: (permissionlvl) => dispatch(initActionMiddleware(permissionlvl))
});
const mapStateToProps = (state) => ({
  pending: state.pending
});

export default connect(mapStateToProps, mapDispatchToProps)(Switcher);

