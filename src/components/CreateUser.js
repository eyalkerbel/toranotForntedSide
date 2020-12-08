import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import { Grid, TextField, RadioGroup, FormControlLabel, FormLabel, Radio, Button } from '@material-ui/core'
import CONFIG from "../configs/env"
import { Select, MenuItem } from "@material-ui/core";
import {connect} from "react-redux";
import styleExport from "./themeStyle";
import {ThemeContext} from '.././ColorMode/colors';

import { makeStyles,withStyles } from '@material-ui/core/styles';


 class CreateUser extends React.Component {
    constructor() {
        super()
        this.state = {
            password: null,
            name: null,
            userid: null,
            permissionlvl: "user",
            type: 0,
            indexType:0,
            status: "",
            loading: false
        }
    }
    static contextType = ThemeContext;

    componentWillMount() {
        var intinalType = 0;
        if(this.props.jobs.length != 0) {
            intinalType = this.props.jobs[0]._id;
        }
        this.setState({type:intinalType});
    }

    handleSelect = (event) => {
        this.setState({ type: this.props.jobs[event.target.value]._id,indexType: event.target.value });
    }
   

    createForm = () => {
        const {classes} = this.props;
        const inputClass = {
        fontSize: 24,
        color: this.context.theme
        };
        const labelClass = {
            right:0,color:this.context.exteme,fontSize: 24
        };

        return (
            <React.Fragment>
                <Grid container spacing={3} style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: 16 }}>
                    <Grid item xs={12} md={12}>
                        <TextField InputProps={{style: inputClass}}  InputLabelProps={{style: labelClass}} required id="userid" label="ת.ז" fullWidth onChange={this.myChangeHandler1} value={this.state.userid} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField label="שם משתמש" id="standard-full-width" InputProps={{style: inputClass}}  InputLabelProps={{style: labelClass}} required id="name"  fullWidth onChange={this.myChangeHandler2} value={this.state.name} />
                    </Grid>
                    <Grid item xs={12} md={12} className="lefttext">
                        <Select value={this.state.indexType} onChange={this.handleSelect} style={{ width: "100%",color: this.context.exteme }} >
                        {this.props.jobs.map((element,index) => <MenuItem value={index}>{element.name}</MenuItem>)}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField  InputProps={{style: inputClass}}  InputLabelProps={{style: labelClass}} required id="password" label="סיסמא" fullWidth onChange={this.myChangeHandler3} value={this.state.password} />
                    </Grid>
                    <Grid item xs={12} md={12} Align="right" >
                        <FormLabel style={{color:this.context.exteme}}   component="legend">רמת הרשאה</FormLabel>
                        <RadioGroup  defaultValue="regular" aria-label="regular" name="customized-radios">
                            <FormControlLabel style={{color:this.context.exteme}}  onClick={() => this.radioHandler(1)} value="regular" control={<Radio className={classes.labelControl} />} label="רגיל" />
                            <FormControlLabel style={{color:this.context.exteme}}   onClick={() => this.radioHandler(2)} value="administrator" control={<Radio className={classes.labelControl} />} label="מנהל" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <h1 style={{ color: this.state.status === "failed" ? "red" : "green" }}>{this.state.status}</h1>
                        <Button disabled={this.state.loading ? true : false} onClick={() => this.sendDataToServer()} variant="contained" style={{ width: "100%", height: "50px",backgroundColor: this.context.bodyText }}>Submit</Button>
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
            type: this.state.type,
            points: 0
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
            status: "success",
            loading: false
        })
    }
    failed = () => {
        this.setState({ status: "failed", loading: false })
    }

    render() {
        console.log("renderCr" , this.props);
        const {classes} = this.props;
        return (
            <Fragment>
                {this.props.permissionlvl === "admin" ?
                    <Paper className="maincontainer">
                    <div className={`header-container ${classes.headerStyle}`}>
                            <h1 className="header">צור משתמש</h1>
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


function mapStateToProps(state) {
    return {
        jobs: state.jobs
    }
}
export default connect(mapStateToProps,null)(withStyles(styleExport)(CreateUser));