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
const styles = theme => ({
    dialogPaper: {
        width: "300px",
    },
    margin: {
      margin: theme.spacing(1),
      margin: "0",
      padding: "0",
      width: "30px",
      height: "30px"
    },
    rejectDialog: {
        width: "70%",
        height: "360px",
    }
  });


 class AnswerItem extends React.Component {
    constructor(props){    
        super(props);
        this.state ={
            open:false,message: null
        }
        this.cancelRequest = this.cancelRequest.bind(this);
         this.handleClickOpen = this.handleClickOpen.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    }
    renderDialog(status) {
       // this.props.fatherOpenDialog(status,this.props.item);
    }
    cancelRequest() {
      this.props.fatherOpenDialog("cancel",this.props.item);
    }


    handleClickOpen() {
      this.props.fatherOpenDialog("continue",this.props.item);
      };
    renderIconsUser(status,statusSendAgain) {
      const { classes } = this.props;

      if(statusSendAgain) {
         return(
                  <TableCell id="tablepadding" key={shortid.generate()} align="center">
                <HelpIcon />
                <div id="button-regret">
                  <Button variant="outlined" size="small" color="secondary" className={classes.margin} onClick={this.cancelRequest}>
         התחרטתי
        </Button>  
        </div>
                </TableCell>);
      }
      console.log("status" , status);
        switch(status) {
            case "asking":
                return(
                  <TableCell id="tablepadding" key={shortid.generate()} align="center">
                <HelpIcon />
                <HelpIcon />
                <div id="button-regret">
                  <Button variant="outlined" size="small" color="secondary" className={classes.margin} onClick={this.cancelRequest}>
         התחרטתי
        </Button>  
        </div>
                </TableCell>);
            case "reject":
                return (
                  <TableCell id="tablepadding" key={shortid.generate()} align="center">
                <BlockIcon id="icon-disagree" style={{fill:"red"}} />
                <HelpIcon />
                <div id="button-regret">
                  <Button variant="outlined" size="small" color="secondary" className={classes.margin} onClick={this.cancelRequest}>
         התחרטתי
        </Button>  
        </div>  
                </TableCell>);
            default:
              
                return (
                  <TableCell id="table-status" key={shortid.generate()} align="center">
                  <div id="div-status">
                  <DoneIcon style={{fill:"green"}} />
                  {this.renderIconsManager(status)}
                  </div>
                  <div id="button-regret">
                  <Button variant="outlined" size="small" color="secondary" className={classes.margin} onClick={this.cancelRequest}>
         התחרטתי
        </Button>  
        </div>
                  </TableCell>);
         
              
        }
    }
    renderIconsManager(status) {
  
      switch(status) {
        case "agree":
          return(
            <HelpIcon />
            
          );

        case "convincing":
          return(
            // <TableCell id="tablepadding" key={shortid.generate()} align="center">
          <HelpIcon />
          //</TableCell>
          );
        case "approve":
          return (
          //  <TableCell id="tablepadding" key={shortid.generate()} align="center">
            <DoneIcon style={{fill:"green"}} />
          //  </TableCell>
            );
        case "decline": 
        console.log("good");
        return (
         // <TableCell id="tablepadding" key={shortid.generate()} align="center">
        <BlockIcon id="icon-disagree" style={{fill:"red"}} />
        // </TableCell>
        );
    }
  }

    renderMessageIcon(newMessage) {
        console.log("new message" , this.newMessage)
        if(newMessage != undefined) {
           return (<EmailIcon id="email-recive" onClick={this.handleClickOpen} />);
        }
    }
    

    render() {
        const { classes } = this.props;

        return (
            <TableRow key={shortid.generate()}>
            <TableCell key={shortid.generate()}>
            <Table><TableBody>
              <TableRow key={shortid.generate()}>
              <TableCell key={shortid.generate()} align="center">{this.props.item.mainly == "me"?"me": "second"}</TableCell>
            <TableCell key={shortid.generate()} align="center">{this.props.item.myDateFormat}</TableCell>
              <TableCell key={shortid.generate()}  align="center">
              {this.props.item.myDay}
              <ArrowBackIcon id="arrow-right" style={{fill:"red"}} />
              </TableCell>
              
              </TableRow>
              </TableBody></Table>
              </TableCell>
              <TableCell key={shortid.generate()}>
                <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()} align="center">
                <ArrowForwardIcon id="arrow-left" style={{fill:"green"}} />
                {/* <div style={{textAlign:"center",paddingLeft: "30px"}}> */}
                {this.props.item.friendName}
                {/* </div> */}
                </TableCell>
                <TableCell key={shortid.generate()} align="center">{this.props.item.friendDateForamt}</TableCell>
                {this.renderMessageIcon(this.props.item.friendMessage)}
                {this.renderIconsUser(this.props.item.status,this.props.item.statusSendAgain)}
                           {/* {this.renderIconsManager(this.props.item.status)} */}
              {/* //  {this.renderDialog(this.props.item.status)} */}


                </TableRow>
               </TableCell>
              </TableRow>
        );
    }
}

export default withStyles(styles)(AnswerItem);