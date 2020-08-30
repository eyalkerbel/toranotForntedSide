import React, {Fragment}  from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { extend } from 'joi';
const styles = theme => ({
  dialogPaper: {
      width: "70%",
      height: "500px",
    
      
  },
});

class DialogHistoryMessage extends React.Component {
constructor(props) {
    super(props); 
    this.state = {
      open: false,
      message: null,
    }
    this.handleClose = this.handleClose.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
}
handleClose() {
  this.props.handleClose();
}
sendMessage() {
  this.props.sendMessage(this.state.message);
}

renderBody() {
  return (
    <div>

  <div className="conainer-div-peact">
    <div className="name-div">
      {this.props.item.oldDate.name}
    </div>
    <div className="content-message-div">
    {this.props.item.oldMessage}
    </div>
    

  </div>
  
  <div className="conainer-div-peact">
    <div className="name-div">
      {this.props.item.newDate.name}
    </div>
    <div className="content-message-div">
    {this.props.item.newMessage}
    </div>
  </div>
  <div id="div_textarea_sendagain">
  <textarea className="textarea-dialog" type="text" placeholder="צרף הודעה" onChange={(e) => {this.setState({message:e.target.value})}} />
           </div>

  </div>
  );
}
render() {

  const {classes} = this.props;
  console.log("props" , this.props);
  return (
  <Dialog PaperProps={{ classes: {root: classes.dialogPaper} }}
  open={this.props.open}
    onClose={this.handleClose}>
  <DialogTitle id="alert-dialog-slide-title"> היסטורית הודעות</DialogTitle>
<DialogContent classes={{ paper: classes.dialogPaper }}>
    <div id="div_full_dialog">

<DialogContentText id="alert-dialog-slide-description">
{this.props.open? this.renderBody() : null}
</DialogContentText>
</div>
</DialogContent>
<DialogActions>
<Button onClick={this.sendMessage} color="primary">
           שלח ההודעה
            </Button>
<Button onClick={this.handleClose} color="primary">
close
</Button>
</DialogActions>
</Dialog> );
}
}

export default withStyles(styles)(DialogHistoryMessage);
