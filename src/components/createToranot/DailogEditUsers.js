import React, {Fragment}  from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import {  Fab } from "@material-ui/core";
import UsersSelect from "../Users/UsersSelect";
const styles = theme => ({
    dialogPaper: {
        width: "100%",
        height: "600px",
        paddingRight: "0 !important",
        paddingLeft: "0 !important"
      
        
    },
  });





class DailogEditUsers extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.props.handleClose();
    }
    render() {
        const {classes} = this.props;
        return (
            <Dialog  repositionOnUpdate={false}
            style={{ padding: '0px 0px 0px 0px' }}
            PaperProps={{ classes: {root: classes.dialogPaper} }} open={this.props.open} onClose={this.handleClose}>
            <DialogTitle id="alert-dialog-slide-title">שיבוץ תורנים</DialogTitle>
          <DialogContent classes={{root: classes.dialogPaper }}>
          {this.props.open? 
            <UsersSelect />
      : null}
          
                         
          </DialogContent>
          <DialogActions>
          
          <Button onClick={this.handleClose} color="primary">
          סגור
          </Button>
          </DialogActions>
          </Dialog> 
          
        );
    }

}

export default (withStyles(styles))(DailogEditUsers);




