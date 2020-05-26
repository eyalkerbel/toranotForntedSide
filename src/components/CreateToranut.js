import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import LoadingPage from "./LoadingPage";

import List from '@material-ui/core/List';

import ShmirotTableComp from './ShmirotTableComp'
import TabComp from './TabComp'
import UserListComp from './UserListComp'

import CONFIG from "../configs/env"


import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

export default class CreateToranut extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            fetchedArri: [],
            selectedUser: { name: "בחר משתמש" },
            selectValue: 0,
            tabValue: 0,
            toran: 0,
            fetchedHaadafot: []
        };
    }

    radioHandler = (num) => {
        this.setState({ toran: num })
    }


    //appbar functions
    bubbleTabs = (num) => {
        this.setState({ tabValue: num });
    }

    bubbleSelect = (num) => {
        this.setState({ selectValue: num })
    }

    selectUser = (el) => {
        this.setState({ selectedUser: el })
        this.fetchHaadafa(el)
    }

    UNSAFE_componentWillMount() {
        this.fetchyfetch();
    }

    fetchyfetch() {
        fetch(CONFIG.API.CREATETORANUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(data => data.json())
            .then(dat => this.forFetch(dat))
            .catch(err => console.log(err));
    }

    fetchHaadafa = (userid) => {
        var stringed = JSON.stringify(userid)
        fetch(CONFIG.API.GETHAADAFOTBYUSER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: stringed
        })
            .then(data => data.json())
            .then(jsoned => this.setState({ fetchedHaadafot: jsoned }))
            .catch(err => console.log(err));
    }

    forFetch(data) {
        this.setState({ fetchedArri: data });
        this.setState({ loaded: true });
    }

    createTable = () => {
        var arri = this.state.fetchedArri.slice(0);
        arri.shift()
        return (
            <ShmirotTableComp
                fetchyfetch={this.fetchyfetch.bind(this)}
                fetchedHaadafot={this.state.fetchedHaadafot}
                selectedUser={this.state.selectedUser}
                fetchedArri={arri}
                tabValue={this.state.tabValue}
                selectValue={this.state.selectValue}
                toran={this.state.toran} />
        )
    }

    render() {
        return (
            <Fragment>
                {this.state.loaded ? (
                    <Paper className="maincontainer" >
                        <div className="header-container">
                            <h1 className="header">יצירת שמירה</h1>
                            <div className="divider" />
                        </div>
                        <div>
                            <TabComp selectedUser={this.state.selectedUser} bubbleTabs={this.bubbleTabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabValue} selectValue={this.state.selectValue} />
                        </div>
                        <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
                            <div style={{ flex: "1", border: "2px solid teal", marginTop: "10px" }}>
                                <List style={{ height: "60vh", overflow: "auto", direction: "ltr", borderBottom: "2px solid teal" }}>
                                    <UserListComp selectValue={this.state.selectValue} selectUser={this.selectUser} arri={this.state.fetchedArri[0]} />
                                </List>
                                <RadioGroup defaultValue="0" aria-label="regular" name="customized-radios">
                                    <FormControlLabel onClick={() => this.radioHandler(0)} value="0" control={<Radio />} label="תורן" />
                                    <FormControlLabel onClick={() => this.radioHandler(1)} value="1" control={<Radio />} label="עתודה" />
                                </RadioGroup>
                            </div>
                            <div style={{ flex: "7" }}>
                                {this.createTable()}
                            </div>
                        </div>
                    </Paper>
                ) : (
                        <LoadingPage >
                        </LoadingPage>
                    )
                }
            </Fragment>
        );
    }
}
