import React from "react";
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import IconButton from '@material-ui/core/IconButton';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Table } from "@material-ui/core";
import shortid from 'shortid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AutorenewTwoToneIcon from '@material-ui/icons/AutorenewTwoTone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CancelIcon from '@material-ui/icons/Cancel';
export default class ExchangeItem extends React.Component {
 constructor(props) {
     super(props);
     this.approveChange = this.approveChange.bind(this);
     this.declineChange = this.declineChange.bind(this);
 }
 declineChange() {
     this.props.declineChange(this.props.index);
 }
approveChange() {
  //  console.log("indexExc",this.props.indexEch);
    // this.props.approveChange(this.props.indexArri,this.props.indexExchange,this.props.indexEch);
    this.props.approveChange(1,2,this.props.index);
}
renderIcons() {
    console.log("doneDeal" , this.props.doneDeal);
    switch(this.props.doneDeal) {
        case true:
            return(<TableCell id="tablepadding" align="center" ><CheckCircleIcon  fontSize="smaller" style={{fill:"green"}} /></TableCell>);
        case false:
            return(<TableCell id="tablepadding" align="center" ><CancelIcon  fontSize="smaller" style={{fill:"red"}} /></TableCell>);
        case undefined:
            return(<TableCell> <IconButton onClick={this.approveChange} style={{paddingBottom: "0", paddingTop: "0"}}><ThumbUpRoundedIcon fontSize="small" color="primary" /> </IconButton>
            <IconButton onClick={this.declineChange} style={{paddingBottom: "0", paddingTop: "0"}} ><ThumbDownAltIcon fontSize="small" color="secondary"  /></IconButton></TableCell>);
    }
}

render() {
    return(
        <Table  ><TableBody>
        <TableRow>
       
<TableCell id="tablepadding" key={shortid.generate()} align="center">
{/* <AutorenewTwoToneIcon id="icon-change"/> */}
<ArrowForwardIcon id="arrow-left" style={{fill:"green"}} />
{/* {this.props.exchangeData.changeDate.name}</TableCell>
              <TableCell key={shortid.generate()}  align="center">{this.props.exchangeData.formattedDate}</TableCell>
             
              {this.props.doneDeal == false? <TableCell> <IconButton onClick={this.approveChange} style={{paddingBottom: "0", paddingTop: "0"}}><ThumbUpRoundedIcon fontSize="small" color="primary" /> </IconButton>
              <IconButton style={{paddingBottom: "0", paddingTop: "0"}} ><ThumbDownAltIcon fontSize="small" color="secondary"  /></IconButton></TableCell>  
              : <TableCell id="tablepadding" align="center" ><CheckCircleIcon  fontSize="smaller" style={{fill:"green"}}/></TableCell>} </TableRow> </TableBody></Table>); */}
    {this.props.exchangeData.name}</TableCell>
    <TableCell key={shortid.generate()}  align="center">{this.props.exchangeData.userDate}</TableCell>
             {this.renderIcons()}
               </TableRow> </TableBody></Table>);
              
}

}