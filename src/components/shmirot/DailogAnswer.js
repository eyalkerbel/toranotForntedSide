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

class DailogAnswer extends React.Component {
constructor(props) {
    super(props);

   
this.state = {
    message: null,
    open:false,
    open2:false,
    messageToManeger:null
};
this.handleClose = this.handleClose.bind(this);
this.sendMessge = this.sendMessge.bind(this);
this.sendToManager = this.sendToManager.bind(this);
this.sendToManagerFirst = this.sendToManagerFirst.bind(this);
this.cancelRequest = this.cancelRequest.bind(this);
}
sendToManager() {
    this.props.sendToManager(this.state.messageToManeger,false);
}
sendMessge() {
   this.props.sendMessge(this.state.message);
}
sendToManagerFirst() {
    this.props.sendToManager(this.state.message,true);
}
cancelRequest() {
    this.props.cancelRequest();
}


handleClose() {
    //this.setState({open:false});
    this.props.handleClose();
  }


renderBodyDialogSend() {
    const {classes } = this.props;
if(this.props.currentItem != null) {
    console.log("notgood" , this.props.currentItem.status);
    switch(this.props.currentItem.status) {
    case "reject":
            return( <Dialog PaperProps={{ classes: {root: classes.rejectDialog} }}
            open={this.props.open}
            onClose={this.handleClose}>
            <DialogTitle id="alert-dialog-slide-title">דחה את הבקשה שלך {this.props.currentItem.name}</DialogTitle>
            <DialogContent classes={{ paper: classes.dialogPaper }} contentStyle={{width: "70%", maxWidth: 'none'}}>
            <div id="div_full_dialog">
            <DialogContentText id="alert-dialog-slide-description">
            <div className="conainer-div-peact">
            <div className="name-div">
                {this.props.currentItem.friendName}
           </div>
           <div className="content-message-div">
                {this.props.currentItem.friendMessage}
            </div>
            </div>
           <div id="div_textarea_sendagain">
                          <textarea className="textarea-dialog" type="text" placeholder="צרף הודעה" onChange={(e) => {this.setState({message:e.target.value})}} />
           </div>

            </DialogContentText>
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.sendMessge} color="primary">
              שלח שוב
            </Button>
            <Button onClick={this.handleClose} color="primary">
              וותר
            </Button>
            </DialogActions>
        </Dialog>);
    case "decline":
        return( <Dialog PaperProps={{ classes: {root: classes.rejectDialog} }}
            open={this.props.open}
            onClose={this.handleClose}>
            <DialogTitle id="alert-dialog-slide-title">המנהל דחה את הבקשה שלך</DialogTitle>
            <DialogContent classes={{ paper: classes.dialogPaper }} contentStyle={{width: "70%", maxWidth: 'none'}}>
        <div id="div_full_dialog">
            <DialogContentText id="alert-dialog-slide-description">
          <div className="conainer-div-peact">
            <div className="name-div">
                {this.props.currentItem.friendName}
           </div>
           <div className="content-message-div">
                {this.props.currentItem.friendMessage}
            </div>
            </div>
          <div className="conainer-div-peact">
            <div className="name-div">
            מנהל        
            </div>
          <div className="content-message-div">
            { this.props.currentItem.managerMessage}
          </div>
         </div>
           <div id="div_textarea_sendagain">
             <textarea className="textarea-dialog" type="text" placeholder="צרף הודעה" onChange={(e) => {this.setState({message:e.target.value})}} />
           </div>

            </DialogContentText>
        </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.sendToManager} color="primary">
           שכנע מנהל
            </Button>
            <Button onClick={this.handleClose} color="primary">
              וותר
            </Button>
            </DialogActions>
        </Dialog>);
    case "convincing":
            return( <Dialog PaperProps={{ classes: {root: classes.rejectDialog} }}
                open={this.props.open}
                onClose={this.handleClose}>
                <DialogTitle id="alert-dialog-slide-title">המנהל דחה את הבקשה שלך</DialogTitle>
                <DialogContent classes={{ paper: classes.dialogPaper }} contentStyle={{width: "70%", maxWidth: 'none'}}>
            <div id="div_full_dialog">
                <DialogContentText id="alert-dialog-slide-description">
              <div className="conainer-div-peact">
                <div className="name-div">
                    {this.props.currentItem.friendName}
               </div>
               <div className="content-message-div">
                    {this.props.currentItem.friendMessage}
                </div>
                </div>
              <div className="conainer-div-peact">
                <div className="name-div">
                מנהל        
                </div>
              <div className="content-message-div">
                { this.props.currentItem.managerMessage}
              </div>
             </div>
              {/* אחרי תגובה של מנהל  */}
             <div className="conainer-div-peact">
                <div className="name-div">
                אני בתגובה למנהל        
                </div>
              <div className="content-message-div">
                { this.props.currentItem.oldMessage}
              </div>
             </div>
                </DialogContentText>
            </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  בטל
                </Button>
                </DialogActions>
            </Dialog>);
    case "approve":
        return( <Dialog PaperProps={{ classes: {root: classes.rejectDialog} }}
            open={this.props.open}
            onClose={this.handleClose}>
            <DialogTitle id="alert-dialog-slide-title">המנהל אישר את הבקשה שלך</DialogTitle>
            <DialogContent classes={{ paper: classes.dialogPaper }} contentStyle={{width: "70%", maxWidth: 'none'}}>
        <div id="div_full_dialog">
            <DialogContentText id="alert-dialog-slide-description">
          <div className="conainer-div-peact">
            <div className="name-div">
                {this.props.currentItem.friendName}
           </div>
           <div className="content-message-div">
                {this.props.currentItem.friendMessage}
            </div>
            </div>
          <div className="conainer-div-peact">
            <div className="name-div">
            מנהל        
            </div>
          <div className="content-message-div">
            { this.props.currentItem.managerMessage}
          </div>
         </div>
            </DialogContentText>
        </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              סגור
            </Button>
            </DialogActions>
        </Dialog>);
    case "asking": 
    return( <Dialog PaperProps={{ classes: {root: classes.rejectDialog} }}
        open={this.props.open}
        onClose={this.handleClose}>
        <DialogTitle id="alert-dialog-slide-title">מחכה לאישור</DialogTitle>
        <DialogContent classes={{ paper: classes.dialogPaper }} contentStyle={{width: "70%", maxWidth: 'none'}}>
    <div id="div_full_dialog">
        <DialogContentText id="alert-dialog-slide-description">
      <div className="conainer-div-peact">
        <div className="name-div">
          אני
       </div>
       <div className="content-message-div">
            {this.props.currentItem.myMessage}
        </div>
        </div>

        </DialogContentText>
    </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          סגור
        </Button>
        </DialogActions>
    </Dialog>);
    case "agree":
        return( <Dialog PaperProps={{ classes: {root: classes.rejectDialog} }}
            open={this.props.open}
            onClose={this.handleClose}>
            <DialogTitle id="alert-dialog-slide-title">מחכה לאישור מנהל , {this.props.currentItem.name} אישר את הבקשה שלך</DialogTitle>
            <DialogContent classes={{ paper: classes.dialogPaper }} contentStyle={{width: "70%", maxWidth: 'none'}}>
        <div id="div_full_dialog">
            <DialogContentText id="alert-dialog-slide-description">
            <div className="conainer-div-peact">
            <div className="name-div">
            אני        
            </div>
          <div className="content-message-div">
            { this.props.currentItem.myMessage}
          </div>
         </div> 
          <div className="conainer-div-peact">
            <div className="name-div">
                {this.props.currentItem.friendName}
           </div>
           <div className="content-message-div">
                {this.props.currentItem.friendMessage}
            </div>
            </div>
          <div id="div_textarea_sendagain">
             <textarea className="textarea-dialog" type="text" placeholder="צרף הודעה" onChange={(e) => {this.setState({message:e.target.value})}} />
           </div>

            </DialogContentText>
        </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.sendToManagerFirst} color="primary">
          בקש ממנהל להחליף
            </Button>
            <Button onClick={this.handleClose} color="primary">
              סגור
            </Button>
            </DialogActions>
        </Dialog>);

        }
    }
}

rendBodyDailogCancel() {
    const {classes } = this.props;
    return( <Dialog PaperProps={{ classes: {root: classes.rejectDialog} }}
        open={this.props.open}
        onClose={this.handleClose}>
        <DialogTitle id="alert-dialog-slide-title">מחכה לאישור</DialogTitle>
        <DialogContent classes={{ paper: classes.dialogPaper }} contentStyle={{width: "70%", maxWidth: 'none'}}>
    <div id="div_full_dialog">
        <DialogContentText id="alert-dialog-slide-description">
      <div className="conainer-div-peact">
    אתה בטוח שאתה רוצה לבטל את הבקשה
      </div>

        </DialogContentText>
    </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.cancelRequest} color="primary">
          בטל
        </Button>
        <Button onClick={this.handleClose} color="primary">
          סגור
        </Button>
        </DialogActions>
    </Dialog>);
}

render() {
    console.log("current" , this.props.dailogStatus);
    return (
        // this.props.currentItem != null?
  <div>
  {this.props.dailogStatus== "continue"?
this.renderBodyDialogSend() : this.rendBodyDailogCancel()}
</div> );
}

}

export default withStyles(styles)(DailogAnswer);
