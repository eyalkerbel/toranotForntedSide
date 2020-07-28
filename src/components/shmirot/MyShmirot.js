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

export default class MyShmirot extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        fetch:false,
        arri: []
    }
}

componentWillMount() {
    console.log("component did mount" , this.props.tabValue);
    this.getFormattedDate();
}

getFormattedDate() {
    var obi;
    var temp = [];
    var toranot = this.props.arri;
    for (var i = 0; i < toranot.length; i++) {
        var todayTime = new Date(toranot[i].date);
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        var formattedDate = day + "/" + month + "/" + year;
        var dayofweek = todayTime.getDay();
        var dayHe = 0;
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
          switch (toranot[i].type) {
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
          switch (toranot[i].type) {
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

        obi = {
            dayOfWeek: dayHe,
           type: TranslateType,
           formattedDate: formattedDate,
         };
         temp.push(obi);

        }
        this.setState({arri:temp});
}





    renderTableData() {
        var arrRender = [];
        console.log("props" , this.props);
        for (var i = 0; i < this.props.arri.length; i++) {
            var obi = {
              obiData: (
                    <TableRow key={shortid.generate()}> 
                  <TableCell key={shortid.generate()} align="center">{this.state.arri[i].formattedDate}</TableCell>
                    <TableCell key={shortid.generate()}  align="center">{this.state.arri[i].dayOfWeek}</TableCell>
                    <TableCell key={shortid.generate()}  align="center">{this.state.arri[i].type}</TableCell>

                    </TableRow>)
                  
            };
            arrRender.push(obi.obiData);
          }
          return arrRender;
        }
    
      
    

render() {
    return (

        <Table> 
                  <TableHead>
                  <TableRow key={shortid.generate()} align="center">
                    <TableCell key={shortid.generate()} align="center">תאריך</TableCell>
                    <TableCell key={shortid.generate()} align="center">יום בשבוע</TableCell>
                    <TableCell key={shortid.generate()} align="center">סוג תורונות</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.renderTableData()}</TableBody>
                </Table>
    );
}

}