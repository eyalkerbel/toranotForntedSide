import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import LoadingPage from "../LoadingPage";

import List from '@material-ui/core/List';

import ShmirotTableComp from './ShmirotTableComp'
import TabComp from '../TabComp'
import UserListComp from './UserListComp'
import CONFIG from "../../configs/env"
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';


export default class CreateToranut extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            fetchedArri: [],
             selectedUser: { name: "בחר משתמש" },
            // selectedUser: "בחר משתמש",
            selectValue: 0,
            tabValue: 0,
            toran: 0,
            fetchedHaadafot: [],
            piorityArray: [],
            fetchPiority: []
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
        // console.log("")
        this.setState({ selectedUser: el })
      //  this.fetchHaadafa(el);
       this.fetchPiority(el);
    }

    UNSAFE_componentWillMount() {
       // this.fetchyfetch();
        this.fotchyfetch();
    }

   
    fotchyfetch(userid) {
        // fetch(CONFIG.API.GETPIORITY, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json;charset=utf-8",
        //         Authorization: "Bearer " + localStorage.getItem("jwt")
        //     }
        // })
        //     .then(data =>  data.json())
        //     .then(dat =>{ this.forFetchTwho(dat,userid)
        //     this.setState({loaded:true}) })
        //     .catch(err => console.log(err));
        this.forFetchTwho([],userid)
        this.setState({loaded:true});

    }

    

   

    fetchPiority = (userid) => {
       // console.log("fetchPiorityasladindssndsdskdsksd",userid);
        // var stringed = {
        //     userid:userid,
        //     piority: this.state.piorityArray
        // };
        // var p = JSON.stringify(stringed);
        // console.log("fetchPiority" , p);
        // fetch(CONFIG.API.GETPIORITYBYUSER, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json;charset=utf-8",
        //         Authorization: "Bearer " + localStorage.getItem("jwt")
        //     },
        //     body: p
        // })
        //     .then(data => data.json())
        //     .then(jsoned =>  this.setState({ fetchPiority: jsoned }))
        //     .catch(err => console.log(err));
        this.setState({fetchPiority:[]});
    }



    // forFetch(data) {
    //     var user;
    //     if(this.state.fetchedArri[this.state.tabValue] != undefined) {
    //     this.setState({ fetchedArri: data});
    // }
    // else {
    //     this.setState({ fetchedArri: data});
    // }
    //     this.setState({ loaded: true });
    // }
    forFetchTwho(data,id) {
        var user;
        if(this.state.paiorityArray != undefined) {
        this.setState({ piorityArray: data});
    }
    else {
        console.log("forFetchTwho",data , "id" , id);
        this.setState({ piorityArray: data});
        this.fetchPiority(id);
    }
    }
   


    createTable = () => {
    //    var arri = this.state.fetchedArri.slice(1);
        //console.log("part of array",arri);
       // arri.shift()
        return (
            <ShmirotTableComp
              // fotchyfetch={this.fotchyfetch.bind(this)}
               // fetchyfetch={this.fetchyfetch.bind(this)}
                // fetchedHaadafot={this.state.fetchedHaadafot}
                selectedUser={this.state.selectedUser}
               // fetchedArri={arri}
                tabValue={this.state.tabValue}
                selectValue={this.state.selectValue}
                toran={this.state.toran}
                // userList ={this.state.fetchedArri[this.state.tabValue]}
                 selectUser={this.selectUser}
                piorityArray={this.state.fetchPiority}
                fetchPiority={this.fetchPiority} />
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
                                    <UserListComp selectValue={this.state.selectValue} selectUser={this.selectUser} tabValue={this.state.tabValue} />
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
