import React from "react";
import Paper from "@material-ui/core/Paper";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { he } from "date-fns/locale";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export default class Haadafot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate1: new Date().setHours(0, 0, 0, 0),
      selectedDate2: new Date().setHours(0, 0, 0, 0),
      values: 10,
      reason: "ishi"
    };
    this.handleclicks = this.handleclicks.bind(this);
    this.handledate1 = this.handledate1.bind(this);
    this.handledate2 = this.handledate2.bind(this);
    this.sendToParent = this.sendToParent.bind(this);
  }

  componentDidMount() {
    this.sendToParent();
  }
  UNSAFE_componentWillMount() {
    if (this.props.data != null) {
      this.setState({ selectedDate1: this.props.data.begindate });
      this.setState({ selectedDate2: this.props.data.enddate });
      this.setState({ reason: this.props.data.type });
      var val = this.props.data.type;
      switch (val) {
        case "ishi":
          this.setState({ values: 10, reason: "ishi" });
          break;
        case "limudim":
          this.setState({ values: 20, reason: "limudim" });
          break;
        case "hool":
          this.setState({ values: 30, reason: "hool" });
          break;
        default:
          break;
      }
    }
  }
  componentDidUpdate() {
    this.sendToParent();
  }
  sendToParent() {
    var x = this.state.selectedDate1;
    var y = this.state.selectedDate2;
    var count = this.props.compCount;
    var g = this.state.reason;
    this.props.getDataFromSon(x, y, count, g)
  }

  handleclicks(num) {
    switch (num) {
      case 10:
        this.setState({ values: num, reason: "ishi" });
        break;
      case 20:
        this.setState({ values: num, reason: "limudim" });
        break;
      case 30:
        this.setState({ values: num, reason: "hool" });
        break;
      default:
        break;
    }
  }

  handledate1(day) {
    let final = 0;
    let begin = new Date(day)
    let end = new Date(this.state.selectedDate2)
    let sub = end.getTime() - begin.getTime()
    final += (sub / (1000 * 3600 * 24)) + 1
    let f1 = 8 - final
    console.log(f1)

    if (this.props.dayCount < 0 || f1 < 0) {
      this.setState({ selectedDate1: new Date().setHours(0, 0, 0, 0), selectedDate2: new Date().setHours(0, 0, 0, 0) });
      alert("חרגת מכמות מקסימלית של אילוצים")
    } else {
      this.setState({ selectedDate1: day });
    }

  }
  handledate2(day) {
    let final = 0;
    let begin = new Date(this.state.selectedDate1)
    let end = new Date(day)
    let sub = end.getTime() - begin.getTime()
    final += (sub / (1000 * 3600 * 24)) + 1
    let f1 = 8 - final
    console.log(f1)

    if (this.props.dayCount < 0 || f1 < 0) {
      this.setState({ selectedDate2: new Date().setHours(0, 0, 0, 0), selectedDate1: new Date().setHours(0, 0, 0, 0) });
      alert("חרגת מכמות מקסימלית של אילוצים")
    } else {
      this.setState({ selectedDate2: day });
    }
  }
  render() {
    return (
      <Paper>
        <div className="haadafotholder">
          <p className="blobi">תאריך תחילה</p>
          <p className="blobi">תאריך סיום</p>
          <p className="blobi">סוג אילוץ</p>
        </div>
        <div className="haadafotholder">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
            <DatePicker
              value={this.state.selectedDate1}
              onChange={this.handledate1}
              className="blob"
              style={{ cursor: "pointer" }}
              format="dd/MM/yyyy"
              okLabel="סיום"
              cancelLabel="ביטול"
              rightArrowIcon={<i className="material-icons">chevron_left</i>}
              leftArrowIcon={<i className="material-icons">chevron_right</i>}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
            <DatePicker
              value={this.state.selectedDate2}
              onChange={this.handledate2}
              className="blob"
              style={{ cursor: "pointer" }}
              format="dd/MM/yyyy"
              okLabel="סיום"
              cancelLabel="ביטול"
              rightArrowIcon={<i className="material-icons">chevron_left</i>}
              leftArrowIcon={<i className="material-icons">chevron_right</i>}
            />
          </MuiPickersUtilsProvider>
          <Select
            className="blob"
            value={this.state.values}
            inputProps={{
              name: "age",
              id: "age-simple"
            }}
          >
            <MenuItem value={10}>
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px"
                }}
                onClick={() => this.handleclicks(10)}
              >
                אישי
              </span>
            </MenuItem>
            <MenuItem value={20}>
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px"
                }}
                onClick={() => this.handleclicks(20)}
              >
                לימודים
              </span>
            </MenuItem>
            <MenuItem value={30}>
              <span
                style={{
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px"
                }}
                onClick={() => this.handleclicks(30)}
              >
                חול
              </span>
            </MenuItem>
          </Select>
        </div>
      </Paper>
    );
  }
}