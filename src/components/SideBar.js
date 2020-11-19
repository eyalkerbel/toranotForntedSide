import React, { Fragment } from "react";
import "material-icons";
import Drawer from "@material-ui/core/Drawer";
import { List, ListItem, AppBar, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import Notifications from "react-notifications-menu";
import CONFIG from "../configs/env";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Clock from 'react-live-clock';

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = { sidebarstate: false, backstyle: { visibility: "hidden" }, dafi: null,noti:[],loading:true,notifaction:[{
      id: 1,
      title: 'some title', // not required
      message: 'The notification text', 
      new: false, // if the user has read the notification
      date: '09/12/2016' // not required
  }]
 };
    this.handleSideBar = this.handleSideBar.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
    this.adminIf = this.adminIf.bind(this);
  }

  adminIf() {
    if (localStorage.getItem("permissionlvl") === "admin") {
      this.setState({
        dafi:
          <Fragment>
           <NavLink to="/manage_jobs">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">person_add</i>
                <h2>הגדר תפקידים</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/pickusers">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">person_add</i>
                <h2>בחר משתמשים</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/change_user">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">person_add</i>
                <h2>שנה משתמשים</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/createuser">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">person_add</i>
                <h2>הוסף משתמש</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/createtoranut">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">person_add</i>
                <h2>ניהול שמירות</h2>
              </ListItem>
            </NavLink>
           
          </Fragment>


      })
    }
  }

  UNSAFE_componentWillMount() {
    this.adminIf()
  }
 
  handleNoti(data) {
    
 var temp = [];
    this.setState({noti:temp,loading:false});
  }

  deleteSession = async () => {
    localStorage.clear()
    window.location.reload();
  }

  handleSideBar() {
    this.setState({ sidebarstate: !this.state.sidebarstate });
    if (this.state.backstyle.visibility === "hidden") {
      this.setState({ backstyle: { visibility: "visible" } });
    } else if (this.state.backstyle.visibility === "visible") {
      this.setState({ backstyle: { visibility: "hidden" } });
    }
  }
  render() {
    return (
      <Fragment>
        <Backdrop
          open={this.state.sidebarstate}
          onClick={() => this.handleSideBar()}
          style={{ zIndex: "200" }}
        />
        <AppBar position="fixed" className="header1">
          <div className="homemadetoolbar">
            <IconButton onClick={() => this.handleSideBar()} edge="start">
              <i className="material-icons" style={{ color: "ghostwhite" }}>menu</i>
            </IconButton>
            <IconButton
              style={this.state.backstyle}
              className="backarrow"
              onClick={() => this.handleSideBar()}
              edge="start"
            >
              <i className="material-icons" style={{ color: "ghostwhite" }}>keyboard_arrow_right</i>
            </IconButton>
            
          </div>
          <div className="homemadetoolbar2">
          <h1>
            <Clock format="D/M/YYYY, h:mm:ss " interval={1000} ticking={true} />
          </h1>
            <IconButton onClick={() => this.deleteSession()} className="item1">
              <i className="material-icons" style={{ color: "ghostwhite" }}>verified_user</i>
            </IconButton>
          </div>
        </AppBar>
        <Drawer
          className="Drawer"
          variant="persistent"
          anchor="right"
          open={this.state.sidebarstate}
        >
        <div className="div-name-project">
          מבצר הים
        </div>
          <div className="cc2">
            <img
              className="mainlogo"
              src={require("../images/castle.png")}
              alt=""
            ></img>
          </div>
          <List>
            <Divider />
            <NavLink to="/">
              <ListItem
                alignItems="center"
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">home</i>
                <h2>בית</h2>
              </ListItem>
            </NavLink>
            {localStorage.getItem("permissionlvl") === "admin"?
            <NavLink to="/approve_change">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}>
                <i className="material-icons icons2">calendar_today</i>
                <h2>אישורי החלפות</h2>
              </ListItem>
            </NavLink> 
            :
            <NavLink to="/shmirot">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">calendar_today</i>
                <h2>שמירות שלי</h2>
              </ListItem>
            </NavLink>}
            <NavLink to="/pick_friend_toranot_together">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">contacts</i>
                <h2>תורניות עם חברים</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/shmirottable">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">calendar_today</i>
                <h2>לוח שמירות</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/haadafot">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">insert_invitation</i>
                <h2>העדפות ואילוצים</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/personal">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">account_circle</i>
                <h2>פרטים אישיים</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/info">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">info</i>
                <h2>מידע על שמירות</h2>
              </ListItem>
            </NavLink>
            <NavLink to="/contacts">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">contacts</i>
                <h2>אנשי קשר</h2>
              </ListItem>
            </NavLink>
            {/* <NavLink to="/sendmessage">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">send</i>
                <h2>צור קשר</h2>
              </ListItem>
            </NavLink> */}
            {/* <NavLink to="/mail">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">mail</i>
                <h2>תיבת דואר</h2>
              </ListItem>
            </NavLink> */}
            {this.state.dafi}
          </List>
        </Drawer>
      </Fragment>
    );
  }
}
