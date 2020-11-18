import React, { Fragment } from "react";
import {connect} from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import shortid from 'shortid';
import { TableCell } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";

class ItemUser extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <TableRow key={shortid.generate()}>
                <TableCell key={shortid.generate()} align="center">
                    {this.props.item.name}
                </TableCell>
                <TableCell>
                <Fab size="small" onClick={() => this.deleteUser()}>
          <i className="material-icons">delete</i>
          </Fab>
          <Fab size="small" onClick={() => this.editUser()}>
          <i className="material-icons">edit</i>
          </Fab>
                </TableCell>
            </TableRow>
        );
    }

}

// function mapDispatchToProps(dispatch) {
//     return {
//         deleteUser: (id) => dispatch(deleteUser(id))
//     };
// }

export default connect(null,null)(ItemUser);