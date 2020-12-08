import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bell } from 'react-bootstrap-icons';
import { connect, connent } from "react-redux";
import Notifications from "react-notifications-menu";
import { options } from "date-fns/locale/af";
import Dropdown from 'react-bootstrap/Dropdown'
import NotificationsIcon from '@material-ui/icons/Notifications';
import ItemNotification from "./ItemNotification";
import IconButton from "@material-ui/core/IconButton";
import {ThemeContext} from "../../ColorMode/colors";
// import NotificationsIcon from '@material-ui/icons/Notifications';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from '@material-ui/core/Badge';
class NotificationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: []
    }
  }
  static contextType = ThemeContext;

  UNSAFE_componentWillMount() {
    this.handleNoti(this.props.userNotification);
  }
  componentWillReceiveProps(nextProps) {
    console.log("NoticompentnWillReciverProps")
    this.handleNoti(nextProps.userNotification);
  }
  arrangeByDate(data) {
    data.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
    
    console.log("arrange" , data);
    return data;
  }
  getFormattedData(date) {
    var todayTime = new Date(date);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
  }
  async handleNoti(dataAll) {
    var temp = [];
    let message;
    let action;
    var data,originalData;
    let redirect;
    console.log("data", dataAll);
    if (localStorage.getItem("permissionlvl") === "admin") {
      data = this.props.notification;
      for (var i = 0; i < data.length; i++) {
        if (data[i].action == "askManager") {
          message = data[i].exchangeObject.toranotOldObject.userDetails.name + " ו " + data[i].exchangeObject.toranotNewObject.userDetails.name + " רוצים להחליף אחד עם השני ";
          action = "ApproveManager";
        }
        var notiObject = {
          action: action,
          message: message
        };
        temp.push(notiObject);
      }
    } else {
   // originalData = this.props.userNotification;
   originalData = dataAll;
    data = await this.arrangeByDate(originalData);

      for (var i = 0; i < data.length; i++) {
        console.log("element", data[i]);
        if (data[i].seen == false) {
          if (data[i].toranot != null) {
            var date = data[i].toranot.date;
            // var todayTime = new Date(data[i].toranot.date);
            // var month = todayTime.getMonth() + 1;
            // var day = todayTime.getDate();
            // var year = todayTime.getFullYear();
            // var formattedDate = day + "/" + month + "/" + year;
         var formattedDate = this.getFormattedData(data[i].toranot.date);
          }
          if (data[i].action == "addToranot") {
            message = " מנהל שיבץ אותך בתאריך ה" + formattedDate;
            action = "myShmirot";
            redirect = 'myShmirot';
          }
          if (data[i].action == "deleteToranot") {
            message = " מנהל שיבץ אותך בתאריך ה " + formattedDate;
            action = "myShmirot";
            redirect = 'myShmirot';
          }
          if (data[i].action == "wantExchange") {
            message = data[i].userDetails.name + " ביקש להתחלף איתך עם התאריך " + formattedDate;
            action = "wantExchange";
            redirect = 'wantExchange';
          }
          if (data[i].action == "toranApprove") {
            message = data[i].userDetails.name + " הסכים להחליף איתך בתאריך " + formattedDate;
            redirect = "answerExchange";

          }
          if (data[i].action == "toranReject") {
            message = data[i].userDetails.name + " דחה את ההחלפה בתאריך " + formattedDate;
            redirect = "answerExchange";
          }
          if (data[i].action == "managerApprove") {
            message = " מנהל אישר את ההחלפה שלך בתאריך" + formattedDate + " עם " + data[i].userDetails.name;
            redirect = "answerExchange";
          }
          if (data[i].action == "managerReject") {
            message = " מנהל דחה את ההחלפה שלך בתאריך " + formattedDate + " עם " + data[i].userDetails.name;
            redirect = "answerExchange";
          }
          if (data[i].action == "addToranotTogther") {
            message = data[i].userDetails.name + " ביקש לעשות איתך את תורונות חודש הבא ";
            redirect = "ToranotTogther";
          }
          if (data[i].action == "cancelToranotToghter") {
            message = data[i].userDetails.name + " בטל את בקשה שלו לעשות איתך תורונות חודש הבא";
          }
          var notiObject = {
            message: message,
            dateNotification: this.getFormattedData(data[i].date),
            redirect: redirect,
            notificationInfo: data[i]
          };

          console.log("message", notiObject)
          temp.push(notiObject);
        }
      }
      this.setState({ notification: temp });
    }

  }

  
  render() {
    console.log("notificationReder");
    const navDropdownTitle = (this.state.notification.length != 0? (
    <Badge badgeContent={this.state.notification.length} color="primary">
    <NotificationsIcon style={{color:"white"}}>
 Dropdown </NotificationsIcon></Badge>) : 
 <NotificationsIcon style={{color:"white"}}>
 Dropdown </NotificationsIcon>);
    return (
      <Dropdown>
    <NavDropdown title={navDropdownTitle} eventKey={3} id="basic-nav-dropdown">
    <div className="menu-item-container" style={{backgroundColor:this.context.bodyBackGround , color :this.context.exteme}}>
     {this.state.notification.length !=0? this.state.notification.map(el =>  <ItemNotification data={el} />) :
     <div id="no-message-noti"> 
     אין התראות חדשות
     </div>  }</div> 
      </NavDropdown>

</Dropdown>
    );
  }

  

}
function mapStateToProps(state) {
  return {
    notification: state.notification,
    userNotification: state.userNotification
  }
}

export default connect(mapStateToProps, null)(NotificationBox);