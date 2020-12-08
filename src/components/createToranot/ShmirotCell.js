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
    componentWillReceiveProps(nextProps){
    }

    render() {
        const {classes} = this.props;
        console.log("nextProps" , this.props);

        return (
        <div onClick={this.openCellDialog} key={this.props.x} style={(this.props.status? this.props.status? {background:"lightblue"}: {background:"white"} : this.props.status2? {background:"lightgreen"}:null)} className="shmirotCell" >
            <span className="cellDate">
                {this.props.arri2[this.props.g].num}
            </span>
            <div className="full-cell-details">
             <div class="row-xs-12">
             {this.props.arri2[this.props.g]!= []?  (this.props.arri2[this.props.g].names.map((el,index) => {
                    if(index < (this.props.amountToranim)) {
                        console.log("boomm");
                        return <div class="row-xs-3">{el}</div>
                    } else {
                        return null;
                    }
                }))
                : null}
            </div>
            <div className="divider2">
           
            </div>
            {/* <div className="secondRowCell"> */}
            <div class="row-xs-12">
                {this.props.arri2[this.props.g]!= []?  (this.props.arri2[this.props.g].names.map((el,index) => {
                    if(index > (this.props.amountToranim-1)) {
                        console.log("boom2"  ,index);
                        return <div class="row-xs-3">{el}</div>
                    } else {
                        return null;
                    }
                }))
                : null}
            </div>
            {/* </div> */}
            </div>    
        </div>
        );

    }
    
 }

 export default withStyles(styles)(ShmiortCell);