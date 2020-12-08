import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import LoadingPage from "../LoadingPage";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    moreWidth: {
        width: 300
    }
    
  });

class LoginSon extends React.Component {

    render() {
        const { classes } = this.props;

    return (
        <Fragment>
        <div className="div-all">
        {this.props.isLoaded ? (
                <LoadingPage />
            ) : (
                    <div className="loginbackground">
                        <Card className="loginholder" classes={classes.moreWidth}>
                            {/* <h1>התחבר לנמו</h1> */}
                            <div className="wrapper-mainlog2">
                            <img
                                className="mainlogo2"
                                src={require("../../images/castle.png")}
                                alt=""
                            ></img>
                            </div>
                            {/* <div className="wrapper-inputs"> */}
                            <input
                                style={{ marginTop: "30px" }}
                                onChange={this.props.handeChange1}
                                className={this.props.BorderColorState}
                                type="text"
                                placeholder="ת.ז"
                                id="input1"
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        this.props.handlelog();
                                    }
                                }}
                            ></input>
                            <input
                                style={{ marginTop: "20px" }}
                                onChange={this.props.handeChange2}
                                className={this.props.BorderColorState}
                                type="password"
                                placeholder="סיסמה"
                                id="input2"
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        this.props.handlelog();
                                    }
                                }}
                            ></input>
                            {/* </div> */}
                            <Button
                                id="submitbtn"
                                style={{
                                    backgroundColor: "teal", color: "white", width: "100%", marginTop: "20px"
                                }}
                                onClick={() => this.props.handlelog()}
                            >
                                <h3>התחבר</h3>
                            </Button>
                            <NavLink to="/signup">
                                <Button
                                    id="submitbtn"
                                    style={{
                                        backgroundColor: "teal", color: "white", width: "100%", marginTop: "20px", marginBottom: "20px"
                                    }}
                                    onClick={() => this.props.handlelog()}
                                >
                                    <h3>הירשם למבצר</h3>
                                </Button>
                            </NavLink>
                        </Card>
                    </div>
                )}
                </div>
                </Fragment>
    )
                }
}


export default withStyles(styles)(LoginSon);