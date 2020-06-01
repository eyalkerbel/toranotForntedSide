import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
export default class LoadingPage extends React.Component {
  render() {
    return (
      <div className="loading-page" style={{ height: this.props.size ? "initial" : "100%", width: this.props.size ? "initial" : "100vw" }}>
        <CircularProgress size={100} />
      </div>
    );
  }
}
