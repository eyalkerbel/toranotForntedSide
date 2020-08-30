import React, {Fragment}  from "react";
import shortid from 'shortid';
import Paper from "@material-ui/core/Paper";
import CONFIG from "../../configs/env"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LoadingPage from "../LoadingPage";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';


export default class ItemApprove extends React.Component {
    constructor(props) {
        super(props);
    
    this.state = {
       
    };
    this.getNameDay = this.getNameDay.bind(this);
    this.approveChange = this.approveChange.bind(this);
    this.declineChange = this.declineChange.bind(this);
    this.handleOpenMail = this.handleOpenMail.bind(this);
    }


    renderIcons() {
      switch(undefined) {
          case true:
              return(<TableCell id="tablepadding" align="center" ><CheckCircleIcon  fontSize="smaller" style={{fill:"green"}} /></TableCell>);
          case false:
              return(<TableCell id="tablepadding" align="center" ><CancelIcon  fontSize="smaller" style={{fill:"red"}} /></TableCell>);
          case undefined:
              return(<TableCell> <IconButton onClick={this.approveChange} style={{paddingBottom: "0", paddingTop: "0"}}><ThumbUpRoundedIcon fontSize="small" color="primary" /> </IconButton>
              <IconButton onClick={this.declineChange} style={{paddingBottom: "0", paddingTop: "0"}} ><ThumbDownAltIcon fontSize="small" color="secondary"  /></IconButton></TableCell>);
      }
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
    getJob(type) {
      var TranslateType = "";
      switch (type) {
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
      return TranslateType;
    }
  
  handleOpenMail() {
    console.log("handleOpenMail");
    this.props.openCheckBox(this.props.index);
  } 

renderItems() {
 
}
approveChange() {
  this.props.goToFather(this.props.index,"approve");
}
declineChange() {
  this.props.goToFather(this.props.index,"decline");
}
getFormatt(date) {
    //var changeDate = this.state.exchanges[j].oldDate;
    var todayTime = new Date(date);
    var month = todayTime.getMonth() + 1;
var day = todayTime.getDate();
var year = todayTime.getFullYear();
return  day + "/" + month + "/" + year;
  }


    render() {
      console.log("itemApprove render",this.props.item);
        const { classes } = this.props;
        var oldDay = this.getNameDay(this.props.item.oldDate.date);
        var newDay = this.getNameDay(this.props.item.newDate.date);
        var fo
        return(
            <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()}>
                {/* <Table><TableBody> */}
                  <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()} align="center">{this.props.item.oldDate.name} </TableCell>
                  <TableCell id="no_margin_sides" key={shortid.generate()}  align="center"> {oldDay} - {this.getFormatt(this.props.item.oldDate.date)}</TableCell>


                  </TableRow>
                  {/* </TableBody></Table> */}
                  </TableCell>

                  <TableCell key={shortid.generate()}>
                {/* <Table><TableBody> */}
                  <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()} align="center">{this.props.item.newDate.name} </TableCell>
                  <TableCell id="no_margin_sides" key={shortid.generate()}  align="center"> {newDay} - {this.getFormatt(this.props.item.newDate.date)}</TableCell>


                  </TableRow>
                  {/* </TableBody></Table> */}
                  </TableCell>

                  <TableCell key={shortid.generate()}>
                {/* <Table><TableBody> */}
                  <TableRow key={shortid.generate()}>
                  <TableCell id="alltablepadding" key={shortid.generate()} align="center"> <IconButton onClick={() => {console.log("uur")}} style={{paddingBottom: "0", paddingTop: "0"}}>    <EmailIcon id="email-recive" onClick={this.handleOpenMail} /> </IconButton></TableCell>
                <TableCell key={shortid.generate()} align="center">{this.getJob(this.props.item.oldDate.type)}</TableCell>
                  {/* <TableCell id="tablepadding" key={shortid.generate()}  align="center"> </TableCell> */}
                 {this.renderIcons()}


                  </TableRow>
                  {/* </TableBody></Table> */}
                  </TableCell>

                  </TableRow>
     

); }

}