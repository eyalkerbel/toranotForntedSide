import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import LoadingPage from "../LoadingPage";
import { NavLink } from "react-router-dom";

export default function LoginSon(props) {
    return (
        <Fragment>
            {props.isLoaded ? (
                <LoadingPage />
            ) : (
                    <div className="loginbackground">
                        <Card className="loginholder">
                            {/* <h1>התחבר לנמו</h1> */}
                            <img
                                className="mainlogo2"
                                src={require("../../images/logoNemo2.png")}
                                alt=""
                            ></img>
                            <input
                                style={{ marginTop: "30px" }}
                                onChange={props.handeChange1}
                                className={props.BorderColorState}
                                type="text"
                                placeholder="ת.ז"
                                id="input1"
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        props.handlelog();
                                    }
                                }}
                            ></input>
                            <input
                                style={{ marginTop: "20px" }}
                                onChange={props.handeChange2}
                                className={props.BorderColorState}
                                type="password"
                                placeholder="סיסמה"
                                id="input2"
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        props.handlelog();
                                    }
                                }}
                            ></input>
                            <Button
                                id="submitbtn"
                                style={{
                                    backgroundColor: "teal", color: "white", width: "100%", marginTop: "20px"
                                }}
                                onClick={() => props.handlelog()}
                            >
                                <h3>התחבר</h3>
                            </Button>
                            <NavLink to="/signup">
                                <Button
                                    id="submitbtn"
                                    style={{
                                        backgroundColor: "teal", color: "white", width: "100%", marginTop: "20px", marginBottom: "20px"
                                    }}
                                    onClick={() => props.handlelog()}
                                >
                                    <h3>הירשם לנמו</h3>
                                </Button>
                            </NavLink>
                        </Card>
                    </div>
                )}
        </Fragment>

    )
}