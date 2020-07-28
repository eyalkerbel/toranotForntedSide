import React, { Fragment } from "react";
import "material-icons";
import Card from "@material-ui/core/Card";
import { Paper, CardActionArea } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import {NotificationManager,NotificationContainer} from 'react-notifications';
import CONFIG from "../configs/env";
import LoadingPage from "./LoadingPage";
import { Redirect } from 'react-router-dom';
import Notifications from './Notifications';
export default class HomePage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     info: [],
     loading:true,
     exchanges: []
   }
 }
 componentWillMount() {
  fetch(CONFIG.API.GETNOTIFACTION, {
  method:"POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: "Bearer " + localStorage.getItem("jwt")
}}).then(dat => dat.json()).then(data => this.handleNoti(data));
}
handleNoti(dataAll) {
var temp = [];
let message;
let tempJson = "";
var data = dataAll[0];
for(var i=0;i<data.length;i++) {
  if(data[i].seen == false) {
var date = data[i].data;
var dats =  new Date(date);
if(data[i].action == "place") {
     message = "manager place you on date" + dats.getDate();
  }
 if(data[i].action == "delete") {
 message = "manager remove you on date" + dats.getDate();
}

console.log("message",message)
  temp.push(message);
}
}
var data2 = dataAll[1];
var temp2 = []; 
let mess;
for(var i=0;i<data2.length;i++) {
  if(data2[i].seen == false) {
    console.log("hola");
var oldDate = data2[i].oldDate.date;
var newDate = data2[i].newDate.date;
var datsOld = new Date(oldDate);
var datsNew = new Date(newDate);
mess = data2[i].oldDate.name  + " ask change, his toranot " + datsOld.getDate() + " with yours" + datsNew.getDate();
temp2.push(mess);
}
}
console.log("notis" , temp , temp2);
this.setState({info:temp,loading:false,exchanges:temp2});
}



  render() {
    {console.log(this.state.info , "s" , this.state.exchanges)}
    return (
      <Fragment>
      <Notifications info={this.state.info} exchanges={this.state.exchanges} />
      {console.log(this.state.loading)}
      {/* {this.state.loading == false ? */}
      {true? 
      <Paper className="maincontainer">
        <div className="header-container">
          <h1 className="header">מערכת לניהול שמירות</h1>
          <div className="divider" />
        </div>
        <div className="infocard-container1">
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/shmirot"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">calendar_today</i>
                <h1>שמירות שלי</h1>
                <p>התורנויות שלך לחודש ולחודש הבא.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/shmirottable"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">insert_drive_file</i>
                <h1>לוח שמירות</h1>
                <p>לוח שמירות של כולם לחודש ולחודש הבא.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          {/* <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/tfasim"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">insert_drive_file</i>
                <h1>טפסים</h1>
                <p>כל הטפסים והקישורים שצריך כדי לשמור.</p>
              </CardActionArea>
            </NavLink>
          </Card> */}
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/personal"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">account_circle</i>
                <h1>פרטים אישיים</h1>
                <p>להתעדכן בפרטים האישיים שלך.</p>
              </CardActionArea>
            </NavLink>
          </Card>
        </div>
        <div className="infocard-container2">
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/info"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">info</i>
                <h1>מידע על שמירות</h1>
                <p>כל המידע על שמירות, לאן צריך להגיע ומתי.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/haadafot"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">insert_invitation</i>
                <h1>העדפות ואילוצים</h1>
                <p>הזנת העדפות ואילוצים.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/contacts"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">contacts</i>
                <h1>אנשי קשר</h1>
                <p>אנשי קשר למקרה הצורך.</p>
              </CardActionArea>
            </NavLink>
          </Card>
        </div>
        {/* <button className='btn btn-danger'
          onClick={this.createNotification('error')}>Error
        </button> */}
      </Paper>:<LoadingPage /> }
      </Fragment>
      
    );
  }
}
