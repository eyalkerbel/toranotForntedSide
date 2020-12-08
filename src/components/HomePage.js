import styleExport from "./themeStyle";
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
import { connect } from "react-redux";
import {loginAction} from "../Actions/loginAction";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles,withStyles  } from '@material-ui/core/styles';



// const useStyles = (theme) => ({
//   ...styleExport(theme),
//   // headerStyle: {
//   //     color: theme.palette.text.default 
//   // },
//   textRegualar: {
//     color: theme.palette.text.primary +" !important",
//   },
//   borderStyle : {
//     borderColor: theme.palette.text.secondary,
//     border: "solid 1px"
//   }
  
//});





class HomePage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     info: [],
     loading:true,
     exchanges: []
   }
 }
 componentWillMount() {
//   fetch(CONFIG.API.GETNOTIFACTION, {
//   method:"POST",
//   headers: {
//     "Content-Type": "application/json;charset=utf-8",
//     Authorization: "Bearer " + localStorage.getItem("jwt")
// }}).then(dat => dat.json()).then(data => this.handleNoti(data));
}
handleNoti(dataAll) {
//   var temp = [];
//   let message;
//   let action;
//   let tempJson = "";
//   var data = dataAll[0];
//   var temp2 = []; 
//   if (localStorage.getItem("permissionlvl") === "admin") {
//     for(var i=0;i<data.length;i++) {
//       if(data[i].action == "askManager") {
//         message =  data[i].exchangeObject.toranotOldObject.userDetails.name + " ו " + data[i].exchangeObject.toranotNewObject.userDetails.name + " רוצים להחליף אחד עם השני ";
//         action = "ApproveManager";
//     }
//       var notiObject = {
//       action:action,
//       message:message
//     };
//   temp.push(notiObject);
// } 

// } else {
// for(var i=0;i<data.length;i++) {
//   if(data[i].seen == false) {
//     if(data[i].toranot != null) {
//     var date = data[i].toranot.date;
//     var todayTime = new Date(data[i].toranot.date);
//     var month = todayTime.getMonth() + 1;
//     var day = todayTime.getDate();
//     var year = todayTime.getFullYear();
//     var formattedDate = day + "/" + month + "/" + year;
//     var dats = new Date(date);
//   }
//   if(data[i].action == "addToranot") {
//       message = " מנהל שיבץ אותך בתאריך ה" +formattedDate;
//       action = "myShmirot";
//     }
//   if(data[i].action == "deleteToranot") {
//     message = " מנהל שיבץ אותך בתאריך ה " + formattedDate;
//     action = "myShmirot";
//   }
//   if(data[i].action == "wantExchange") {
//       message = data[i].userDetails.name + " ביקש להתחלף איתך עם התאריך " +  formattedDate;
//       action = "wantExchange";
//     } 
//   if(data[i].action == "toranApprove") {
//     message = data[i].userDetails.name + " הסכים להחליף איתך בתאריך "  +  formattedDate;
//     action = "answerExchange";
//   }
//   if(data[i].action == "toranReject") {
//     message = data[i].userDetails.name + " דחה את ההחלפה בתאריך " +  formattedDate;
//     action = "answerExchange";
//   }
//   if(data[i].action == "managerApprove") {
//     message = " מנהל אישר את ההחלפה שלך בתאריך" + formattedDate +  " עם " +  data[i].userDetails.name;
//     action = "answerExchange";
//   }
//   if(data[i].action == "managerReject") {
//     message = " מנהל דחה את ההחלפה שלך בתאריך " + formattedDate +  " עם " +  data[i].userDetails.name;
//     action = "answerExchange";
//   }
//   if(data[i].action == "addToranotTogther") {
//     message = data[i].userDetails.name + " ביקש לעשות איתך את תורונות חודש הבא ";
//     action = "ToranotTogther";
//   }
//   if(data[i].action == "cancelToranotToghter") {
//     message = data[i].userDetails.name + " בטל את בקשה שלו לעשות איתך תורונות חודש הבא"
//   }


// var notiObject = {
//   action:action,
//   message:message
// };

// // console.log("message",notiObject)
//   temp.push(notiObject);
// }
// }
// }



// this.setState({info:temp,loading:false});
  //console.log("[[w");
  //data2 = [];

// var data2 = dataAll[1];
// console.log("data32",data2);
// let mess;
// for(var i=0;i<data2.length;i++) {
//   if(data2[i].seen == false) {
//     console.log("hola");
// var oldDate = data2[i].toranotOld.date;
// var newDate = data2[i].toranotNew.date;
// var datsOld = new Date(oldDate);
// var datsNew = new Date(newDate);
// mess = data2[i].oldDate.name  + " ask change, his toranot " + datsOld.getDate() + " with yours" + datsNew.getDate();
// temp2.push(mess);
// }
// }

// console.log("notis" , temp , temp2);
//this.setState({info:temp,loading:false,exchanges:temp2});
}



  render() {
    const {classes} = this.props;
    console.log("propsHomePagw" , this.props);
    return (
      <Fragment>
      <CssBaseline />
      <Notifications info={this.state.info} exchanges={this.state.exchanges} />
      {/* {console.log(this.state.loading)} */}
      {/* {this.state.loading == false ? */}
      {true? 
      <Paper className="maincontainer">
        <div className={`header-container ${classes.headerStyle}`}>
          <h1 className="header">מערכת לניהול תורנויות</h1>
          <div className="divider" />
        </div>
        <div className={`infocard-container1 ${classes.textRegualar}`}>
        {localStorage.getItem("permissionlvl") === "admin"? 
        <Card className= {`infocard ${classes.borderStyle}`}>
            <NavLink
              style={{ color: this.context.bodyText, height: "100%", padding: "initial" }}
              to="/approve_change"
            >
              <CardActionArea className={`cc3 ${classes.textRegualar}` }>
                <i className="material-icons icons" style={{color: this.context.bodyText}}>calendar_today</i>
                <h1 className={classes.textRegualar} >אישורי החלפות</h1>
                <p className={classes.textRegualar} >כל אישורי ההחלפות של המשתמשים</p>
              </CardActionArea>
            </NavLink>
          </Card>
          :
          <Card className={`infocard ${classes.borderStyle}`}>
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/shmirot"
            >
              <CardActionArea className={`cc3 ${classes.textRegualar}`}>
                <i className="material-icons icons">calendar_today</i>
                <h1 className={classes.textRegualar} >תורניות שלי</h1>
                <p className={classes.textRegualar}>התורנויות שלך לחודש ולחודש הבא.</p>
              </CardActionArea>
            </NavLink>
          </Card>}
          <Card className={`infocard ${classes.borderStyle}`}>
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/shmirottable"
            >
              <CardActionArea className={`cc3 ${classes.textRegualar}`}>
                <i className="material-icons icons">insert_drive_file</i>
                <h1 className={classes.textRegualar}>לוח תורניות</h1>
                <p className={classes.textRegualar}>לוח התורנויות לחודש הנוכחי ולחודש הבא</p>
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
          <Card className={`infocard ${classes.borderStyle}`}>
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/personal"
            >
              <CardActionArea className={`cc3 ${classes.textRegualar}`}>
                <i className="material-icons icons">account_circle</i>
                <h1 className={classes.textRegualar}>פרטים אישיים</h1>
                <p className={classes.textRegualar}>להתעדכן בפרטים האישיים שלך.</p>
              </CardActionArea>
            </NavLink>
          </Card>
        </div>
        <div className="infocard-container2">
          <Card className={`infocard ${classes.borderStyle}`}>
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/info"
            >
              <CardActionArea className={`cc3 ${classes.textRegualar}`}>
                <i className="material-icons icons">info</i>
                <h1 className={classes.textRegualar}>מידע על תורניות</h1>
                <p className={classes.textRegualar}>כל המידע על תורניות, לאן צריך להגיע ומתי.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          <Card className={`infocard ${classes.borderStyle}`}>
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/haadafot"
            >
              <CardActionArea className={`cc3 ${classes.textRegualar}`}>
                <i className="material-icons icons">insert_invitation</i>
                <h1 className={classes.textRegualar}>אילוצים</h1>
                <p className={classes.textRegualar}>הזנת העדפות ואילוצים.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          <Card className={`infocard ${classes.borderStyle}`}>
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/contacts"
            >
              <CardActionArea className={`cc3 ${classes.textRegualar}`}>
                <i className="material-icons icons">contacts</i>
                <h1 className={classes.textRegualar}>אנשי קשר</h1>
                <p style={{height:"24px"}} className={classes.textRegualar}>  </p>

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

// const mapDispatchToProps = (dispatch) => ({  
//   loginDispatch: (username,sn,password) => dispatch(loginAction("personID","22222","blabla"))
// });


// export default connect(null, mapDispatchToProps)(HomePage);

export default withStyles(styleExport , { withTheme: true })(HomePage)