import React, {Fragment} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

class FriendItem extends React.Component {
    constructor(props) {
        super(props);
        this.chooseFriend = this.chooseFriend.bind(this);
    }

    chooseFriend() {
        console.log("chooseFriend")
        if(this.props.isRequest == true) {
            this.props.chooseFriend(null,this.props.element);
        } else {
        this.props.chooseFriend(this.props.element,this.props.element);
        }
        
    }
    getDescription(value) {


        if(value == 0) {
           return "סמל תורן בפנים";
        }
        if(value == 1) {
            return "קצין תורן בפנים";
         }
         if(value == 2) {
            return "חייל חובה חוץ";
         }
         if(value == 3) {
            return "נגד שער";
         }
         if(value == 4) {
            return "ע' קצין תורן";
         }
         if(value == 5) {
            return "קצין תורן";
         }
            else {
             return "מפקד תורן"
         }
      
      
    }

    render() {
        return (
            <TableRow key={shortid.generate()}>
                <TableCell  key={shortid.generate()} align="center">
              
                    {this.props.oppositeRequest? <div>בקשה מנוגדת כבר קיימת</div> : null }
               
                    {this.props.element.userDetails.name}
                </TableCell>
                <TableCell key={shortid.generate()} align="center">
                    {this.getDescription(this.props.element.userDetails.type)}
                </TableCell>
                <TableCell key={shortid.generate()} align="center">
                <Button variant="contained" color="primary" onClick={this.chooseFriend}>
                {this.props.isRequest == true? "בטל בקשה" : "שלח בקשה" }
                 </Button>

                </TableCell>
            </TableRow>
        );
    }

}

function mapStateToProps(state,ownProps) {
    return {
        myId: state.user._id,
        toranimNextMonth: state.user_id
    }
}
export default connect(mapStateToProps,null)(FriendItem);