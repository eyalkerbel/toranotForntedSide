import React, { Fragment, Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LoadingPage from "./../LoadingPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import CONFIG from "../../configs/env"
import ExchangeItem from "./ExchangeItem";
import shortid from 'shortid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TabCompShmirot from "./../TabCompSmirot";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HelpIcon from '@material-ui/icons/Help';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import BlockIcon from '@material-ui/icons/Block';
import EmailIcon from '@material-ui/icons/Email';
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import AnswerItem from  "./AnswerItem";
import DailogAnswer from "./DailogAnswer";
const styles = theme => ({
  dialogPaper: {
      width: "300px",
  },
  rejectDialog: {
      width: "70%",
      height: "360px",
  }
});



 class AnswerChanges extends React.Component {
   constructor(props) {
       super(props);

   this.state = {
       arri: [],
       exchanges: [],
       open:false,
       currentItem:null,
       message: null,
       dialogStatus: null

   }
   this.cancelRequest = this.cancelRequest.bind(this);
   this.handleClose = this.handleClose.bind(this);
   this.renderDialog = this.renderDialog.bind(this);
   this.sendMessage = this.sendMessage.bind(this);
   this.sendToManager = this.sendToManager.bind(this);
}
componentDidMount() {
  console.log("mountc" , this.props.fetchArray);
    this.fetchData(this.props);
}
// componentWillReceiveProps(nextProps) {
//   console.log("mountc" , nextProps);
//     this.fetchData(nextProps);
// }
   handleClose() {
    this.setState({open:false});
  }
  
  sendMessage(message,firstTime) {
    var item = this.state.currentItem;
    var index = this.state.exchanges.indexOf(item);
    var sendTo = "user";
    console.log("index" , index);
    this.state.exchanges[index].statusSendAgain = "true";

    this.setState({open:false});
    fetch(CONFIG.API.SENDMESSAGEAGAIN , {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({message,item,sendTo,firstTime})
    }).then(dat => dat.json).then(data => console.log("aas"));

  }
  sendToManager(message) {
    var item = this.state.currentItem;
    var index = this.state.exchanges.indexOf(item);
    var sendTo = "manager";
    fetch(CONFIG.API.SENDMESSAGEAGAIN , {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({message,item,sendTo})
    }).then(dat => dat.json).then(data => console.log("aas"));
  }
   cancelRequest() {
    var item = this.state.currentItem;
    var status =  this.returnStatusByItem(item);

    this.setState({open:false});  
    fetch(CONFIG.API.CANCELREQUEST , {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({item})
    }).then(dat => console.log("exchanges" , this.state.exchanges));

  }

deleteItem(itemTodelete) {
  var index = this.state.exchanges.indexOf(itemTodelete);
  var tempAll = this.props.fetchArray;
  var temp = this.state.exchanges;
   temp.splice(index,1);
  tempAll[2].splice(index,1);
  console.log("afterte" , tempAll , index);
     this.setState({exchanges:temp});

  this.props.updateAnswer(tempAll);
}
makeItemAskingSecond(itemToAsk) {
  var index = this.state.exchanges.indexOf(itemToAsk);
  var tempAll = this.props.fetchArray;
  var temp = this.state.exchanges;

  tempAll[4][index]["status"] = "asking";
  tempAll[3].push(tempAll[4][index]);
  temp[index]["notShow"] = true;
  console.log("notshows" , temp);
  this.props.updateAnswer(tempAll);
  this.setState({exchanges:temp});
}
makeItemAskingMe(itemToAsk) {
  var index = this.state.exchanges.indexOf(itemToAsk);
  var tempAll = this.props.fetchArray;
  var temp = this.state.exchanges;

  tempAll[2][index]["status"] = "mainlycancel";
  temp[index]["notShow"] = true;
  console.log("notshows" , temp);
  this.props.updateAnswer(tempAll);
  this.setState({exchanges:temp});

}


  returnStatusByItem(item) {
    var status = "";
    if(item.status == "asking") {
        status = "delete";
        this.deleteItem(item);
      }
    if((item.status == "agree" || item.status == "reject")) {
        if(item.mainly == "me") {
            status = "mainlycancel";
            this.makeItemAskingMe(item);
        } else {
            status = "asking";
            this.makeItemAskingSecond(item);

            }    
      }
    if((item.status == "decline" && item.status =="convincing")) {
        if(item.mainly == "me") {
            status = "mainlycancelapprove";
        } else {
            status = "asking";
            }    
      }
      return status;
  }

fetchData(currentProps) {
    var getFormattedDatearri = [];
    var tempExhcanges = [];
    var indexMonth;
    console.log("fetch ",currentProps);
    var mineExchanges = currentProps.fetchArray[2];
    var askToAnswerChanges = currentProps.fetchArray[4];

    console.log("mineExchange" , mineExchanges , "ASK" ,askToAnswerChanges);
    for(var i=0; i<mineExchanges.length;i++) {
        var todayTime3 = new Date(mineExchanges[i].oldDate.date);
        var month3 = todayTime3.getMonth() + 1;
        var currentMomth = new Date().getMonth();
        if(currentMomth == todayTime3.getMonth() ) {
          indexMonth = 0;  
        } else {
          indexMonth = 1;
        }
    
        var day3 = todayTime3.getDate();
        var year3 = todayTime3.getFullYear();
        var formattedDate3 = day3 + "/" + month3 + "/" + year3;
        var dayofweek3 = todayTime3.getDay();
        var dayHe3 = 0;
    
        switch (dayofweek3) {
          case 0:
            dayHe3 = "ראשון";
            break;
          case 1:
            dayHe3 = "שני";
            break;
          case 2:
            dayHe3 = "שלישי";
            break;
          case 3:
            dayHe3 = "רביעי";
            break;
          case 4:
            dayHe3 = "חמישי";
            break;
          case 5:
            dayHe3= "שישי";
            break;
          case 6:
            dayHe3 = "שבת";
            break;
          default:
            break;
        }
        var todayTime2 = new Date(mineExchanges[i].newDate.date);
        var month2 = todayTime2.getMonth() + 1;
        var day2 = todayTime2.getDate();
        var year2 = todayTime2.getFullYear();
        var formattedDate2 = day2 + "/" + month2 + "/" + year2;
        
       var exchange = {
         key: i,
         mainly: "me",
         myDateFormat: formattedDate3,
         myDay: dayHe3,
         friendName: mineExchanges[i].newDate.name,
         friendDateForamt: formattedDate2,
         status: mineExchanges[i].status,
         month:month2 - 1,
         friendMessage:mineExchanges[i].newMessage,
         myMessage: mineExchanges[i].oldMessage,
         managerMessage: mineExchanges[i].managerMessage,
         id: mineExchanges[i]._id,
         statusSendAgain: false,
       }
       tempExhcanges.push(exchange);
    
      }
    for(var j=0;j<askToAnswerChanges.length;j++) {
      var todayTime3 = new Date(askToAnswerChanges[i].newDate.date);
      var month3 = todayTime3.getMonth() + 1;
      var currentMomth = new Date().getMonth();
      if(currentMomth == todayTime3.getMonth() ) {
        indexMonth = 0;  
      } else {
        indexMonth = 1;
      }
  
      var day3 = todayTime3.getDate();
      var year3 = todayTime3.getFullYear();
      var formattedDate3 = day3 + "/" + month3 + "/" + year3;
      var dayofweek3 = todayTime3.getDay();
      var dayHe3 = 0;
  
      switch (dayofweek3) {
        case 0:
          dayHe3 = "ראשון";
          break;
        case 1:
          dayHe3 = "שני";
          break;
        case 2:
          dayHe3 = "שלישי";
          break;
        case 3:
          dayHe3 = "רביעי";
          break;
        case 4:
          dayHe3 = "חמישי";
          break;
        case 5:
          dayHe3= "שישי";
          break;
        case 6:
          dayHe3 = "שבת";
          break;
        default:
          break;
      }
      var todayTime2 = new Date(askToAnswerChanges[i].oldDate.date);
      var month2 = todayTime2.getMonth() + 1;
      var day2 = todayTime2.getDate();
      var year2 = todayTime2.getFullYear();
      var formattedDate2 = day2 + "/" + month2 + "/" + year2;
      
     var exchange = {
       mainly: "friend",
       myDateFormat: formattedDate3,
       myDay: dayHe3,
       friendName: askToAnswerChanges[i].oldDate.name,
       friendDateForamt: formattedDate2,
       status: askToAnswerChanges[i].status,
       month:month2 - 1,
       friendMessage:askToAnswerChanges[i].oldMessage,
       myMessage: askToAnswerChanges[i].newMessage,
       managerMessage: askToAnswerChanges[i].managerMessage,
       id: askToAnswerChanges[i]._id,
       statusSendAgain: false,
     }
     tempExhcanges.push(exchange);

    }

      console.log("finish compontnneexprops" , tempExhcanges);
      this.setState({exchanges:tempExhcanges});

}



renderDialog(status,item) {
 // var status = item.status;
  console.log("DDDDD" , status);
  this.setState({open:true,currentItem:item,dialogStatus:status});  
}


renderTableData() {
  console.log("renderAnserr",this.state.exchanges);

    var arrRender = [];
    var monthToday = new Date().getMonth();
    const { classes } = this.props;

    if(this.state.exchanges != null) {
    for (var i = 0; i < this.state.exchanges.length; i++) {
        var month = this.state.exchanges[i].month;
      ///  console.log("not show",this.state.exchanges[i].notShow);
        if(this.state.exchanges[i].notShow != true) {
        if((this.props.tabValue==0 && (month == monthToday)) || (this.props.tabValue==1 && (month == monthToday+1)) )  {
          var obi = {
            obiData: (
              <AnswerItem item={this.state.exchanges[i]} fatherOpenDialog={this.renderDialog}  />
           )
          };
          arrRender.push(obi.obiData);
        }

}
    }
    }
return arrRender;
}

render() {
    return (
        <Table id="table-style"> 
                  <TableHead>
                  <TableRow key={shortid.generate()} align="center">
                    <TableCell key={shortid.generate()} align="center">שמירות שלי</TableCell>
                    <TableCell key={shortid.generate()} align="center"> בקשות להחלפה שלי</TableCell>
                </TableRow>
                    <TableRow key={shortid.generate()} align="center">
                    <TableCell key={shortid.generate()}>
                    <Table><TableBody>
                    <TableRow key={shortid.generate()}>
                    <TableCell key={shortid.generate()} align="center">יוזם</TableCell>
                      <TableCell key={shortid.generate()} align="center">תאריך</TableCell>
                      <TableCell key={shortid.generate()} align="center">יום בשבוע</TableCell>
                      </TableRow>
                      </TableBody></Table>
                      </TableCell>
                      <TableCell>
                      <Table><TableBody>
                      <TableRow key={shortid.generate()}>
                      <TableCell key={shortid.generate()} align="center">בעל התורנות</TableCell>
                      <TableCell key={shortid.generate()} align="center">תאריך</TableCell>
                      <TableCell id="tablecelllheader" key={shortid.generate()} align="center">סטטוס מחליף/מנהל</TableCell>

                      </TableRow>
                      </TableBody></Table>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.renderTableData()}
                  </TableBody>
      {/* {this.renderDialogs()} */}
      {console.log("dailogStatus" , this.state.dialogStatus)}
      <DailogAnswer currentItem={this.state.currentItem} cancelRequest={this.cancelRequest}  open={this.state.open}  sendMessge={this.sendMessage} sendToManager={this.sendToManager}  handleClose={this.handleClose} dailogStatus={this.state.dialogStatus} />
      </Table>

    );
}

}

export default withStyles(styles)(AnswerChanges);
