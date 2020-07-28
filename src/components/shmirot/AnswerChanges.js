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


export default class AnswerChanges extends React.Component {
   constructor(props) {
       super(props);

   this.state = {
       arri: [],
       exchanges: []
   }
}
componentDidMount() {
    this.fetchData();
}
fetchData() {
    var getFormattedDatearri = [];
    var tempExhcanges = [];
    var indexMonth;
    var mineExchanges = this.props.fetchArray[2];
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
         oldDateFormat: formattedDate3,
         dayHe: dayHe3,
         name: mineExchanges[i].newDate.name,
         newDateForamt: formattedDate2,
         status: mineExchanges[i].status,
         month:month2 - 1
       }
       tempExhcanges.push(exchange);
    
      }
      this.setState({exchanges:tempExhcanges})
}

renderTableData() {
    var arrRender = [];
    var monthToday = new Date().getMonth();
    
    if(this.state.exchanges != null) {
    for (var i = 0; i < this.state.exchanges.length; i++) {
        var month = this.state.exchanges[i].month;
        if((this.props.tabValue==0 && (month == monthToday)) || (this.props.tabValue==1 && (month == monthToday+1)) )  {
          var obi = {
            obiData: (
              <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()}>
                <Table><TableBody>
                  <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()} align="center">{this.state.exchanges[i].oldDateFormat}</TableCell>
                  <TableCell key={shortid.generate()}  align="center">{this.state.exchanges[i].dayHe}</TableCell>
                  </TableRow>
                  </TableBody></Table>
                  </TableCell>
                  <TableCell key={shortid.generate()}>
                    <TableRow key={shortid.generate()}>
                    <TableCell key={shortid.generate()} align="center">{this.state.exchanges[i].name}</TableCell>
                    <TableCell key={shortid.generate()} align="center">{this.state.exchanges[i].newDateForamt}</TableCell>
                    <TableCell key={shortid.generate()} align="center">{this.state.exchanges[i].status}</TableCell>

                    </TableRow>
                   </TableCell>
                  </TableRow>)
          };
          arrRender.push(obi.obiData);
        }
}
    }
return arrRender;
}

render() {
    return (
        <Table> 
                  <TableHead>
                  <TableRow key={shortid.generate()} align="center">
                    <TableCell key={shortid.generate()} align="center">שמירות שלי</TableCell>
                    <TableCell key={shortid.generate()} align="center"> בקשות להחלפה שלי</TableCell>
                </TableRow>
                    <TableRow key={shortid.generate()} align="center">
                    <TableCell key={shortid.generate()}>
                    <Table><TableBody>
                    <TableRow key={shortid.generate()}>
                      <TableCell key={shortid.generate()} align="center">תאריך</TableCell>
                      <TableCell key={shortid.generate()} align="center">יום בשבוע</TableCell>
                      </TableRow>
                      </TableBody></Table>
                      </TableCell>
                      <TableCell>
                      <Table><TableBody>
                      <TableRow key={shortid.generate()}>
                      <TableCell key={shortid.generate()} align="center">בעל התורונת</TableCell>
                      <TableCell key={shortid.generate()} align="center">תאריך</TableCell>
                      <TableCell key={shortid.generate()} align="center">סטטוס</TableCell>
                      </TableRow>
                      </TableBody></Table>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.renderTableData()}</TableBody>
                </Table>
    );
}

}

