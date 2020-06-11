import React from "react";
import CONFIG from "../configs/env"
import Card from "@material-ui/core/Card";
import SignUpSon from "./sonComps/SignUpSon"
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
const Joi = require('joi');
const schema = Joi.object().keys({
    name: Joi.string().min(4).required(),
    sn: Joi.number().min(4).required(),
    password: Joi.string().min(4).required(),
    password2: Joi.string().min(4).required(),
    selectedType: Joi.number().max(1000).required()
})

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            loginCred: {
                name: "",
                sn: "",
                password: "",
                password2: "",
                selectedType: 0
            },
            redirectstate: false,
            isLoaded: false,
            BorderColorState: "input1",
            success: false
        };
    }

    handlelog = () => {
        const result = Joi.validate(this.state.loginCred, schema)
        console.log(result.error)
        if (this.state.loginCred.password === this.state.loginCred.password2 && result.error === null) {
            this.setState({ isLoaded: true });
            var sendableJson = JSON.stringify(this.state.loginCred);
            console.log("handlelog",sendableJson);
            fetch(CONFIG.API.REGISTERUSER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                },
                body: sendableJson
            })
                .then(data => data.json())
                .then(jsoned => {
                    this.props.getUserDatails(this.state.loginCred);
                    this.setState({ success: true })
                })
                .catch(error => this.handleFailedLogin());
        }
        else {
            this.handleFailedLogin();
        }

    }

    handleClass = () => { }

    handleFailedLogin = () => {
        this.setState({ isLoaded: false });
        this.setState({ BorderColorState: "inputfailed" });
    }

    handeChange = (event, type) => {
        this.setState({
            loginCred: {
                ...this.state.loginCred,
                [type]: event.target.value,
            }
        });
    }
    componentDidMount() {
        console.log("signupcomonent");
        var jwt = localStorage.getItem("jwt");
        if (jwt !== null) {
            this.setState({ redirectstate: true });
        }
    }

    componentDidUpdate() {
        if (this.state.redirectstate) {
            window.location.reload()
        }
    }
    render() {
        return (this.state.success === false ?
            <SignUpSon isLoaded={this.state.isLoaded}
                handeChange={this.handeChange}
                handlelog={this.handlelog}
                BorderColorState={this.state.BorderColorState}
                value={this.state.loginCred.selectedType} />
            :
            <div className="loginbackground">
                <Card className="loginholder">
                    <h1>הבקשה נשלחה בהצלחה</h1>
                    <NavLink to="/login">
                        <Button
                            id="submitbtn"
                            style={{
                                backgroundColor: "teal", color: "white", width: "100%", marginTop: "20px", marginBottom: "20px"
                            }}
                        >
                            <h3>חזרה לעמוד הראשי</h3>
                        </Button>
                    </NavLink>
                </Card>
            </div>

        );
    }
}
