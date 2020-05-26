import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import { Grid, TextField, RadioGroup, FormControlLabel, FormLabel, Radio, Button } from '@material-ui/core'
import CONFIG from "../configs/env"
import { Select, MenuItem } from "@material-ui/core";


export default class CreateUser extends React.Component {
    constructor() {
        super()
        this.state = {
            password: null,
            name: null,
            userid: null,
            permissionlvl: "user",
            type: 0,
            status: "",
            loading: false
        }
    }

    handleSelect = (event) => {
        this.setState({ type: event.target.value })
    }

    createForm = () => {
        return (
            <React.Fragment>
                <Grid container spacing={3} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: 16 }}>
                    <Grid item xs={12} md={12}>
                        <TextField required id="userid" label="User ID" fullWidth onChange={this.myChangeHandler1} value={this.state.userid} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField required id="name" label="Name" fullWidth onChange={this.myChangeHandler2} value={this.state.name} />
                    </Grid>
                    <Grid item xs={12} md={12} className="lefttext">
                        <Select value={this.state.type} onChange={this.handleSelect} style={{ width: "100%" }} >
                            <MenuItem value={0}>סמל תורן בפנים</MenuItem>
                            <MenuItem value={1}>קצין תורן בפנים</MenuItem>
                            <MenuItem value={2}>חייל חובה חוץ</MenuItem>
                            <MenuItem value={3}>נגד שער</MenuItem>
                            <MenuItem value={4}>ע' קצין תורן</MenuItem>
                            <MenuItem value={5}>קצין תורן</MenuItem>
                            <MenuItem value={6}>מפקד תורן</MenuItem>

                        </Select>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField required id="password" label="Password" fullWidth onChange={this.myChangeHandler3} value={this.state.password} />
                    </Grid>
                    <Grid item xs={12} md={12} Align="right" >
                        <FormLabel component="legend">Permission Level</FormLabel>
                        <RadioGroup defaultValue="regular" aria-label="regular" name="customized-radios">
                            <FormControlLabel onClick={() => this.radioHandler(1)} value="regular" control={<Radio />} label="Regular" />
                            <FormControlLabel onClick={() => this.radioHandler(2)} value="administrator" control={<Radio />} label="Administrator" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <h1 style={{ color: this.state.status === "failed" ? "red" : "green" }}>{this.state.status}</h1>
                        <Button disabled={this.state.loading ? true : false} onClick={() => this.sendDataToServer()} variant="contained" style={{ width: "100%", height: "50px" }}>Submit</Button>
                    </Grid>
                </Grid>
            </React.Fragment >
        );
    }
    myChangeHandler1 = (event) => {
        this.setState({ userid: event.target.value });
    }
    myChangeHandler2 = (event) => {
        this.setState({ name: event.target.value });
    }
    myChangeHandler3 = (event) => {
        this.setState({ password: event.target.value });
    }

    radioHandler = (num) => {
        if (num === 1) {
            this.setState({ permissionlvl: "user" })
        } else if (num === 2) {
            this.setState({ permissionlvl: "admin" })
        }
    }

    sendDataToServer = () => {
        this.setState({ loading: true })
        let dat = {
            password: this.state.password,
            name: this.state.name,
            userid: this.state.userid,
            permissionlvl: this.state.permissionlvl,
            type: this.state.type
        }
        fetch(CONFIG.API.CREATEUSER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(dat)
        })
            .then(res => res.status === 200 ? this.success() : this.failed())
            .catch((err) => this.failed(err))

    }

    success = () => {
        this.setState({
            password: "",
            name: "",
            userid: "",
            permissionlvl: "user",
            type: 0,
            status: "success",
            loading: false
        })
    }
    failed = () => {
        this.setState({ status: "failed", loading: false })
    }

    render() {
        return (
            <Fragment>
                {this.props.permissionlvl === "admin" ?
                    <Paper className="maincontainer">
                        <div className="header-container">
                            <h1 className="header">Create User Panel</h1>
                            <div className="divider" />
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            {this.createForm()}
                        </div>
                    </Paper>
                    : window.location.href = "/home"
                }
            </Fragment>
        );
    }
}
