import React, { Fragment, Component } from "react";
import MyShmirot from "./MyShmirot";
import { Tab, TableCell } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TableRow from "@material-ui/core/TableRow";
import shortid from 'shortid';

export default class MyShmirotItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            values:10,
            reason: null,
        }
      this.handleclicks = this.handleclicks.bind(this);
    }

    handleclicks(num) {
      this.props.updateParnetClick(this.props.index,num);
    }

    renderSelect() {
      var values = 10;
      switch(this.props.item.userStatus) {
        case "nothappy":
            values=20;
            break;
        case "happy":
            values=30;
            break;
        default:
            values=10;
            break;
      }
    


        return(
          <TableCell TableCell id="tablepadding" key={shortid.generate()} align="center">
          <Select
          className="blob"
          value={values}
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
              לא ידוע
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
              לא נוח
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
              נוח
            </span>
          </MenuItem>
        </Select>
        </TableCell>);
      }



    render() {
        // var todayTime = new Date(this.props.item.date);
        // var month = todayTime.getMonth() + 1;
        // var day = todayTime.getDate();
        // var year = todayTime.getFullYear();
        // var formattedDate = day + "/" + month + "/" + year;
        // var dayofweek = todayTime.getDay();
        // var dayHe = 0;
        // switch (dayofweek) {
        //   case 0:
        //     dayHe = "ראשון";
        //     break;
        //   case 1:
        //     dayHe = "שני";
        //     break;
        //   case 2:
        //     dayHe = "שלישי";
        //     break;
        //   case 3:
        //     dayHe = "רביעי";
        //     break;
        //   case 4:
        //     dayHe = "חמישי";
        //     break;
        //   case 5:
        //     dayHe = "שישי";
        //     break;
        //   case 6:
        //     dayHe = "שבת";
        //     break;
        //   default:
        //     break;
        // }
        // var TranslateType = 0;
        // if (this.props.item.toran === 0) {
        //   switch (this.props.item.type) {
        //     case 0:
        //       TranslateType = "סמל תורן בפנים";
        //       break;
        //     case 1:
        //       TranslateType = "קצין תורן בפנים";
        //       break;
        //     case 2:
        //       TranslateType = "חייל חובה חוץ";
        //       break;
        //     case 3:
        //       TranslateType = "נגד שער";
        //       break;
        //     case 4:
        //       TranslateType = "ע' קצין תורן";
        //       break;
        //     case 5:
        //       TranslateType = "קצין תורן";
        //       break;
        //     case 6:
        //       TranslateType = "מפקד תורן";
        //       break;
        //     default:
        //       break;
        //   }
    
        // } else {
        //   switch (this.props.item.type) {
        //     case 0:
        //       TranslateType = "עתודה של סמל תורן בפנים";
        //       break;
        //     case 1:
        //       TranslateType = "עתודה של קצין תורן בפנים";
        //       break;
        //     case 2:
        //       TranslateType = "עתודה של חייל חובה חוץ";
        //       break;
        //     case 3:
        //       TranslateType = "עתודה של נגד שער";
        //       break;
        //     case 4:
        //       TranslateType = "עתודה של ע' קצין תורן";
        //       break;
        //     case 5:
        //       TranslateType = "עתודה של קצין תורן";
        //       break;
        //     case 6:
        //       TranslateType = "עתודה של מפקד תורן";
        //       break;
        //     default:
        //       break;
        //   }
        // }

      

 console.log("props" , this.props);
         return(
         <TableRow key={shortid.generate()}> 
                  <TableCell id="tablepadding" key={shortid.generate()} align="center">{this.props.item.formattedDate}</TableCell>
                    <TableCell id="tablepadding" key={shortid.generate()} align="center">{this.props.item.dayOfWeek}</TableCell>
                    <TableCell id="tablepadding" key={shortid.generate()} align="center">{this.props.item.type}</TableCell>
                    {this.renderSelect()}
                    </TableRow>
                    );
    }

}

