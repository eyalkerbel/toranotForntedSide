import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import LoadingPage from "../LoadingPage";
import { Select, MenuItem } from "@material-ui/core";

export default function LoginSon(props) {
    return (
        <div className="loginbackground">
            <Card className="loginholder">

                {props.isLoaded ? (
                    <LoadingPage size={true} />
                ) : (
                        <Fragment>
                            <input
                                style={{ marginTop: "30px" }}
                                onChange={(e) => props.handeChange(e, "name")}
                                className={props.BorderColorState}
                                type="text"
                                placeholder="שם מלא"
                                // id="input1"
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        props.handlelog();
                                    }
                                }}
                            ></input>
                            <input
                                style={{ marginTop: "20px" }}
                                onChange={(e) => props.handeChange(e, "sn")}
                                className={props.BorderColorState}
                                type="text"
                                placeholder="ת.ז"
                                // id="input2"
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        props.handlelog();
                                    }
                                }}
                            ></input>
                            <input
                                style={{ marginTop: "20px" }}
                                onChange={(e) => props.handeChange(e, "password")}
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

                            <input
                                style={{ marginTop: "20px" }}
                                onChange={(e) => props.handeChange(e, "password2")}
                                className={props.BorderColorState}
                                type="password"
                                placeholder="סיסמה פעם שניה"
                                // id="input2"
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        props.handlelog();
                                    }
                                }}
                            ></input>
                            <Select value={props.value} style={{ width: "100%", marginTop: "10px" }} onChange={(e) => props.handeChange(e, "selectedType")} >
                                <MenuItem style={{ justifyContent: "center" }} value={0}>סמל תורן בפנים</MenuItem>
                                <MenuItem style={{ justifyContent: "center" }} value={1}>קצין תורן בפנים</MenuItem>
                                <MenuItem style={{ justifyContent: "center" }} value={2}>חייל חובה חוץ</MenuItem>
                                <MenuItem style={{ justifyContent: "center" }} value={3}>נגד שער</MenuItem>
                                <MenuItem style={{ justifyContent: "center" }} value={4}>ע' קצין תורן</MenuItem>
                                <MenuItem style={{ justifyContent: "center" }} value={5}>קצין תורן</MenuItem>
                                <MenuItem style={{ justifyContent: "center" }} value={6}>מפקד תורן</MenuItem>
                                <MenuItem style={{ justifyContent: "center" }} value={999}>לא עולה תורניות</MenuItem>
                            </Select>
                            <Button
                                id="submitbtn"
                                style={{
                                    backgroundColor: "teal", color: "white", width: "100%", marginTop: "20px", marginBottom: "20px"
                                }}
                                onClick={() => props.handlelog()}
                            >
                                <h3>הירשם</h3>
                            </Button>
                        </Fragment>

                    )}
            </Card>
        </div>


    )
}