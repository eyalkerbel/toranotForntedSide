import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import LoadingPage from "./LoadingPage";
import CONFIG from "../configs/env"


import ShmirotTableCompSmall from './ShmirotTableCompSmall'
import TabCompSmall from './TabCompSmall'

export default class ShmirotTable extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            fetchedArri: [],
            fetchMyToranot: [],
            selectedUser: { name: "בחר משתמש" },
            selectValue: 0,
            tabValue: 0,
            toran: 0,
            oldData: null,
            newData: null,
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
    }

    UNSAFE_componentWillMount() {
        console.log("UNSAFE_componentWillMount");
        this.fetchyfetch();
     //   this.fetchToranot();
    }

    fetchyfetch() {
        fetch(CONFIG.API.GETALLTORANUTS, {
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
  

    forFetch(data) {
        fetch(CONFIG.API.GETTHISMONTHSTORANUTS, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: "Bearer " + localStorage.getItem("jwt")
            }
          })
            .then(data => data.json()).then(jsoned => this.setState({fetchMyToranot:jsoned,loaded: true,fetchedArri: data}));
    }
 

    createTable = () => {
        var arri = this.state.fetchedArri.slice(0);
        console.log("arri" , arri ,"my toranot" , this.state.fetchMyToranot );
        return (
            <ShmirotTableCompSmall sendData={this.sendData} fetchMyToranot={this.state.fetchMyToranot} fetchyfetch={this.fetchyfetch.bind(this)} selectedUser={this.state.selectedUser} fetchedArri={arri} tabValue={this.state.tabValue} selectValue={this.state.selectValue} toran={this.state.toran} />
        )
    }

    render() {
        return (
            <Fragment>
                {this.state.loaded ? (
                    <Paper className="maincontainer" >
                        <div className="header-container-new">
                            <h1 className="header">לוח שמירות</h1>
                            <div className="divider" />
                        </div>
                        <div>
                            <TabCompSmall bubbleTabs={this.bubbleTabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabValue} selectValue={this.state.selectValue} />
                        </div>
                        <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
                            <div style={{ flex: "4" }}>
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
