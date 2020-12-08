import React, { Fragment } from "react";
import "material-icons";
import Drawer from "@material-ui/core/Drawer";
import { List, ListItem, AppBar, Divider, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { NavLink } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import { withStyles } from "@material-ui/core/styles";
// import ActionMenu from 'material-ui/svg-icons/action/menu';
import MenuIcon from '@material-ui/icons/Menu';
import CONFIG from "../../configs/env";
import {connect} from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Clock from 'react-live-clock';
import NotificationBox from "./NotificationBox";
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
// import Notifications from "react-notifications-menu";

const useStyles = (theme) => ({
  headerStyle: {
      color: theme.palette.text.default 
  },
  textRegualar: {
    color: theme.palette.text.primary +" !important",
  },
  borderStyle : {
    borderColor: theme.palette.text.secondary,
    border: "solid 1px"
  }
  
});



const styles2 = {

  largeIcon: {
    width: 30,
    height: 60,
  },

};


const styles = theme => ({
  cancelButton: {
    backgroundColor: "white",
    color: "black",
    
    
} ,
myComponent: {
  "& .MuiButtonBase-root": {
    color: theme.palette.text.primary
  }
},
  appBar: {
    color : theme.palette.text.primary
} , 
iconMenu: {
  backgroundColor: theme.palette.text.primary
} , textRegualar: {
  color: theme.palette.text.primary +" !important",
},

});
class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {textButton: "Dark" ,sidebarstate: false, backstyle: { visibility: "hidden" }, dafi: null,noti:[],loading:true,notifaction:[{
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
  changeDarkMode() {
    console.log("changeDarkMode")
    if(this.state.textButton == "Dark") {
      this.setState({textButton : "Light"}) 
    } else {
      this.setState({textButton : "Dark"});
    }
    this.props.changeDarkMode();
  }
  adminIf() {
    if (localStorage.getItem("permissionlvl") === "admin") {
     return (<Fragment>
           <NavLink to="/manage_jobs">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">person_add</i>
                <h2>הגדר בעלי תפקידים</h2>
              </ListItem>
            </NavLink>
            {/* <NavLink to="/pickusers">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">person_add</i>
                <h2>בחר משתמשים</h2>
              </ListItem>
            </NavLink> */}
            {/* <NavLink to="/change_user">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">person_add</i>
                <h2>שנה משתמשים</h2>
              </ListItem>
            </NavLink> */}
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
                <h2>ניהול תורניות</h2>
              </ListItem>
            </NavLink>
           
          </Fragment>)


    }
  }

  UNSAFE_componentdMount() {
    // console.log("coponetnWillMountSideBar");
    // this.adminIf()
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
    const {classes} = this.props;
    console.log("renderSideBar");
    return (
      <Fragment>
        <Backdrop
          open={this.state.sidebarstate}
          onClick={() => this.handleSideBar()}
          style={{ zIndex: "200" }}
        />
        <AppBar position="fixed" className="header1" color={'secondary'}>
          <div className="homemadetoolbar">
            <IconButton  iconStyle={styles2.largeIcon}    onClick={() => this.handleSideBar()} edge="start">
            {/* <ActionMenu /> */}
            <MenuIcon fontSize="large"  htmlColor="white"  />
              {/* <i className="material-icons" style={{ color: "ghostwhite"}} size="large">menu</i> */}
            </IconButton>
            <IconButton
              style={this.state.backstyle}
              className="backarrow"
              onClick={() => this.handleSideBar()}
              edge="start"
            >
              <i  className="material-icons" style={{ color: "ghostwhite" }}>keyboard_arrow_right</i>
            </IconButton>
            <div className="divider-horizontal"></div>
            <div id="display-name-homePage"> <span>ברוך הבא, {this.props.user.name} </span> </div>
            
            <div className="divider-horizontal"></div>
            <div id="notiification-box">
            <NotificationBox />
            {/* <Notifications /> */}
          </div>
          </div>
          <div id="middle-menu">
          <div id="dispaly-project-name">
                מערכת לניהול תורניות
              </div>
              </div>
          <div className="homemadetoolbar2">
        
          <div id="div-drak-mode">
          {/* <Button  className={classes.cancelButton}  size="small" onClick={() => this.changeDarkMode()} >{this.state.textButton} MODE</Button> */}
          {this.state.textButton == "Dark"?<Brightness4Icon onClick={() => this.changeDarkMode()}/> :<Brightness7Icon onClick={() => this.changeDarkMode()} /> }
          </div>
          <div className="divider-horizontal"></div>
        <div className="clock-menu">
          <h2>
            <Clock format="D/M/YYYY" interval={1000} ticking={true} />
            <div className="divider-horizontal"></div>
            <Clock format="h:mm:ss " interval={1000} ticking={true} />

          </h2>
          </div>

          <div className="divider-horizontal"></div>
          <div className="log-out">
            <IconButton onClick={() => this.deleteSession()}  className="item1">
              <i className="material-icons" style={{ color: "ghostwhite" }}>verified_user</i>
            </IconButton>
            </div>
          </div>
        </AppBar>
        <Drawer
          className="Drawer "
          variant="persistent"
          anchor="right"
          open={this.state.sidebarstate}
        >
        {/* <div className="div-name-project">
          מבצר הים
        </div> */}
          <div className="cc2">
            <img
              className="mainlogo"
              src={require("../../images/castle.png")}
              alt=""
            ></img>
          </div>
          <List className={classes.myComponent} >
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
                //className={`listd ${classes.textRegualar}` }
                className={"listd"}
                button
                onClick={() => this.handleSideBar()}>
                <i className="material-icons icons2">calendar_today</i>
                <h2 className={classes.textRegualar}>אישורי החלפות</h2>
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
                <h2 className={classes.textRegualar}>תורניות שלי</h2>
              </ListItem>
            </NavLink>}
            {/* <NavLink to="/pick_friend_toranot_together">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">contacts</i>
                <h2>תורניות עם חברים</h2>
              </ListItem>
            </NavLink> */}
            <NavLink to="/shmirottable">
              <ListItem
                className="listd"
                button
                onClick={() => this.handleSideBar()}
              >
                <i className="material-icons icons2">calendar_today</i>
                <h2 className={classes.textRegualar}>לוח תורניות</h2>
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
                <h2>מידע על תורניות</h2>
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
            {this.adminIf()}

          </List>
        </Drawer>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
} 

export default connect(mapStateToProps,null)(withStyles(styles)(SideBar));