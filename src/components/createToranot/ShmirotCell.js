import React from "react";
import {Button} from "@material-ui/core";

class ShmiortCell extends React.Component {
    constructor(props) {
        super(props);
        this.openCellDialog = this.openCellDialog.bind(this);
    }
    openCellDialog() {
        this.props.openCellDialog(this.props.arri2[this.props.g],this.props.gooi,this.props.arri2[this.props.g].num);
    }


    render() {
       // console.log("ShmiortCellprops" , this.props.arri2);
        return (
    <div onClick={this.openCellDialog} key={this.props.x} style={this.props.status? this.props.status? {background:"lightblue"}: {background:"white"} : this.props.status2? {background:"lightgreen"}:{background:"white"}} className="shmirotCell" >
            <span className="cellDate">
                {this.props.arri2[this.props.g].num}
            </span>
            {this.props.arri2[this.props.g].names}
            <Button onClick={() => this.props.preSend(this.props.gooi, this.props.selectedUser, this.props.selectValue, this.props.toran)} variant="outlined" style={{ border: "solid 1px teal", color: "teal" }} >הוסף</Button>
    </div>
        );

    }
    
 }

 export default ShmiortCell;