import React, { Fragment, Component } from "react";
import MyShmirot from "./MyShmirot";
import { Tab, TableCell } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TableRow from "@material-ui/core/TableRow";
import shortid from 'shortid';
import {connect} from "react-redux";
 class MyShmirotItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            values:10,
            reason: null,
        }
      this.handleclicks = this.handleclicks.bind(this);
    }

    handleclicks(num) {
      console.log("numy", num );
      this.props.updateParnetClick(this.props.index,num,this.props.indexAll);

    }
    returnType() {
      const {type} = this.props.userState;
      for(var i=0;i<this.props.jobs.length;i++) {
        if(type == this.props.jobs[i]._id) {
          return this.props.jobs[i].description;
        }
      }
    }
    renderSelect() {
      var values = 10;
      console.log("userStatuss" , this.props.item);
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

UNSAFE_componentWillReceiveProps() {
  console.log("recvie");
}

    render() {
      console.log("renderItemm");
 console.log("renderItem" , this.props);
         return(
         <TableRow key={shortid.generate()}> 
                  <TableCell id="tablepadding" key={shortid.generate()} align="center">{this.props.item.formattedDate}</TableCell>
                    <TableCell id="tablepadding" key={shortid.generate()} align="center">{this.props.item.dayOfWeek}</TableCell>
                    <TableCell id="tablepadding" key={shortid.generate()} align="center">{this.returnType()}</TableCell>
                    {this.renderSelect()}
                    </TableRow>
                    );
    }

}

function mapStateToProps(state) {
  return {
    userState: state.user,
    jobs: state.jobs
  }
}

export default connect(mapStateToProps,null)(MyShmirotItem);