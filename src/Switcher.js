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
import CreateToranut from "./components/CreateToranut";
import SendMessage from "./components/SendMessage";
import MailBox from "./components/MailBox";
import {NotificationManager,NotificationContainer} from 'react-notifications';
import CONFIG from "./configs/env";
import Notifications from '../src/components/Notifications';

export default class Switcher extends React.Component {
  constructor() {
    super();

    this.state = { log: false,
       redirectState: true,
      userDetails:"",
      info: [],
      exchanges: [],
      loading:true
     };
  
    this.handleLogin = this.handleLogin.bind(this);
    this.getUserDatails = this.getUserDatails.bind(this);

  }


  // createNotification(noti) {
  //   console.log("hi");
  //   for(var i=0;i<noti.length;i++) {
  //   NotificationManager.info(this.state.noti[i],"action:",2000,() => {this.ReadAndDispaly(i)
  //   });
  //   }
  //   }
    componentWillMount() {
      console.log("componentWillMount Swticher");
      this.getMessage();
    }
   
  ReadAndDispaly(i) {
    console.log("readAndDisplay");
    return <Redirect to="/mail" />

  }
  getMessage() {
    fetch(CONFIG.API.GETNOTIFACTION, {
      method:"POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
    }}).then(dat => dat.json()).then(data => this.handleNoti(data));
}
handleNoti(dataAll) {
//  this.setState({info:dataAll[0],exchanges:dataAll[1],loading:false});
  // console.log("handleNoti",dataAll)
  // var temp = [];
  // let message;
  // let tempJson = "";
  // var data = dataAll[0];
  // for(var i=0;i<data.length;i++) {
  // var date = data[i].data;
  //   var dats =  new Date(date);
  //   console.log("data",dats.getDate());
  //   if(data[i].action == "place") {
  //        message = "manager place you on date" + dats.getDate();
  //     }
  //    if(data[i].action == "delete") {
  //    message = "manager remove you on date" + dats.getDate();
  //  }
  
  //   console.log("message",message)
  //     temp.push(message);
  // }
  // var data2 = dataAll[1];
  // var temp2 = []; 
  // let mess;
  // for(var i=0;i<data2.length;i++) {
  //   var oldDate = data2[i].oldDate.date;
  //   var newDate = data2[i].newDate.date;
  //   var datsOld = new Date(oldDate);
  //   var datsNew = new Date(newDate);
  //   mess = data2[i].oldDate.name  + " ask change, his toranot " + datsOld.getDate() + " with yours" + datsNew.getDate();
  //   temp2.push(mess);
  // }
  //   console.log("noti" , temp , temp2);
  // this.setState({info:temp,loading:false,exchanges:temp2});
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
    console.log("rendring");
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
            <Route path="/mail" render={() => <MailBox permissionlvl={this.state.permissionlvl} /> } />
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
