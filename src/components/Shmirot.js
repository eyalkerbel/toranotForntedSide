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
import LoadingPage from "./LoadingPage";
import CircularProgress from "@material-ui/core/CircularProgress";
import CONFIG from "../configs/env"


export default class Shmirot extends React.Component {
  constructor() {
    super();
    this.state = {
      tabvalue: 0,
      fetched: false,
      arri: [],
      blop: <LoadingPage />
    };
    this.handletabs = this.handletabs.bind(this);
    this.fetchyfetch = this.fetchyfetch.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
  }

  renderTableData() {
    var arrRender = [];
    for (var i = 0; i < this.state.arri.length; i++) {
      var obi = {
        obiData: (
          <TableRow>
            <TableCell align="center">{this.state.arri[i].type}</TableCell>
            <TableCell align="center">
              {this.state.arri[i].formattedDate}
            </TableCell>
            <TableCell align="center">{this.state.arri[i].dayOfWeek}</TableCell>
          </TableRow>
        )
      };
      arrRender.push(obi.obiData);
    }

    return arrRender;
  }

  handletabs(num) {
    this.setState({ tabvalue: num });
  }

  getFormattedDate(jsoned) {
    var arri = [];
    for (var i = 0; i < jsoned.length; i++) {
      var todayTime = new Date(jsoned[i].date);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      var formattedDate = day + "/" + month + "/" + year;
      var dayofweek = todayTime.getDay();
      var dayHe = 0;
      switch (dayofweek) {
        case 0:
          dayHe = "ראשון";
          break;
        case 1:
          dayHe = "שני";
          break;
        case 2:
          dayHe = "שלישי";
          break;
        case 3:
          dayHe = "רביעי";
          break;
        case 4:
          dayHe = "חמישי";
          break;
        case 5:
          dayHe = "שישי";
          break;
        case 6:
          dayHe = "שבת";
          break;
        default:
          break;
      }
      var TranslateType = 0;
      if (jsoned[i].toran === 0) {
        switch (jsoned[i].type) {
          case 0:
            TranslateType = "סמל תורן בפנים";
            break;
          case 1:
            TranslateType = "קצין תורן בפנים";
            break;
          case 2:
            TranslateType = "חייל חובה חוץ";
            break;
          case 3:
            TranslateType = "נגד שער";
            break;
          case 4:
            TranslateType = "ע' קצין תורן";
            break;
          case 5:
            TranslateType = "קצין תורן";
            break;
          case 6:
            TranslateType = "מפקד תורן";
            break;
          default:
            break;
        }

      } else {
        switch (jsoned[i].type) {
          case 0:
            TranslateType = "עתודה של סמל תורן בפנים";
            break;
          case 1:
            TranslateType = "עתודה של קצין תורן בפנים";
            break;
          case 2:
            TranslateType = "עתודה של חייל חובה חוץ";
            break;
          case 3:
            TranslateType = "עתודה של נגד שער";
            break;
          case 4:
            TranslateType = "עתודה של ע' קצין תורן";
            break;
          case 5:
            TranslateType = "עתודה של קצין תורן";
            break;
          case 6:
            TranslateType = "עתודה של מפקד תורן";
            break;
          default:
            break;
        }
      }
      var obi = {
        dayOfWeek: dayHe,
        type: TranslateType,
        formattedDate: formattedDate
      };

      arri.push(obi);
    }
    this.setState({ arri: arri });
    this.setState({ fetched: true });
  }

  fetchyfetch(num) {
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
                  // borderTopLeftRadius: "10px",
                  // borderTopRightRadius: "10px",
                  overflow: "hidden"
                }}
              >
                <AppBar position="static" style={{ backgroundColor: "white" }}>
                  <Tabs
                    style={{
                      backgroundColor: "white",
                      color: "teal"
                      // borderTopLeftRadius: "10px",
                      // borderTopRightRadius: "10px"
                    }}
                    value={this.state.tabvalue}
                    // index={1}
                    // onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab
                      label="חודש הנוכחי"
                      onClick={() => {
                        this.handletabs(0);
                        this.fetchyfetch(1);
                      }}
                    />
                    <Tab
                      label="חודש הבא"
                      onClick={() => {
                        this.handletabs(1);
                        this.fetchyfetch3(1);
                      }}
                    />
                  </Tabs>
                </AppBar>
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
    fetch(CONFIG.API.GETTHISMONTHSTORANUTS, {
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
                  // borderTopLeftRadius: "10px",
                  // borderTopRightRadius: "10px",
                  overflow: "hidden"
                }}
              >
                <AppBar position="static" style={{ backgroundColor: "white" }}>
                  <Tabs
                    style={{
                      backgroundColor: "white",
                      color: "teal"
                      // borderTopLeftRadius: "10px",
                      // borderTopRightRadius: "10px"
                    }}
                    value={this.state.tabvalue}
                    // index={1}
                    // onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab
                      label="חודש הנוכחי"
                      onClick={() => {
                        this.handletabs(0);
                        this.fetchyfetch(1);
                      }}
                    />
                    <Tab
                      label="חודש הבא"
                      onClick={() => {
                        this.handletabs(1);
                        this.fetchyfetch3(1);
                      }}
                    />
                  </Tabs>
                </AppBar>
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

  componentDidMount() {
    this.fetchyfetch();
  }

  render() {
    return (
      <Fragment>
        {this.state.fetched ? (
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
                  // borderTopLeftRadius: "10px",
                  // borderTopRightRadius: "10px",
                  overflow: "hidden"
                }}
              >
                <AppBar position="static" style={{ backgroundColor: "white" }}>
                  <Tabs
                    style={{
                      backgroundColor: "white",
                      color: "teal"
                      // borderTopLeftRadius: "10px",
                      // borderTopRightRadius: "10px"
                    }}
                    value={this.state.tabvalue}
                    // index={1}
                    // onChange={handleChange}
                    aria-label="simple tabs example"
                  >
                    <Tab
                      label="חודש הנוכחי"
                      onClick={() => {
                        this.handletabs(0);
                        this.fetchyfetch(1);
                      }}
                    />
                    <Tab
                      label="חודש הבא"
                      onClick={() => {
                        this.handletabs(1);
                        this.fetchyfetch3(1);
                      }}
                    />
                  </Tabs>
                </AppBar>
                <Table>
                  <TableHead>
                    <TableRow align="center">
                      <TableCell align="center">סוג תורנות</TableCell>
                      <TableCell align="center">תאריך</TableCell>
                      <TableCell align="center">יום בשבוע</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{this.renderTableData()}</TableBody>
                </Table>
              </Paper>
            </div>
          </Paper>
        ) : (
            this.state.blop
          )}
      </Fragment>
    );
  }
}
