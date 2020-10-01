import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LoadingPage from "../LoadingPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import CONFIG from "../../configs/env"
import ExchangeItem from "./ExchangeItem";
import shortid from 'shortid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TabCompShmirot from "../TabCompSmirot";
import ShmirotChanges from "./ShmirotChanges";
import MyShmirot from "./MyShmirot";
import AnswerChanges from "./AnswerChanges";
import { FORMERR } from "dns";
import { withRouter } from 'react-router-dom';

class Shmirot extends React.Component {
  constructor() {
    super();
    this.state = {
      tabvalue: 0,
      selectValue:0,
      fetched: false,
      arri: [],
      exchanges: [],
      blop: <LoadingPage />,
      fetchArray: [],
      urlExchange: false
    };
    this.handletabs = this.handletabs.bind(this);
    this.fetchyfetch = this.fetchyfetch.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.approveChange = this.approveChange.bind(this);
    this.getDataFromSon = this.getDataFromSon.bind(this);
    this.getDataFromAnswer = this.getDataFromAnswer.bind(this);
  }



  updateAnswer(indexExchange) {
    console.log("updateAnswe" , indexExchange)
    let datas = {
      index: indexExchange
    }

    fetch(CONFIG.API.APPROVEEXCHANGEUSER ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
     body: JSON.stringify(datas)
    }).then(data => data.json())
    .then(dat => console.log("succseed"))
    .catch(err => console.log("failed"));
    }
  approveChange(indexi,indexj,tabvalue,indexExchange) {
    var temp = [];
    temp = this.state.arri[tabvalue];
    var items = [];
    var item = this.state.arri[tabvalue][indexi].exchangesArray[indexj];
     var newToranot = item;
     var oldToranot = this.state.arri[tabvalue][indexi];
    items.push(item);
    var DateToDelte = item.formattedDate;
    var temp = this.state.arri;
    for(var i=0;i<this.state.arri[tabvalue].length;i++) {
      temp[tabvalue][tabvalue][i] = this.state.arri[tabvalue][i];
      if(indexi == i) {
        temp[tabvalue][i].exchangesArray = items;
        temp[tabvalue][i].doneDeal = true;
      }
      
    }
    this.setState({arri:temp});
    this.updateAnswer(indexExchange);
  }


  renderTableData() {
    var arrRender = [];
    for (var i = 0; i < this.state.arri.length; i++) {
      if(this.state.arri[i].exchangesArray == undefined) {
        var obi = {
          obiData: (
            <TableRow key={shortid.generate()}>
              <TableCell key={shortid.generate()}>
              <Table><TableBody>
                <TableRow key={shortid.generate()}>
              <TableCell key={shortid.generate()} align="center">{this.state.arri[i].formattedDate}</TableCell>
                <TableCell key={shortid.generate()}  align="center">{this.state.arri[i].dayOfWeek}</TableCell>
                </TableRow>
                </TableBody></Table>
                </TableCell>
                <TableCell key={shortid.generate()}>
                  <TableRow key={shortid.generate()}><TableCell key={shortid.generate()} align="center">בקרוב</TableCell></TableRow>
                 </TableCell>
                </TableRow>)
        };
        arrRender.push(obi.obiData);
      }
      for(var j=0;j<this.state.arri[i].exchangesArray.length;j++) {
      var obi = {
        obiData: (
          <TableRow key={shortid.generate()}>
            <TableCell key={shortid.generate()}>
            <Table><TableBody>
              <TableRow key={shortid.generate()}>
            <TableCell key={shortid.generate()} align="center">{this.state.arri[i].formattedDate}</TableCell>
              <TableCell id="tablepadding" key={shortid.generate()}  align="center">{this.state.arri[i].dayOfWeek}
              <ArrowBackIcon id="arrow-right" style={{fill:"red"}} /></TableCell>
              </TableRow>
              </TableBody></Table>
              </TableCell>
              <TableCell key={shortid.generate()}>
              {this.state.arri[i].hasChange == true?"coming soon" : <ExchangeItem doneDeal={this.state.arri[i].doneDeal} key={i} exchangeData={this.state.arri[i].exchangesArray[j]} approveChange={this.approveChange} indexArri={i} indexExchange={j} />}
               </TableCell>
              </TableRow>
        )
      };
      arrRender.push(obi.obiData);
    }
    }

    return arrRender;
  }

  handletabs(num) {
    this.setState({ tabvalue: num });
  }

 

  fetchyfetch(num) {
   console.log("fetchfetchgood");
  //  var obi = {
  //    indexDeleteNotifcation = this.state.selectValue
  //  }
    fetch(CONFIG.API.GETEXCHANGESANDTORANOT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        indexDeleteNotifcation: this.state.selectValue
      })
    }).then(data => data.json())
      .then(jsoned => this.fetchData(jsoned))
      .catch(err => {
        this.setState({ fetched: true });
      });
  }
fetchData(jsoned) {
  console.log("jsoned" , jsoned);
this.setState({fetchArray:jsoned,fetched:true});
}

  fetchyfetch3 = num => {
    if (num === 1) {
      this.setState({
        fetched: false,
        blop: (
          <Paper className="maincontainer">
            <div className="header-container">
              <h1 className="header">שמירות שלי</h1>
              <div className="divider" />
            </div>
            <div>
              <Paper
                style={{
                  backgroundColor: "white",
                  marginTop: "",
                  overflow: "hidden"
                }}
              >
                <TabCompShmirot bubbleTabs={this.handletabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabvalue} selectValue={this.state.selectValue} />

                <Table>
                  <TableHead>
                    <TableRow align="center">
                      <TableCell align="center">סוג תורנות</TableCell>
                      <TableCell align="center">תאריך</TableCell>
                      <TableCell align="center">יום בשבוע</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <div align="center">
                      <CircularProgress size={40} align="center" />
                    </div>
                  </TableBody>
                </Table>
              </Paper>
            </div>
          </Paper>
        )
      });
    }

    fetch(CONFIG.API.GETNEXTMONTHSTORANUTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(data => data.json())
      .then(jsoned => this.getFormattedDate(jsoned))
      .catch(err => {
        this.setState({ fetched: true });
      });
  };

  componentWillMount() {
    // if(this.state.fetched == false) {
    // this.fetchyfetch();
    // }
    if(this.props.location.state != undefined) {
    if(this.props.location.state.urlExchange == true) {
      
      this.setState({selectValue:this.props.location.state.index});
    }
  }
  if(this.state.fetched == false) {
    this.fetchyfetch();
    }
  }
  bubbleSelect = (num) => {
    this.setState({ selectValue: num })
}
getDataFromSon(fetchArray2) {
  console.log("fetcharray2" , fetchArray2);
  this.setState({fetchArray:fetchArray2});
}
getDataFromAnswer(temp) {
  console.log("temp" , temp);
  this.setState({fetchArray:temp});
  // this.fetchyfetch(1);
}

  renderByValue() {
    {console.log("tabii" , this.state.fetchArray)}

    // if(this.state.urlExchange == true) {
    //   return(<ShmirotChanges updateParent={this.getDataFromSon} approveChange={this.approveChange} fetchArray={this.state.fetchArray} tabValue={this.state.tabvalue} />);
    // }
    switch(this.state.selectValue) {
      case 0:
        return(<MyShmirot arri={this.state.fetchArray} tabValue={this.state.tabvalue} />);
      case 1:
           return(<ShmirotChanges updateParent={this.getDataFromSon} approveChange={this.approveChange} fetchArray={this.state.fetchArray} tabValue={this.state.tabvalue} />);
      case 2:
            return (<AnswerChanges fetchArray={this.state.fetchArray} tabValue={this.state.tabvalue} updateAnswer={this.getDataFromAnswer} />);
      default:
            return(<MyShmirot arri={this.state.fetchArray[this.state.tabvalue]} tabValue={this.state.tabvalue} />);
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.fetched ==true ? (
          <Paper className="maincontainer">
            <div className="header-container">
              <h1 className="header">שמירות שלי</h1>
              <div className="divider" />
            </div>
                <div>
                <TabCompShmirot bubbleTabs={this.handletabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabvalue} selectValue={this.state.selectValue} />
                </div>
                <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
        {this.renderByValue()}             
                            </div>

                
              {/* </Paper>
            </div> */}
          </Paper>
        ) : (
            <LoadingPage />
          )}
      </Fragment>
    );
  }
}
export default withRouter(Shmirot);