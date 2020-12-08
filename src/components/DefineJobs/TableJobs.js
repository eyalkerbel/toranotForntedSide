import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { Tab } from "material-ui";
import JobItem from "./JobItem";
import {ThemeContext} from '../../ColorMode/colors';

class TableJobs extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextType = ThemeContext;

    renderJobs() {
        var temp = [];
            console.log("this.props.jobs" , this.props);
      for(var i=0;i<this.props.jobs.length;i++) {
        temp.push(<JobItem data={this.props.jobs[i]} index={i} />)
      }
      return temp;
    }
    render() {
        console.log("renderTable",this.props);
        return (
            
        <Table  >
            <TableHead>
                <TableRow style={{ color: this.context.titleText}}>
                    <TableCell style={{ color: this.context.titleText}}   align="center" >תפקיד</TableCell>
                    <TableCell style={{ color: this.context.titleText}} align="center">כמות תורנים ליום</TableCell>
                    <TableCell style={{ color: this.context.titleText}} align="center">תיאור</TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
            {this.renderJobs()}
        </TableBody>
        </Table>);
    }
}
// function mapStateToProps(state) {
//     return {
//         jobs: state.jobs
//     }
    
// }
export default TableJobs;