import React, { Fragment, Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    dialogPaper: {
        width: "70%",
        height: "360px",
    },
    rejectDialog: {
        width: "70%",
        height: "360px",
    }
  });


class DailogRequest extends React.Component {
    constructor(props) {
        super(props);
    
    this.state = {
        message: null,
        open:false,       
    };
    this.handleClose = this.handleClose.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
}
handleClose() {
    this.props.handleClose();
}
sendMessage() {
    this.props.sendMessage(this.state.message);
}

render() {
    const {classes } = this.props;
    console.log("dialogRequest", this.props.exchangeData);
    if(this.props.exchangeData != null) {
    return(
    <Dialog PaperProps={{ classes: {root: classes.dialogPaper} }}
    open={this.props.open}
    onClose={this.handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description">
    <DialogTitle id="alert-dialog-slide-title">{this.props.exchangeData.name} הודעה ל</DialogTitle>
    <DialogContent>
    <div id="div_full_dialog">
            <DialogContentText id="alert-dialog-slide-description">
          <div className="conainer-div-peact">
            <div className="name-div">
                {this.props.exchangeData.oldDate.name}
           </div>
           <div className="content-message-div">
                {this.props.exchangeData.oldMessage}
            </div>
            </div>
        <div id="div_textarea_sendagain">
          <textarea className="textarea-dialog" type="text" placeholder="צרף הודעה" onChange={(e) => {this.setState({message:e.target.value})}} />
       </div>
    </DialogContentText>
    </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={this.sendMessage} color="primary">
        שלח
      </Button>
      <Button onClick={this.handleClose} color="primary">
        סגור
      </Button>
    </DialogActions>
  </Dialog>);

} else {
    return null;
}
}
}

export default withStyles(styles)(DailogRequest);
