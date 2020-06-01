import React from "react";
import Paper from "@material-ui/core/Paper";
export default class Personal extends React.Component {
  render() {
    return (
      <Paper className="maincontainer">
        <div className="header-container">
          <h1 className="header">פרטים אישיים</h1>
          <div className="divider" />
          <h3 style={{ marginTop: "30px" }}>עמוד זה בפיתוח..</h3>
        </div>
      </Paper>
    );
  }
}
