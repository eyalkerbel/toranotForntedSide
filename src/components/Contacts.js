import React from "react";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";

import styleExport from "./themeStyle";
import { makeStyles,withStyles  } from '@material-ui/core/styles';

class Contacts extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <Paper className="maincontainer">
        <div className={`header-container ${classes.headerStyle}`}>
          <h1 className="header">אנשי קשר</h1>
          <div className="divider" />
        </div>
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">account_circle</i>
              <h1>קנ"ל מפת"ח מרכז</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>שם: רונן קרויטנר</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>פלאפון: 0548081360</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">account_circle</i>
              <h1>מפקד מרכז ניטור</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>שם: ראובן קורטוריו</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>פלאפון: 0525123786</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">account_circle</i>
              <h1>קצין אבטחה מקשל"ר</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>שם: שלום יודקין (דובי)</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>פלאפון: 0547236756069</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">account_circle</i>
              <h1>מפקד מקשל"ר</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>שם: איציק </p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>פלאפון: 0529270422</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">account_circle</i>
              <h1>חמ"ל מקשל"ר</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>שם: חמ"ל </p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>פלאפון: 036756069</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">account_circle</i>
              <h1>רע"ן מ"מ</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>שם: מקסים חנדרוס </p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>פלאפון: 0529250390</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Paper>
    );
  }
}
export default (connect(null,null))(withStyles(styleExport)(Contacts));