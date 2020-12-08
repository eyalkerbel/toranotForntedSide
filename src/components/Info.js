import React from "react";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { connect } from "react-redux";
import styleExport from "./themeStyle";
import { makeStyles,withStyles  } from '@material-ui/core/styles';

 class Info extends React.Component {
  
  render() {
    const {classes} = this.props;
    return (
      <Paper className="maincontainer">
        <div className={`header-container ${classes.headerStyle}`}>
          <h1 className="header">מידע על תורניות</h1>
          <div className="divider" />
        </div>
        <div style={{ marginBottom: "65px" }}>
        {this.props.jobs.map(element => 
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>{element.name}</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>כמות תורנים ביום: {element.numToranotPerDay}</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תיאור: {element.description}</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}

        </div>
      </Paper>
    );
  }
}


function mapStateToProps(state) {
  return {
    jobs:state.jobs
  }

}

export default (connect(mapStateToProps,null))(withStyles(styleExport)(Info));