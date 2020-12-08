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
import DialogRequest from "./DailogRequest";
// import getMessage from "../../../../toranotServerSide/modules/getMessage";
export default class ShmirotChanges extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        fetch:false,
        arri: [],
        exchanges:[],
        fetchArray: [],
        open:false,
        message: null,
        ifCurrentAgree: null,
        currentIndex: null,
        exchangeData: null
    }
    this.getMessage = this.getMessage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.approveChange = this.approveChange.bind(this);
    this.declineChange = this.declineChange.bind(this);
    this.openDialog = this.openDialog.bind(this);
}

componentDidMount() {
    console.log("shmirotChnages");
    this.goToDB();
    this.fetchData();
}
goToDB() {
  fetch(CONFIG.API.DELETENOTIFICATION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("jwt")
    },
   body: JSON.stringify({indexDeleting: 1})
  });
}

handleClose(){
  this.setState({open:false,message:null,ifCurrentAgree: null,currentIndex: null,exchangeData:null});
  }
  openDialog(agree,index,exchangeData) {
    this.setState({open:true,ifCurrentAgree:agree,currentIndex:index,exchangeData:exchangeData});
  }


  getMessage(message) {
  console.log("message" , message);
    this.setState({message:message});
      if(this.state.ifCurrentAgree == true) {
        this.approveChange(this.state.currentIndex,message);
      } else {
        this.declineChange(this.state.currentIndex,message);
      }
  }


  updateApprove(indexExchange,isApprove,newMessage) {
    console.log("updateAnswer" , indexExchange , "cis" , isApprove)
    let datas = {
      index: this.state.arri[indexExchange],
      isApprove: isApprove,
      newMessage: newMessage
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
    this.setState({exchangeData:null});

    }

    declineChange(indexExchange,newMessage) {

   var index = this.state.arri[indexExchange].index;
   console.log("indexDeline" , indexExchange,  this.props.fetchArray);
   var temp = this.props.fetchArray;
   if(temp[3].length == 1) {
     temp[3] = [];
   } else {
   temp[3].splice(index,1);
   }
  //temp[3].splice(indexExchange,1);
    console.log("afterDecline" , temp);

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
        this.updateApprove(indexExchange,isApprove,newMessage);

}

approveChange(indexExchange,newMessage) {
    var temp = [];
    this.state.arri[indexExchange]["doneDeal"] = true;
    var item = this.state.arri[indexExchange];
    var index;
    var temps;
    temps = this.state.fetchArray;
    index = this.state.arri[indexExchange].index;
    // console.log("index" , index);
    // console.log("change" , temps[3])
    temps[3][index]["doneDeal"] = "yes";
    item["status"] = "agree";
    item["myMessage"] = newMessage;
    temps[4].push(item);
    console.log("itemr",item , "arri" , this.state.arri, "indexEx" , indexExchange);
    for(var i=0;i<this.state.arri.length;i++) {
        // if(item.myDate != this.state.arri[i].myDate || indexExchange == i) {
        //     temp.push(this.state.arri[i]);
        // } else {
        //      index = this.state.arri[i].index;
        //    temps[3][index] = null;
        // }
        if(item.myDate == this.state.arri[i].myDate && indexExchange != i) { // responisble delete all same date
          index = this.state.arri[i].index;
          temps[3][index] = null;
        } else {
          temp.push(this.state.arri[i]);
        }
            
      }
     


    console.log("temps" , temps[3]);
    var temps2 = [];
    var counter = 0;
    for(var i=0;i<temps[3].length;i++) {
        if(temps[3][i] != null) {
        temps2[counter] = temps[3][i];
        counter++;
        }
    }
    console.log("temps2" , temps2);
    temps[3] = temps2;
    
    var isApprove = true;
    console.log("temps2" , temps);
    this.props.updateParent(temps);

   this.setState({arri:temp});
   this.updateApprove(indexExchange,isApprove,newMessage);
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
    console.log("hola" , this.props.fetchArray[3]);
    var tempFetch = this.props.fetchArray;
    var toranot = this.props.fetchArray[this.props.tabValue];
    var exchanges = this.props.fetchArray[3];
    console.log("requesst" , exchanges);
    var arri = [];
    var temp = [];
    var monthToday = new Date().getMonth();
    var getFormattedDatearri = [];
    for(var j=0;j<exchanges.length;j++) {
        var doneDeal = undefined;
        var todayTime = new Date(exchanges[j].toranotOld.date);
        var month = todayTime.getMonth();
        console.log("month" , monthToday , "," , (month) ,"index" ,  this.props.tabValue);
        if(exchanges[j].doneDeal == "yes"){
            doneDeal = true;
        }
        // if((this.props.tabValue==0 && (month == monthToday)) || (this.props.tabValue==1 && (month == monthToday+1)) )  { //todo
            // console.log("month" , monthToday , "," , (month) ,"index" ,  this.props.tabValue);
        if(exchanges[j].status == "asking") {
            var userDate = this.getFormatt(exchanges[j].toranotOld.date);
            var myDate = this.getFormatt(exchanges[j].toranotNew.date);
            var dayHe = this.getNameDay(exchanges[j].toranotNew.date);
            console.log("oooos",exchanges[j].toranotOld.userDetails);
            var name = exchanges[j].toranotOld.userDetails.name;
            // console.log("oldmessage" , exchanges[j].oldMessage);
            //  temps.push({changeDate:changeDate,formattedDate:formattedDateU,indexExchange:j})
            arri.push({_id:exchanges[j]._id,month:month,userDate:userDate,myDate:myDate,dayHe:dayHe,name:name,doneDeal:doneDeal,toranotNew:exchanges[j].toranotNew,toranotOld:exchanges[j].toranotOld,index:j,oldMessage:exchanges[j].oldMessage});;
            }
          }
       // } // todo

   // console.log("arri" , arri);
          this.setState({arri:arri,exchanges:exchanges,fetchArray:tempFetch});
    }

    renderTableData() {
        console.log("renderingtable" ,this.state.arri , "tab" , this.props.tabValue);
        var arrRender = [];
        var monthToday = new Date().getMonth();
        for (var i = 0; i < this.state.arri.length; i++) {
            // var todayTime = new Date(this.state.arri[i].myDate);
             var month = this.state.arri[i].month;

            if((this.props.tabValue==0 && (month == monthToday)) || (this.props.tabValue==1 && (month == monthToday+1)) )  {
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
                   <ExchangeItem  key={i} doneDeal={this.state.arri[i].doneDeal} exchangeData={this.state.arri[i]} declineChange={this.declineChange} approveChange={this.approveChange} index={i} madeADecision={this.openDialog} />

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
                    <TableCell key={shortid.generate()} align="center">תורניות שלי</TableCell>
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
                      <TableCell key={shortid.generate()} align="center">התאריך שלו</TableCell>
                      <TableCell key={shortid.generate()} align="center">החלטה</TableCell>

                      </TableRow>
                      </TableBody></Table>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.renderTableData()}</TableBody>
                  <DialogRequest exchangeData={this.state.exchangeData} handleClose={this.handleClose} sendMessage={this.getMessage} open={this.state.open} />
                </Table>
    );
}

}