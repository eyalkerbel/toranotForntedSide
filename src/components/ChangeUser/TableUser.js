import React, { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import shortid from 'shortid';
import ItemUser from "./ItemUser";
class TableUser extends React.Component {
    constructor(props){
        super(props);
        this.renderTable = this.renderTable.bind(this);
    }
    renderTable() {
        var arrRender = [];
        for(var i=0;i<this.props.userList.length;i++) {
            var obi = {
                obiData: (
                    <ItemUser item={this.props.userList[i]} handleClick={this.handleClick} />
                )
            }
            arrRender.push(obi.obiData);
        }
        return arrRender;
    }

    render() {
        return(
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow key={shortid.generate()} align="center">
                        <TableCell key={shortid.generate()} align="center">
                            שם 
                        </TableCell>
                        <TableCell key={shortid.generate()} align="center">
                            פעולות 
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.renderTable()}
                </TableBody>
            </Table>
        </Fragment>
        );
    }
}

export default TableUser;