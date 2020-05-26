import React from "react";
import "material-icons";
import Card from "@material-ui/core/Card";
import { Paper, CardActionArea } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default class HomePage extends React.Component {
  render() {
    return (
      <Paper className="maincontainer">
        <div className="header-container">
          <h1 className="header">מערכת לניהול שמירות</h1>
          <div className="divider" />
        </div>
        <div className="infocard-container1">
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/shmirot"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">calendar_today</i>
                <h1>שמירות שלי</h1>
                <p>התורנויות שלך לחודש ולחודש הבא.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/shmirottable"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">insert_drive_file</i>
                <h1>לוח שמירות</h1>
                <p>לוח שמירות של כולם לחודש ולחודש הבא.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          {/* <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/tfasim"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">insert_drive_file</i>
                <h1>טפסים</h1>
                <p>כל הטפסים והקישורים שצריך כדי לשמור.</p>
              </CardActionArea>
            </NavLink>
          </Card> */}
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/personal"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">account_circle</i>
                <h1>פרטים אישיים</h1>
                <p>להתעדכן בפרטים האישיים שלך.</p>
              </CardActionArea>
            </NavLink>
          </Card>
        </div>
        <div className="infocard-container2">
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/info"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">info</i>
                <h1>מידע על שמירות</h1>
                <p>כל המידע על שמירות, לאן צריך להגיע ומתי.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/haadafot"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">insert_invitation</i>
                <h1>העדפות ואילוצים</h1>
                <p>הזנת העדפות ואילוצים.</p>
              </CardActionArea>
            </NavLink>
          </Card>
          <Card className="infocard">
            <NavLink
              style={{ color: "initial", height: "100%", padding: "initial" }}
              to="/contacts"
            >
              <CardActionArea className="cc3">
                <i className="material-icons icons">contacts</i>
                <h1>אנשי קשר</h1>
                <p>אנשי קשר למקרה הצורך.</p>
              </CardActionArea>
            </NavLink>
          </Card>
        </div>
      </Paper>
    );
  }
}
