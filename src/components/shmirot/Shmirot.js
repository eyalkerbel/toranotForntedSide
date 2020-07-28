import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LoadingPage from "../LoadingPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import CONFIG from "../../configs/env"
import ExchangeItem from "./ExchangeItem";
import shortid from 'shortid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TabCompShmirot from "../TabCompSmirot";
import ShmirotChanges from "./ShmirotChanges";
import MyShmirot from "./MyShmirot";
import AnswerChanges from "./AnswerChanges";
import { FORMERR } from "dns";
export default class Shmirot extends React.Component {
  constructor() {
    super();
    this.state = {
      tabvalue: 0,
      selectValue:0,
      fetched: false,
      arri: [],
      exchanges: [],
      blop: <LoadingPage />,
      fetchArray: []
    };
    this.handletabs = this.handletabs.bind(this);
    this.fetchyfetch = this.fetchyfetch.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.approveChange = this.approveChange.bind(this);
    this.getDataFromSon = this.getDataFromSon.bind(this);
  }



  updateAnswer(indexExchange) {
    console.log("updateAnswe" , indexExchange)
    let datas = {
      index: indexExchange
    }

    fetch(CONFIG.API.APPROVEEXCHANGEUSER ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
     body: JSON.stringify(datas)
    }).then(data => data.json())
    .then(dat => console.log("succseed"))
    .catch(err => console.log("failed"));
    }
  approveChange(indexi,indexj,tabvalue,indexExchange) {
    var temp = [];
    temp = this.state.arri[tabvalue];
    var items = [];
    var item = this.state.arri[tabvalue][indexi].exchangesArray[indexj];
     var newToranot = item;
     var oldToranot = this.state.arri[tabvalue][indexi];
    items.push(item);
    var DateToDelte = item.formattedDate;
    var temp = this.state.arri;
    for(var i=0;i<this.state.arri[tabvalue].length;i++) {
      temp[tabvalue][tabvalue][i] = this.state.arri[tabvalue][i];
      if(indexi == i) {
        temp[tabvalue][i].exchangesArray = items;
        temp[tabvalue][i].doneDeal = true;
      }
      
    }
    this.setState({arri:temp});
    this.updateAnswer(indexExchange);
  }


  renderTableData() {
    var arrRender = [];
    for (var i = 0; i < this.state.arri.length; i++) {
      if(this.state.arri[i].exchangesArray == undefined) {
        var obi = {
          obiData: (
            <TableRow key={shortid.generate()}>
              <TableCell key={shortid.generate()}>
              <Table><TableBody>
                <TableRow key={shortid.generate()}>
              <TableCell key={shortid.generate()} align="center">{this.state.arri[i].formattedDate}</TableCell>
                <TableCell key={shortid.generate()}  align="center">{this.state.arri[i].dayOfWeek}</TableCell>
                </TableRow>
                </TableBody></Table>
                </TableCell>
                <TableCell key={shortid.generate()}>
                  <TableRow key={shortid.generate()}><TableCell key={shortid.generate()} align="center">בקרוב</TableCell></TableRow>
                 </TableCell>
                </TableRow>)
        };
        arrRender.push(obi.obiData);
      }
      for(var j=0;j<this.state.arri[i].exchangesArray.length;j++) {
      var obi = {
        obiData: (
          <TableRow key={shortid.generate()}>
            <TableCell key={shortid.generate()}>
            <Table><TableBody>
              <TableRow key={shortid.generate()}>
            <TableCell key={shortid.generate()} align="center">{this.state.arri[i].formattedDate}</TableCell>
              <TableCell id="tablepadding" key={shortid.generate()}  align="center">{this.state.arri[i].dayOfWeek}
              <ArrowBackIcon id="arrow-right" style={{fill:"red"}} /></TableCell>
              </TableRow>
              </TableBody></Table>
              </TableCell>
              <TableCell key={shortid.generate()}>
              {this.state.arri[i].hasChange == true?"coming soon" : <ExchangeItem doneDeal={this.state.arri[i].doneDeal} key={i} exchangeData={this.state.arri[i].exchangesArray[j]} approveChange={this.approveChange} indexArri={i} indexExchange={j} />}
               </TableCell>
              </TableRow>
        )
      };
      arrRender.push(obi.obiData);
    }
    }

    return arrRender;
  }

  handletabs(num) {
    this.setState({ tabvalue: num });
  }

 

  fetchyfetch(num) {
   
    fetch(CONFIG.API.GETEXCHANGESANDTORANOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }).then(data => data.json())
      .then(jsoned => this.fetchData(jsoned))
      .catch(err => {
        this.setState({ fetched: true });
      });
  }
fetchData(jsoned) {
  // console.log("fetchData",jsoned[2]);
  // var exchanges = jsoned[3];
  // var mineExchanges = jsoned[2];
  // var tempFinal = [];
  // var arri = [];
  // var getFormattedDatearri = [];
  // var tempExhcanges = [[]];
  // var indexMonth;
  // for(var i=0; i<mineExchanges.length;i++) {
  //   var todayTime3 = new Date(mineExchanges[i].oldDate.date);
  //   var month3 = todayTime3.getMonth() + 1;
  //   var currentMomth = new Date().getMonth();
  //   if(currentMomth == todayTime3.getMonth() ) {
  //     indexMonth = 0;  
  //   } else {
  //     indexMonth = 1;
  //   }

  //   var day3 = todayTime3.getDate();
  //   var year3 = todayTime3.getFullYear();
  //   var formattedDate3 = day3 + "/" + month3 + "/" + year3;
  //   var dayofweek3 = todayTime3.getDay();
  //   var dayHe3 = 0;

  //   switch (dayofweek3) {
  //     case 0:
  //       dayHe3 = "ראשון";
  //       break;
  //     case 1:
  //       dayHe3 = "שני";
  //       break;
  //     case 2:
  //       dayHe3 = "שלישי";
  //       break;
  //     case 3:
  //       dayHe3 = "רביעי";
  //       break;
  //     case 4:
  //       dayHe3 = "חמישי";
  //       break;
  //     case 5:
  //       dayHe3= "שישי";
  //       break;
  //     case 6:
  //       dayHe3 = "שבת";
  //       break;
  //     default:
  //       break;
  //   }
  //   var todayTime2 = new Date(mineExchanges[i].newDate.date);
  //   var month2 = todayTime2.getMonth() + 1;
  //   var day2 = todayTime2.getDate();
  //   var year2 = todayTime2.getFullYear();
  //   var formattedDate2 = day2 + "/" + month2 + "/" + year2;

  //  var exchange = {
  //    oldDateFormat: formattedDate3,
  //    dayHe: dayHe3,
  //    name: mineExchanges[i].newDate.name,
  //    newDateForamt: formattedDate2,
  //    status: mineExchanges[i].status
  //  }
  //  tempExhcanges[indexMonth].push(exchange);

  // }

// console.log("foo");
//   for(var k=0;k<2;k++) {
//  var toranot = jsoned[k];
//   arri = [];
//   var getFormattedDatearri = [];
//   for (var i = 0; i < toranot.length; i++) {
//     var todayTime = new Date(toranot[i].date);
//     var month = todayTime.getMonth() + 1;
//     var day = todayTime.getDate();
//     var year = todayTime.getFullYear();
//     var formattedDate = day + "/" + month + "/" + year;
//     var dayofweek = todayTime.getDay();
//     var dayHe = 0;
//     switch (dayofweek) {
//       case 0:
//         dayHe = "ראשון";
//         break;
//       case 1:
//         dayHe = "שני";
//         break;
//       case 2:
//         dayHe = "שלישי";
//         break;
//       case 3:
//         dayHe = "רביעי";
//         break;
//       case 4:
//         dayHe = "חמישי";
//         break;
//       case 5:
//         dayHe = "שישי";
//         break;
//       case 6:
//         dayHe = "שבת";
//         break;
//       default:
//         break;
//     }
//     var TranslateType = 0;
//     if (toranot[i].toran === 0) {
//       switch (toranot[i].type) {
//         case 0:
//           TranslateType = "סמל תורן בפנים";
//           break;
//         case 1:
//           TranslateType = "קצין תורן בפנים";
//           break;
//         case 2:
//           TranslateType = "חייל חובה חוץ";
//           break;
//         case 3:
//           TranslateType = "נגד שער";
//           break;
//         case 4:
//           TranslateType = "ע' קצין תורן";
//           break;
//         case 5:
//           TranslateType = "קצין תורן";
//           break;
//         case 6:
//           TranslateType = "מפקד תורן";
//           break;
//         default:
//           break;
//       }

//     } else {
//       switch (toranot[i].type) {
//         case 0:
//           TranslateType = "עתודה של סמל תורן בפנים";
//           break;
//         case 1:
//           TranslateType = "עתודה של קצין תורן בפנים";
//           break;
//         case 2:
//           TranslateType = "עתודה של חייל חובה חוץ";
//           break;
//         case 3:
//           TranslateType = "עתודה של נגד שער";
//           break;
//         case 4:
//           TranslateType = "עתודה של ע' קצין תורן";
//           break;
//         case 5:
//           TranslateType = "עתודה של קצין תורן";
//           break;
//         case 6:
//           TranslateType = "עתודה של מפקד תורן";
//           break;
//         default:
//           break;
//       }
//     }
//     let requestDate = false;
//     var changeDate;
//     var obi;
//     var temps = [];
//     for(var j=0;j<exchanges.length;j++) {
//       if(exchanges[j].newDate.id == toranot[i]._id) {
//         requestDate = true;
//         changeDate = exchanges[j].oldDate;
//         var todayTime = new Date(changeDate.date);
//         var month = todayTime.getMonth() + 1;
//     var day = todayTime.getDate();
//     var year = todayTime.getFullYear();
//     var formattedDateU = day + "/" + month + "/" + year;
//       temps.push({changeDate:changeDate,formattedDate:formattedDateU,indexExchange:j})
//     }
//   }
//        obi = {
//           dayOfWeek: dayHe,
//          type: TranslateType,
//          formattedDate: formattedDate,
//          requestDate: false
//        };
//         if(requestDate == true) {
//             obi["exchangesArray"] = temps;
//             obi["requestDate"] = true;
//             obi["doneDeal"] = false;
//         }
      
//     arri.push(obi);

       
//       }
// tempFinal[k] = arri;
// }
//this.setState({arri:tempFinal,exchanges:tempExhcanges,fetched:true,fetchArray:jsoned});
this.setState({fetchArray:jsoned,fetched:true});
}

  fetchyfetch3 = num => {
    if (num === 1) {
      this.setState({
        fetched: false,
        blop: (
          <Paper className="maincontainer">
            <div className="header-container">
              <h1 className="header">שמירות שלי</h1>
              <div className="divider" />
            </div>
            <div>
              <Paper
                style={{
                  backgroundColor: "white",
                  marginTop: "",
                  overflow: "hidden"
                }}
              >
                <TabCompShmirot bubbleTabs={this.handletabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabvalue} selectValue={this.state.selectValue} />

                <Table>
                  <TableHead>
                    <TableRow align="center">
                      <TableCell align="center">סוג תורנות</TableCell>
                      <TableCell align="center">תאריך</TableCell>
                      <TableCell align="center">יום בשבוע</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <div align="center">
                      <CircularProgress size={40} align="center" />
                    </div>
                  </TableBody>
                </Table>
              </Paper>
            </div>
          </Paper>
        )
      });
    }

    fetch(CONFIG.API.GETNEXTMONTHSTORANUTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(data => data.json())
      .then(jsoned => this.getFormattedDate(jsoned))
      .catch(err => {
        this.setState({ fetched: true });
      });
  };

  componentWillMount() {
    if(this.state.fetched == false) {
    this.fetchyfetch();
    }
  }
  bubbleSelect = (num) => {
    this.setState({ selectValue: num })
}
getDataFromSon(fetchArray2) {
  console.log("fetcharray2" , fetchArray2);
  this.setState({fetchArray:fetchArray2});
}

  renderByValue() {
    {console.log("tabii" , this.state.tabvalue)}
    switch(this.state.selectValue) {
      case 0:
        return(<MyShmirot arri={this.state.fetchArray[this.state.tabvalue]} tabValue={this.state.tabvalue} />);

      case 1:
           return(<ShmirotChanges updateParent={this.getDataFromSon} approveChange={this.approveChange} fetchArray={this.state.fetchArray} tabValue={this.state.tabvalue} />);

      case 2:
            return (<AnswerChanges fetchArray={this.state.fetchArray} tabValue={this.state.tabvalue} />);
      default:
            return(<MyShmirot arri={this.state.fetchArray[this.state.tabvalue]} tabValue={this.state.tabvalue} />);
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.fetched ==true ? (
          <Paper className="maincontainer">
            <div className="header-container">
              <h1 className="header">שמירות שלי</h1>
              <div className="divider" />
            </div>
                <div>
                <TabCompShmirot bubbleTabs={this.handletabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabvalue} selectValue={this.state.selectValue} />
                </div>
                <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
        {this.renderByValue()}             
                            </div>

                
              {/* </Paper>
            </div> */}
          </Paper>
        ) : (
            <LoadingPage />
          )}
      </Fragment>
    );
  }
}
