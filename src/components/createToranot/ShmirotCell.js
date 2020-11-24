import React from "react";
import {Button , Divider} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    horizontalLine: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
  });
class ShmiortCell extends React.Component {
    constructor(props) {
        super(props);
        this.openCellDialog = this.openCellDialog.bind(this);
    }
    openCellDialog() {
        this.props.openCellDialog(this.props.arri2[this.props.g],this.props.gooi,this.props.arri2[this.props.g].num);
    }


    render() {
        const {classes} = this.props;
        // console.log("ShmiortCellprops" , this.props.arri2[this.props.g]);
        return (
        <div onClick={this.openCellDialog} key={this.props.x} style={this.props.status? this.props.status? {background:"lightblue"}: {background:"white"} : this.props.status2? {background:"lightgreen"}:{background:"white"}} className="shmirotCell" >
            <span className="cellDate">
                {this.props.arri2[this.props.g].num}
            </span>
            <div className="full-cell-details">
             <div class="row-xs-12">
                {this.props.arri2[this.props.g]!= []?  this.props.arri2[this.props.g].names.map((el,index) => index < 5? <div class="row-xs-3">{el}</div> : null)
                : null}
            </div>
            <div className="divider2">
           
            </div>
            <div className="secondRowCell">
            <div class="row-xs-12">
                {this.props.arri2[this.props.g]!= []?  this.props.arri2[this.props.g].names.map((el,index) => index > 4? <div class="row-xs-3">{el}</div> : null)
                : null}
            </div>
            </div>
            {/* <Divider classes={{root: classes.horizontalLine}} /> */}

            </div>    
        </div>
        );

    }
    
 }

 export default withStyles(styles)(ShmiortCell);