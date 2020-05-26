import React from "react";
import Paper from "@material-ui/core/Paper";
import { ListItem } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import "material-icons";

export default class Tfasim extends React.Component {
  render() {
    return (
      <Paper className="maincontainer">
        <div className="header-container">
          <h1 className="header">טפסים</h1>
          <div className="divider" />
        </div>
        <Paper className="bibi">
          <ListItem className="download-list-heading">
            <h1>להורדה</h1>
          </ListItem>
          <Divider />
          <ListItem button className="download-list">
            <i className="material-icons icons3">arrow_downward</i>
            <p>מק-פורק</p>
          </ListItem>
          <Divider />
          <ListItem button className="download-list">
            <i className="material-icons icons3">arrow_downward</i>
            <p>נשק מחוץ ליחידה</p>
          </ListItem>
          <Divider />
          <ListItem button className="download-list">
            <i className="material-icons icons3">arrow_downward</i>
            <p>פנקס קליעה</p>
          </ListItem>
        </Paper>
      </Paper>
    );
  }
}
