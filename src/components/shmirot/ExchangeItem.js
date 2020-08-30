import React from "react";
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import IconButton from '@material-ui/core/IconButton';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Table } from "@material-ui/core";
import shortid from 'shortid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AutorenewTwoToneIcon from '@material-ui/icons/AutorenewTwoTone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CancelIcon from '@material-ui/icons/Cancel';
import EmailIcon from '@material-ui/icons/Email';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    dialogPaper: {
        width: "300px",
    },
  });



 class ExchangeItem extends React.Component {
 constructor(props) {
     super(props);
     this.approveChange = this.approveChange.bind(this);
     this.declineChange = this.declineChange.bind(this);
     this.handleClickOpen = this.handleClickOpen.bind(this);
     this.handleClose = this.handleClose.bind(this);
     this.handleClickOpen2 = this.handleClickOpen2.bind(this);
     this.handleClose2 = this.handleClose2.bind(this);
     this.sendMessage = this.sendMessage.bind(this);
     this.state ={
         open: false,
         open2:false,
         message: "",
         isAgree:null
     }
 }
 handleClickOpen() {
    this.setState({open:true});
  };
   handleClose() {
    this.setState({open:false});
  };
  handleClickOpen2() {
    this.setState({open2:true});
  };
   handleClose2() {
       console.log("handleClose2");
    this.setState({open2:false,message:""});
  };

 declineChange() {
    // this.setState({open2:true,isAgree:false});

    this.props.madeADecision(false);

 }
approveChange() {
  //  console.log("indexExc",this.props.indexEch);
    // this.props.approveChange(this.props.indexArri,this.props.indexExchange,this.props.indexEch);
    //this.props.approveChange(1,2,this.props.index);

//    this.setState({open2:true,isAgree:true});

      this.props.madeADecision(true,this.props.index,this.props.exchangeData);

}
sendMessage() {
    console.log("prosp" , this.state);
    if(this.state.isAgree == true)  {
        console.log("approve");
        this.props.approveChange(this.props.index,this.state.message);
    } else {
        console.log("decline");
        this.props.declineChange(this.props.index,this.state.message);
    }
    this.handleClose2();
}
renderIcons() {
    switch(this.props.doneDeal) {
        case true:
            return(<TableCell id="tablepadding" align="center" ><CheckCircleIcon  fontSize="smaller" style={{fill:"green"}} /></TableCell>);
        case false:
            return(<TableCell id="tablepadding" align="center" ><CancelIcon  fontSize="smaller" style={{fill:"red"}} /></TableCell>);
        case undefined:
            return(<TableCell> <IconButton onClick={this.approveChange} style={{paddingBottom: "0", paddingTop: "0"}}><ThumbUpRoundedIcon fontSize="small" color="primary" /> </IconButton>
            <IconButton onClick={this.declineChange} style={{paddingBottom: "0", paddingTop: "0"}} ><ThumbDownAltIcon fontSize="small" color="secondary"  /></IconButton></TableCell>);
    }
}

render() {
    const { classes } = this.props;

    return(
        <Table  ><TableBody>
        <TableRow>
       
<TableCell id="tablepadding" key={shortid.generate()} align="center">
{/* <AutorenewTwoToneIcon id="icon-change"/> */}
<ArrowForwardIcon id="arrow-left" style={{fill:"green"}} />
{/* {this.props.exchangeData.changeDate.name}</TableCell>
              <TableCell key={shortid.generate()}  align="center">{this.props.exchangeData.formattedDate}</TableCell>
             
              {this.props.doneDeal == false? <TableCell> <IconButton onClick={this.approveChange} style={{paddingBottom: "0", paddingTop: "0"}}><ThumbUpRoundedIcon fontSize="small" color="primary" /> </IconButton>
              <IconButton style={{paddingBottom: "0", paddingTop: "0"}} ><ThumbDownAltIcon fontSize="small" color="secondary"  /></IconButton></TableCell>  
              : <TableCell id="tablepadding" align="center" ><CheckCircleIcon  fontSize="smaller" style={{fill:"green"}}/></TableCell>} </TableRow> </TableBody></Table>); */}
    {this.props.exchangeData.name}</TableCell>
    <TableCell key={shortid.generate()}  align="center">{this.props.exchangeData.userDate}</TableCell>
    <EmailIcon id="email-recive" onClick={this.handleClickOpen} />
    {/* <Dialog PaperProps={{ classes: {root: classes.dialogPaper} }}
        open={this.state.open}
        onClose={this.handleClose}>
        <DialogTitle id="alert-dialog-slide-title">{this.props.exchangeData.name} תגובה</DialogTitle>
        <DialogContent classes={{ paper: classes.dialogPaper }} contentStyle={{width: "70%", maxWidth: 'none'}}>

          <DialogContentText id="alert-dialog-slide-description">
          {this.props.exchangeData.oldMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog PaperProps={{ classes: {root: classes.dialogPaper} }}
        open={this.state.open2}
        onClose={this.handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">{this.props.exchangeData.name} הודעה ל</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <div style={{textAlign: "center"}}>
              <textarea className="textarea-dialog" type="text" placeholder="צרף הודעה" onChange={(e) => {this.setState({message:e.target.value})}} />
           </div>
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.sendMessage} color="primary">
            שלח
          </Button>
          <Button onClick={this.handleClose2} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog> */}

             {this.renderIcons()}
               </TableRow> </TableBody></Table>);
              
}

}


// class SimpleDialog extends React.Component {
//     constructor(props) {
//         super(props);
       
//     }
//     render() {
//         return (
//             <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
//               <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>);
//               </Dialog>);

//     }
// }


export default withStyles(styles)(ExchangeItem);
