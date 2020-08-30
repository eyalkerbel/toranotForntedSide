import React, {Fragment}  from "react";
import shortid from 'shortid';
import Paper from "@material-ui/core/Paper";
import CONFIG from "../../configs/env"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LoadingPage from "../LoadingPage";
import ItemApprove from "./ItemApprove";
import DialogHistoryMessage from "./DialogHistoryMessage";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  dialogPaper: {
      width: "300px",
      
  },
});

export default class ExchangeApprove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetch: false,
            exchangeToApprove: [],
            open:false,
            currentItem: null,
            currentIndex: null,
            currentResponse:null
        }
        this.openCheckBox = this.openCheckBox.bind(this);
        this.handleClickFromSon = this.handleClickFromSon.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentWillMount() {
        fetch(CONFIG.API.GETEXCHANGEAPPROVE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
              },
        }).then(data => data.json()).then(data => this.setState({exchangeToApprove:data,fetched:true}));
    }
    openCheckBox(index) {
      console.log("openCheckBox");
      var item = this.state.exchangeToApprove[index];
        this.setState({open:true,currentItem:item});
    }
    handleClose(index) {
      this.setState({open:false,currentIndex:null,currentResponse:null,currentItem:null});
    }

    handleClickFromSon(index,response) {
     var item = this.state.exchangeToApprove[index];
      this.setState({open:true,currentIndex:index,currentResponse:response,currentItem:item});


  //     var temp = this.state.exchangeToApprove;
  //     var item = temp[index];
  //  var data = {item , index , response };
  //   temp.splice(index,1);
  //   this.setState({exchangeToApprove:temp});
  //   this.updateDatabase(data);
    }

    sendMessage(message) {
      var temp = this.state.exchangeToApprove;
      var item = this.state.exchangeToApprove[this.state.currentIndex];
      var index = this.state.currentIndex;
      var response = this.state.currentResponse;
   var data = {item ,index, response ,message };
    temp.splice(index,1);
    this.setState({exchangeToApprove:temp,open:false,currentIndex:null,currentResponse:null,currentItem:null});
    this.updateDatabase(data);
    }


    updateDatabase(data) {
      fetch(CONFIG.API.UPDATEEXCHANGEANAGER , {
        method: "POST",
          headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
              },
            body: JSON.stringify(data)

      }).then(dat => dat.json()).then(data => console.log("finish") );

    }
   
    renderTableData() {
      var items = [];
      for(var i=0;i<this.state.exchangeToApprove.length;i++) {
        var item = this.state.exchangeToApprove[i];
        var obi = {
          data: (
        <ItemApprove item={item} index={i} goToFather={this.handleClickFromSon} openCheckBox={this.openCheckBox} />
          )
        };
        items.push(obi.data);
        console.log("items" , items);
      }
      return items;
    }

    render() {
        console.log("approves" , this.state.exchangeToApprove)
        console.log("exchangeApprvoe");
        return (
            <Fragment>
            {this.state.fetched ==true? (
              <Paper className="maincontainer">
                <div className="header-container">
                  <h1 className="header">אישורי החלפות</h1>
                  <div className="divider" />
                </div>

            <Table> 
                      <TableHead>
                      <TableRow key={shortid.generate()} align="center">
                        <TableCell key={shortid.generate()} align="center">פרטי היזם</TableCell>
                        <TableCell key={shortid.generate()} align="center">פרטי המחליף</TableCell>
                        <TableCell key={shortid.generate()} align="center">תצוגת מנהל</TableCell>

                    </TableRow>
                        <TableRow key={shortid.generate()} align="center">
                        <TableCell key={shortid.generate()}>
                        <Table><TableBody>
                        <TableRow key={shortid.generate()}>
                          <TableCell key={shortid.generate()} align="center">שם</TableCell>
                          <TableCell key={shortid.generate()} align="center">תאריך</TableCell>
                          </TableRow>
                          </TableBody></Table>
                          </TableCell>
                          <TableCell>
                          <Table><TableBody>
                          <TableRow key={shortid.generate()}>
                          <TableCell key={shortid.generate()} align="center">שם</TableCell>
                          <TableCell key={shortid.generate()} align="center">תאריך</TableCell>
                          </TableRow>
                          </TableBody></Table>
                          </TableCell>

                          <TableCell>
                          <Table><TableBody>
                          <TableRow key={shortid.generate()}>
                          <TableCell key={shortid.generate()} align="center">הודעות</TableCell>
                          <TableCell key={shortid.generate()} align="center">תפקיד</TableCell>
                          <TableCell key={shortid.generate()} align="center">החלטה</TableCell>
                          </TableRow>
                          </TableBody></Table>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {this.renderTableData()}
                      </TableBody>
                    </Table>
                  <DialogHistoryMessage open={this.state.open} item={this.state.currentItem} handleClose={this.handleClose} sendMessage={this.sendMessage} />
                    </Paper>) : (
            <LoadingPage />
          )}
      </Fragment>
        );
    }
}