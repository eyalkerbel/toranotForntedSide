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
import { Button } from "@material-ui/core";
import MyShmirotItem from "./MyShmirotItem";
export default class MyShmirot extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        fetch:false,
        arri: [],
        arriFullDetails: []
      
    }
    this.getFromSonClick = this.getFromSonClick.bind(this);
  //  this.getFormattedDateForThisMonth = this.getFormattedDateForThisMonth.bind(this);
}

componentDidMount() {
    console.log("component did mount" , this.props.tabValue);
    this.getFormattedDateForThisMonth();
    this.getFormattedDateForNextMonth();
    this.goToDB();
}
goToDB() {
  fetch(CONFIG.API.DELETENOTIFICATION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("jwt")
    },
   body: JSON.stringify({indexDeleting: 0})
  });
}
sendDataToServer() {
  var temp = [];
  var month = this.props.tabValue;
  var obi;
  console.log("arrifullDetails" , this.state.arriFullDetails);
  for(var i=0;i<this.state.arriFullDetails[this.props.tabValue].length;i++) {
    if(this.state.arriFullDetails[this.props.tabValue][i].changed != undefined) {
      console.log("arrifullDetailsItem" , this.state.arriFullDetails[i]);
      obi = {
        id: this.state.arriFullDetails[this.props.tabValue][i]._id,
        status: this.state.arriFullDetails[this.props.tabValue][i].userStatus
      }
      temp.push(obi);
    }
  }
  console.log("tempi " , temp)
  fetch(CONFIG.API.SENDSTATUSSHMIROT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("jwt")
    },
   body: JSON.stringify({temp,month})
  });
}
getFormattedDateForNextMonth() {
  var obi;
    var temp = this.state.arri;
    console.log("t" , this.props.arri);
    var toranot = this.props.arri[1];
    console.log("toranot" , toranot);
    for (var i = 0; i < toranot.length; i++) {
        var todayTime = new Date(toranot[i].date);
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        var formattedDate = day + "/" + month + "/" + year;
        var dayofweek = todayTime.getDay();
        var dayHe = 0;
        var values = 10;
        switch (dayofweek) {
          case 0:
            dayHe = "ראשון";
            break;
          case 1:
            dayHe = "שני";
            break;
          case 2:
            dayHe = "שלישי";
            break;
          case 3:
            dayHe = "רביעי";
            break;
          case 4:
            dayHe = "חמישי";
            break;
          case 5:
            dayHe = "שישי";
            break;
          case 6:
            dayHe = "שבת";
            break;
          default:
            break;
        }
        var TranslateType = 0;
        if (toranot[i].toran === 0) {
          console.log("toranotp" ,toranot[i].userDetails.type);
          switch (toranot[i].userDetails.type) {
            case 0:
              TranslateType = "סמל תורן בפנים";
              break;
            case 1:
              TranslateType = "קצין תורן בפנים";
              break;
            case 2:
              TranslateType = "חייל חובה חוץ";
              break;
            case 3:
              TranslateType = "נגד שער";
              break;
            case 4:
              TranslateType = "ע' קצין תורן";
              break;
            case 5:
              TranslateType = "קצין תורן";
              break;
            case 6:
              TranslateType = "מפקד תורן";
              break;
            default:
              break;
          }
    
        } else {
          switch (toranot[i].userDetails.type) {
            case 0:
              TranslateType = "עתודה של סמל תורן בפנים";
              break;
            case 1:
              TranslateType = "עתודה של קצין תורן בפנים";
              break;
            case 2:
              TranslateType = "עתודה של חייל חובה חוץ";
              break;
            case 3:
              TranslateType = "עתודה של נגד שער";
              break;
            case 4:
              TranslateType = "עתודה של ע' קצין תורן";
              break;
            case 5:
              TranslateType = "עתודה של קצין תורן";
              break;
            case 6:
              TranslateType = "עתודה של מפקד תורן";
              break;
            default:
              break;
          }
        }
        console.log("arri this",TranslateType);
        // if(this.state.arri[i] != undefined) {
         //  console.log("sta" , this.state.arri[i].userStatus);
      //   switch(toranot[i].userStatus) {
      //     case "nothappy":
      //         values=20;
      //         break;
      //     case "happy":
      //         values=30;
      //         break;
      //     default:
      //         values=10;
      //         break;
      //   }
      // // }
        obi = {
           dayOfWeek: dayHe,
           type: TranslateType,
           formattedDate: formattedDate,
           userStatus:toranot[i].userStatus,
           month:month
         };
         temp.push(obi);

        }
        console.log("temp" , temp);
        this.setState({arri:temp});



}
getFormattedDateForThisMonth() {
    var obi;
    var temp = this.state.arri;
    console.log("t" , this.props.arri);
    var toranot = this.props.arri[0];
    console.log("toranot" , toranot);
    for (var i = 0; i < toranot.length; i++) {
        var todayTime = new Date(toranot[i].date);
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        var formattedDate = day + "/" + month + "/" + year;
        var dayofweek = todayTime.getDay();
        var dayHe = 0;
        var values = 10;
        switch (dayofweek) {
          case 0:
            dayHe = "ראשון";
            break;
          case 1:
            dayHe = "שני";
            break;
          case 2:
            dayHe = "שלישי";
            break;
          case 3:
            dayHe = "רביעי";
            break;
          case 4:
            dayHe = "חמישי";
            break;
          case 5:
            dayHe = "שישי";
            break;
          case 6:
            dayHe = "שבת";
            break;
          default:
            break;
        }
        var TranslateType = 0;
        if (toranot[i].toran === 0) {
          console.log("toranotp" ,toranot[i].userDetails.type);
          switch (toranot[i].userDetails.type) {
            case 0:
              TranslateType = "סמל תורן בפנים";
              break;
            case 1:
              TranslateType = "קצין תורן בפנים";
              break;
            case 2:
              TranslateType = "חייל חובה חוץ";
              break;
            case 3:
              TranslateType = "נגד שער";
              break;
            case 4:
              TranslateType = "ע' קצין תורן";
              break;
            case 5:
              TranslateType = "קצין תורן";
              break;
            case 6:
              TranslateType = "מפקד תורן";
              break;
            default:
              break;
          }
    
        } else {
          switch (toranot[i].userDetails.type) {
            case 0:
              TranslateType = "עתודה של סמל תורן בפנים";
              break;
            case 1:
              TranslateType = "עתודה של קצין תורן בפנים";
              break;
            case 2:
              TranslateType = "עתודה של חייל חובה חוץ";
              break;
            case 3:
              TranslateType = "עתודה של נגד שער";
              break;
            case 4:
              TranslateType = "עתודה של ע' קצין תורן";
              break;
            case 5:
              TranslateType = "עתודה של קצין תורן";
              break;
            case 6:
              TranslateType = "עתודה של מפקד תורן";
              break;
            default:
              break;
          }
        }
        console.log("arri this",TranslateType);
        // if(this.state.arri[i] != undefined) {
         //  console.log("sta" , this.state.arri[i].userStatus);
      //   switch(toranot[i].userStatus) {
      //     case "nothappy":
      //         values=20;
      //         break;
      //     case "happy":
      //         values=30;
      //         break;
      //     default:
      //         values=10;
      //         break;
      //   }
      // // }
        obi = {
           dayOfWeek: dayHe,
           type: TranslateType,
           formattedDate: formattedDate,
           userStatus:toranot[i].userStatus,
           month:month
         };
         temp.push(obi);

        }
        console.log("temp" , temp);
        this.setState({arri:temp});
}

getFromSonClick(index,num,indexAll) {
  var temp = this.state.arri;
  var tempFullDetails = [];
  for(var i=0;i<this.props.arri.length;i++) {
   tempFullDetails[i] = this.props.arri[i];
  }
   console.log("tempfullbefore" , tempFullDetails , "tab" , this.props.tabValue , "index" , index);
  if(num == 10) {
    temp[indexAll]["userStatus"] = "unknown";
    tempFullDetails[this.props.tabValue][index]["userStatus"] = "unknown";
    tempFullDetails[this.props.tabValue][index]["changed"] = true;

  } else if(num == 20) {
    temp[indexAll]["userStatus"] = "nothappy";
    tempFullDetails[this.props.tabValue][index]["userStatus"] = "nothappy";
    tempFullDetails[this.props.tabValue][index]["changed"] = true;

  } else {
    temp[indexAll]["userStatus"] = "happy";
    tempFullDetails[this.props.tabValue][index]["userStatus"] = "happy";
    tempFullDetails[this.props.tabValue][index]["changed"] = true;
  }
  // console.log("toranot" , temp[index] , tempFullDetails);
  console.log("tempFullDetails", tempFullDetails)
  this.setState({arri:temp,arriFullDetails:tempFullDetails});

}



    renderTableData() {
      console.log("renderTableDataSmirot");


      var obi;
      var temp = [];
      var arrRender = [];
      var monthToday = new Date().getMonth()+1;
      //   console.log("props" , this.props);
      var j=0;
        for (var i = 0; i <this.state.arri.length; i++) {
          console.log("arrinew" , this.state.arri);
          var month = this.state.arri[i].month;
          console.log("date -" , month , " monthToday" , monthToday);
          if((this.props.tabValue==0 && (month == monthToday)) || (this.props.tabValue==1 && (month == monthToday+1)) )  {
            var obi = {
              obiData: (
                  <MyShmirotItem key={shortid.generate()} index={j} indexAll={i} item={this.state.arri[i]} updateParnetClick={this.getFromSonClick} />)            
            };
            arrRender.push(obi.obiData);
            j++;

          }
        }
        console.log("arrRender" ,arrRender);
          return arrRender;
        }
    
 
  
    
  render() {
    console.log("rendershmirot");
      return (

        <Table> 
                  <TableHead>
                  <TableRow key={shortid.generate()} align="center">
                    <TableCell key={shortid.generate()} align="center">תאריך</TableCell>
                    <TableCell key={shortid.generate()} align="center">יום בשבוע</TableCell>
                    <TableCell key={shortid.generate()} align="center">סוג תורונות</TableCell>
                    <TableCell key={shortid.generate()} align="center">סטטוס תורנות</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>{this.renderTableData()}</TableBody>
                  <Button
                                variant="contained"
                                onClick={() => this.sendDataToServer()}
                            >
                                שמור
              </Button>
                </Table>
              

    );
}

}