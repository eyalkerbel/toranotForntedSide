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

export default class ShmirotChanges extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        fetch:false,
        arri: [],
        exchanges:[],
        fetchArray: []
    }
    this.approveChange = this.approveChange.bind(this);
    this.declineChange = this.declineChange.bind(this);
}

componentDidMount() {
    console.log("shmirotChnages");
    this.fetchData();
}

updateApprove(indexExchange,isApprove) {
    console.log("updateAnswer" , indexExchange)
    let datas = {
      index: this.state.arri[indexExchange],
      isAprrove: isApprove
    }

    fetch(CONFIG.API.APPROVEEXCHANGEUSER ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
     body: JSON.stringify(datas)
    }).then(data => data.json())
    .then(dat => this.updateParent(this.state))
    .catch(err => console.log("failed"));
    }

    declineChange(indexExchange) {
   var index = this.state.arri[indexExchange].index;
   var temp = this.state.fetchArray;
   temp[3].splice(index,1);
    console.log("fetchArray" , temp);

   this.props.updateParent(temp);
        

    var temp = [];
    this.state.arri[indexExchange]["doneDeal"] = false;
    var item = this.state.arri[indexExchange];
    for(var i=0;i<this.state.arri.length;i++) {
        if(indexExchange != i) {
            temp.push(this.state.arri[i]);
        }
    }
        this.setState({arri:temp,fetchArray:temp});
        var isApprove = false;
        this.updateApprove(indexExchange,isApprove);

}

approveChange(indexi,indexj,indexExchange) {
    var temp = [];
    this.state.arri[indexExchange]["doneDeal"] = true;
    var item = this.state.arri[indexExchange];
    for(var i=0;i<this.state.arri.length;i++) {
        if(item.myDate != this.state.arri[i].myDate || indexExchange == i) {
            temp.push(this.state.arri[i]);
        } else {
            var index = this.state.arri[i].index;
   var temps = this.state.fetchArray;
   temps[3].splice(index,1);
        }
    }
    var isApprove = true;
    this.props.updateParent(temps);

   this.setState({arri:temp});
   this.updateApprove(indexExchange,isApprove);
  }
getNameDay(date) {
    var todayDate = new Date(date);
     var dayofweek = todayDate.getDay();
    var dayHe;
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
            return dayHe;
}

  getFormatt(date,j) {
    //var changeDate = this.state.exchanges[j].oldDate;
    var todayTime = new Date(date);
    var month = todayTime.getMonth() + 1;
var day = todayTime.getDate();
var year = todayTime.getFullYear();
return  day + "/" + month + "/" + year;
  }

fetchData() {
    console.log("hola" , this.props);
    var tempFetch = this.props.fetchArray;
    var toranot = this.props.fetchArray[this.props.tabValue];
    var exchanges = this.props.fetchArray[3];
    var arri = [];
    var temp = [];
    var monthToday = new Date().getMonth();

    var getFormattedDatearri = [];
    for(var j=0;j<exchanges.length;j++) {
        var todayTime = new Date(exchanges[j].oldDate.date);
        var month = todayTime.getMonth();
        console.log("month" , monthToday , "," , (month) ,"index" ,  this.props.tabValue);

        if((this.props.tabValue==0 && (month == monthToday)) || (this.props.tabValue==1 && (month == monthToday+1)) )  {
            console.log("month" , monthToday , "," , (month) ,"index" ,  this.props.tabValue);
        if(exchanges[j].status == "asking") {
            var userDate = this.getFormatt(exchanges[j].oldDate.date);
            var myDate = this.getFormatt(exchanges[j].newDate.date);
            var dayHe = this.getNameDay(exchanges[j].newDate.date);
            var name = exchanges[j].oldDate.name;
            //  temps.push({changeDate:changeDate,formattedDate:formattedDateU,indexExchange:j})
            arri.push({month:month,userDate:userDate,myDate:myDate,dayHe:dayHe,name:name,doneDeal:undefined,newDate:exchanges[j].newDate,oldDate:exchanges[j].oldDate,index:j});;
            }
          }
        }

    console.log("arri" , arri);
          this.setState({arri:arri,exchanges:exchanges,fetchArray:tempFetch});
    }


 getFormattedDate() {
//     var jsoned = this.props.fetchArray;
//     //console.log("props" , this.props);
//     var arri = [];
//     var toranot = jsoned[this.props.tabValue];
//     var exchanges = jsoned[2];
//    // console.log("date", toranot , "," , exchanges, "," ,this.props.tabValue);
//     var getFormattedDatearri = [];
//     for (var i = 0; i < toranot.length; i++) {
//       var todayTime = new Date(toranot[i].date);
//       var month = todayTime.getMonth() + 1;
//       var day = todayTime.getDate();
//       var year = todayTime.getFullYear();
//       var formattedDate = day + "/" + month + "/" + year;
//       var dayofweek = todayTime.getDay();
//       var dayHe = 0;
//       switch (dayofweek) {
//         case 0:
//           dayHe = "ראשון";
//           break;
//         case 1:
//           dayHe = "שני";
//           break;
//         case 2:
//           dayHe = "שלישי";
//           break;
//         case 3:
//           dayHe = "רביעי";
//           break;
//         case 4:
//           dayHe = "חמישי";
//           break;
//         case 5:
//           dayHe = "שישי";
//           break;
//         case 6:
//           dayHe = "שבת";
//           break;
//         default:
//           break;
//       }
//       var TranslateType = 0;
//       if (toranot[i].toran === 0) {
//         switch (toranot[i].type) {
//           case 0:
//             TranslateType = "סמל תורן בפנים";
//             break;
//           case 1:
//             TranslateType = "קצין תורן בפנים";
//             break;
//           case 2:
//             TranslateType = "חייל חובה חוץ";
//             break;
//           case 3:
//             TranslateType = "נגד שער";
//             break;
//           case 4:
//             TranslateType = "ע' קצין תורן";
//             break;
//           case 5:
//             TranslateType = "קצין תורן";
//             break;
//           case 6:
//             TranslateType = "מפקד תורן";
//             break;
//           default:
//             break;
//         }

//       } else {
//         switch (toranot[i].type) {
//           case 0:
//             TranslateType = "עתודה של סמל תורן בפנים";
//             break;
//           case 1:
//             TranslateType = "עתודה של קצין תורן בפנים";
//             break;
//           case 2:
//             TranslateType = "עתודה של חייל חובה חוץ";
//             break;
//           case 3:
//             TranslateType = "עתודה של נגד שער";
//             break;
//           case 4:
//             TranslateType = "עתודה של ע' קצין תורן";
//             break;
//           case 5:
//             TranslateType = "עתודה של קצין תורן";
//             break;
//           case 6:
//             TranslateType = "עתודה של מפקד תורן";
//             break;
//           default:
//             break;
//         }
//       }
//       let requestDate = false;
//       var changeDate;
//       var obi;
//      // console.log("pop")
//       var temps = [];
//       for(var j=0;j<exchanges.length;j++) {
//         if(exchanges[j].newDate.id == toranot[i]._id) {
//           requestDate = true;
//           changeDate = exchanges[j].oldDate;
//        //   console.log("changeDate" , changeDate);
//           var todayTime = new Date(changeDate.date);
//           var month = todayTime.getMonth() + 1;
//       var day = todayTime.getDate();
//       var year = todayTime.getFullYear();
//       var formattedDateU = day + "/" + month + "/" + year;
//         temps.push({changeDate:changeDate,formattedDate:formattedDateU})
//       }
//     }
//    // console.log("temps" , temps);
//          obi = {
//             dayOfWeek: dayHe,
//            type: TranslateType,
//            formattedDate: formattedDate,
//            requestDate: false
//          };
//           if(requestDate == true) {
//               obi["exchangesArray"] = temps;
//               obi["requestDate"] = true;
//               obi["doneDeal"] = false;
//           }
        
//      //   console.log("obi" , obi);
//       arri.push(obi);
//          }
    
//    // console.log("arri" , arri);
//     this.setState({ arri: arri });
//     //this.setState({ fetched: true });
  }


    renderTableData() {
        console.log("renderingtable" ,this.state.arri , "tab" , this.props.tabValue);
        var arrRender = [];
        var monthToday = new Date().getMonth();
        for (var i = 0; i < this.state.arri.length; i++) {
            // var todayTime = new Date(this.state.arri[i].myDate);
             var month = this.state.arri[i].month;
            console.log("month" , monthToday , "," , (month) ,"index" ,  this.props.tabValue);
    
            if((this.props.tabValue==0 && (month == monthToday)) || (this.props.tabValue==1 && (month == monthToday+1)) )  {
                console.log("month" , monthToday , "," , (month) ,"index" ,  this.props.tabValue);
        //   if(this.state.arri[i].exchangesArray == undefined) {
        //     //  console.log("notgood");
        //     var obi = {
        //       obiData: (
        //         <TableRow key={shortid.generate()}>
        //           <TableCell key={shortid.generate()}>
        //           <Table><TableBody>
        //             <TableRow key={shortid.generate()}>
        //           <TableCell key={shortid.generate()} align="center">{this.state.arri[i].formattedDate}</TableCell>
        //             <TableCell key={shortid.generate()}  align="center">{this.state.arri[i].dayOfWeek}</TableCell>
        //             </TableRow>
        //             </TableBody></Table>
        //             </TableCell>
        //             <TableCell key={shortid.generate()}>
        //               <TableRow key={shortid.generate()}><TableCell key={shortid.generate()} align="center">בקרוב</TableCell></TableRow>
        //              </TableCell>
        //             </TableRow>)
        //     };
        //     arrRender.push(obi.obiData);
        //   }
          //console.log("exchangeArray" , this.state.arri[i].exchangesArray);
         // for(var j=0;j<this.state.arri[i].length;j++) {
            //  console.log("sakjassa");
          var obi = {
            obiData: (
              <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()}>
                <Table><TableBody>
                  <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()} align="center">{this.state.arri[i].myDate}</TableCell>
                  <TableCell id="tablepadding" key={shortid.generate()}  align="center">{this.state.arri[i].dayHe}
                  <ArrowBackIcon id="arrow-right" style={{fill:"red"}} /></TableCell>
                  </TableRow>
                  </TableBody></Table>
                  </TableCell>
                  <TableCell key={shortid.generate()}>
                  {/* {this.state.arri[i].hasChange == true?"coming soon" : <ExchangeItem doneDeal={this.state.arri[i].doneDeal} key={i} exchangeData={this.state.arri[i].exchangesArray[j]} approveChange={this.approveChange} indexArri={i} indexExchange={j} indexEch={this.state.arri[i].exchangesArray[j].indexExchange} />} */}
                   <ExchangeItem key={i} doneDeal={this.state.arri[i].doneDeal} exchangeData={this.state.arri[i]} declineChange={this.declineChange} approveChange={this.approveChange} index={i} />

                   </TableCell>
                  </TableRow>
            )
          };
          arrRender.push(obi.obiData);
        }
        }
      //  }
    
        return arrRender;
      }
    

render() {
    return (

        <Table> 
                  <TableHead>
                  <TableRow key={shortid.generate()} align="center">
                    <TableCell key={shortid.generate()} align="center">שמירות שלי</TableCell>
                    <TableCell key={shortid.generate()} align="center">בקשה להחלפה</TableCell>
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
                      <TableCell key={shortid.generate()} align="center">ביקש להחליף</TableCell>
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