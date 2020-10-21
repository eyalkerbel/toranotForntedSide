import React from "react";
import { connect } from "react-redux";
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    ToggleButtonClear: {
        width: 20,
        height: 13,
       
      },
      ToggleButtonClose: {
        width: 20,
        height: 13
      }
 
  });
  
  

class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: false
        };
        this.changeFriend = this.changeFriend.bind(this);
    }


    createFriendList() {
        var arri = [];
        const {classes } = this.props;

      //  console.log("selectedUSEER" , this.props.selectedUser)
       var friendId = this.props.selectedUser.friendId;
       var friendDetails;
        for(var i=0;i<this.props.toranim.length;i++) {
        //    console.log("friendid" , friendId , this.props.selectedUser.userDetails._id ,this.props.toranim[i]);
            if(friendId == this.props.toranim[i].idUser && this.props.selectedUser.userDetails._id == this.props.toranim[i].friendId ) {
            //    console.log("eneter");
                friendDetails = this.props.toranim[i];
            //    console.log("freindDetails" , friendDetails);
                arri.push(<ListItem key={i}>
                    <ListItemText draggable="true" primary={<div style={{display: "flex", alignItems: "center", flex: 1 }}>
                    <div className="friend-list-container">
                    {/* <div style={{float:"right"}}> */}
                    <span id="name-in-friend-list"> {friendDetails.userDetails.name} </span>
                    {/* </div> */}
                                                {/* <RadioGroup defaultValue="0" aria-label="regular" name="customized-radios">
                                                <FormControlLabel onClick={() => this.radioHandler(0)} value="0" control={<Radio />} label="צרף ביחד" />
                                                <FormControlLabel onClick={() => this.radioHandler(1)} value="1" control={<Radio />} label="אל תצרף" />
                                                </RadioGroup> */}
                                                <div className="div-continer-friendlist-button">
                                                <ToggleButton className={classes.ToggleButtonClear} value="check" selected={this.state.select} onChange={() => { this.setState({select:!this.state.select})}}>
                                                <CheckIcon id="checkbox-add-with-friend" />
                                                 </ToggleButton>
                                                 <ToggleButton className={classes.ToggleButtonClose} value="check" selected={!this.state.select} onChange={() => { this.setState({select:!this.state.select})}}>
                                                <CloseIcon id="checkbox-add-with-friend" />
                                                 </ToggleButton>
                                                 </div>
                                                 </div>
                                                </div>}>
                                                </ListItemText>
                    
            
                </ListItem>);
            }
        }
       

  
    }
    changeFriend() {
        var select = this.state.select;
        this.props.updateParent(this.props.friendDetails,select);
        this.setState({select:!this.state.select})
    }

    render() {
        const {classes } = this.props;
        return (
            <div>
            <ListItem>
                    <ListItemText draggable="true" primary={<div style={{display: "flex", alignItems: "center", flex: 1 }}>
                    <div className="friend-list-container">
                    {/* <div style={{float:"right"}}> */}
                    <span id="name-in-friend-list"> {this.props.friendDetails.userDetails.name} </span>
                    {/* </div> */}
                                                {/* <RadioGroup defaultValue="0" aria-label="regular" name="customized-radios">
                                                <FormControlLabel onClick={() => this.radioHandler(0)} value="0" control={<Radio />} label="צרף ביחד" />
                                                <FormControlLabel onClick={() => this.radioHandler(1)} value="1" control={<Radio />} label="אל תצרף" />
                                                </RadioGroup> */}
                                                <div className="div-continer-friendlist-button">
                                                <ToggleButton className={classes.ToggleButtonClear} value="check" selected={this.state.select} onChange={this.changeFriend}>
                                                <CheckIcon id="checkbox-add-with-friend" />
                                                 </ToggleButton>
                                                 <ToggleButton className={classes.ToggleButtonClose} value="check" selected={!this.state.select} onChange={this.changeFriend}>
                                                <CloseIcon id="checkbox-add-with-friend" />
                                                 </ToggleButton>
                                                 </div>
                                                 </div>
                                                </div>}>
                                                </ListItemText>
                    
            
                </ListItem>
            </div>
            );
    
    }
    }
    const mapStateToProps = state => ({
        toranim: state.toranim.toranimNextMonth
    })

export default connect(mapStateToProps,null)(withStyles(styles)(FriendList));