import React from "react";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

export default class Info extends React.Component {
  render() {
    return (
      <Paper className="maincontainer">
        <div className="header-container">
          <h1 className="header">מידע על שמירות</h1>
          <div className="divider" />
        </div>
        <div style={{ marginBottom: "65px" }}>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>חייל חובה חוץ</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: נגררת קליטות והצבות, טופס מק-פורק, פנקס קליעה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>הרשמה: ב9:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>חותמים על נשק: ב9:30 בנשקייה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תדרוך: ב10:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>עלייה לשמירה: ב10:30</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: כן</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>חייל חובה חוץ(שבת)</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: נגררת קליטות והצבות, טופס מק-פורק, פנקס קליעה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>הרשמה: יום חמישי ב9:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>חותמים על נשק: יום חמישי ב9:30 בנשקייה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תדרוך: יום חמישי ב10:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה: יום חמישי ב10:30</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: כן</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>נגד שער</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: אין צורך בטפסים</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>
                תדרוך: כשהשמירה בבוקר באים יום לפני לתדרוך ב9:00, כשהשמירה
                בצהריים באים באותו היום ב9:00 לתדרוך
              </p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p> שמירה בבוקר: ב7:00-10:00</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה בצהריים: ב15:00-18:00</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: לא</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>ע' קצין תורן</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: אין צורך בטפסים</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תדרוך: ב9:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה: מ10:00-15:00</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: לא</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>ע' קצין תורן(שבת)</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: נגררת קליטות והצבות, טופס מק-פורק, פנקס קליעה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תדרוך: יום חמישי ב9:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה: יום חמישי מ10:00-15:00</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: כן</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>קצין תורן</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: נגררת קליטות והצבות, טופס מק-פורק, פנקס קליעה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תדרוך: ב9:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה: ב10:30</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: כן</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>קצין תורן(שבת)</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: נגררת קליטות והצבות, טופס מק-פורק, פנקס קליעה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תדרוך: יום חמישי ב9:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה: יום חמישי ב10:30</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: כן</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>מפקד תורן</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: נגררת קליטות והצבות, טופס מק-פורק, פנקס קליעה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תדרוך: ב9:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה: ב10:30</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: כן</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary className="panels">
              <i className="material-icons icons4">info</i>
              <h1>מפקד תורן</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="panels">
              <p>טפסים: נגררת קליטות והצבות, טופס מק-פורק, פנקס קליעה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>תדרוך:יום חמישי ב9:00 אצל קצין האבטחה</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה: יום חמישי ב10:30</p>
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className="panels">
              <p>שמירה עם נשק: כן</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Paper>
    );
  }
}
