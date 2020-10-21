import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import LoadingPage from "../LoadingPage";

import List from '@material-ui/core/List';
import { connect } from "react-redux";

import ShmirotTableComp from './ShmirotTableComp'
import TabComp from '../TabComp'
import UserListComp from './UserListComp'
import CONFIG from "../../configs/env"
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FriendList from "./FriendList";

 class CreateToranut extends React.Component {
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
            fetchPiority: [],
            friendElement: null,
            ifTogther: false
        };
        this.changeInSelectFriend = this.changeInSelectFriend.bind(this);
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
        this.setState({ selectedUser: el});

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
      
        this.setState({fetchPiority:[]});
    }



 
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

    changeInSelectFriend(friendElemnt,status) {
        console.log("changeInSelectFriend" , status);
        if(status == false) {
            console.log("succss");
            this.setState({friendElement:friendElemnt,ifTogther:true});
        
        } else {
            this.setState({friendElement:null,ifTogther:false});
        }
    }
   


    createTable = () => {
    //    var arri = this.state.fetchedArri.slice(1);
        console.log("part of array",this.state.friendElemnt);
        if(this.state.selectedUser.name != "בחר משתמש") {
            var friendId = this.state.selectedUser.friendId;
            var friendDetails;
       //     var renderComp = false;
        if(this.state.ifTogther == true) {
            for(var i=0;i<this.props.toranim.length;i++) {
                //       console.log("friendid" , friendId , this.state.selectedUser.userDetails._id ,this.props.toranim[i]);
                       if(friendId == this.props.toranim[i].idUser && this.state.selectedUser.userDetails._id == this.props.toranim[i].friendId) {
                           friendDetails = this.props.toranim[i];
                    }
                   }
        } else {
            friendDetails = null;
        }
    } else {
            friendDetails = null;
        }
    
        console.log("friendDetails" , friendDetails);
       // arri.shift()
        return (
            <ShmirotTableComp
              // fotchyfetch={this.fotchyfetch.bind(this)}
               // fetchyfetch={this.fetchyfetch.bind(this)}
                // fetchedHaadafot={this.state.fetchedHaadafot}
                selectedUser={this.state.selectedUser.userDetails}
               // fetchedArri={arri}
                tabValue={this.state.tabValue}
                selectValue={this.state.selectValue}
                toran={this.state.toran}
                // userList ={this.state.fetchedArri[this.state.tabValue]}
                 selectUser={this.selectUser}
                piorityArray={this.state.fetchPiority}
                fetchPiority={this.fetchPiority}
                friendToran={friendDetails} />
        )
    }
    renderFriendList() {
       // console.log("renderFriendList" , this.state.selectedUser);
        if(this.state.selectedUser.name != "בחר משתמש") {
        var friendId = this.state.selectedUser.friendId;
        var friendDetails;
        var renderComp = false;

        for(var i=0;i<this.props.toranim.length;i++) {
     //       console.log("friendid" , friendId , this.state.selectedUser.userDetails._id ,this.props.toranim[i]);
            if(friendId == this.props.toranim[i].idUser && this.state.selectedUser.userDetails._id == this.props.toranim[i].friendId) {
                friendDetails = this.props.toranim[i];
                renderComp = true;
            }
        }
        console.log("renderif" , renderComp , this.state.selectValue);
        if(renderComp == true) {
      return <List style={{ height: "10vh", overflow: "auto", direction: "ltr", borderBottom: "2px solid teal" }}>
        <FriendList friendDetails={friendDetails} updateParent={this.changeInSelectFriend} selectedUser={this.state.selectedUser} selectValue={this.state.selectValue} selectUser={this.selectUser} tabValue={this.state.tabValue} />
    </List>
        }
        else {
            return null;
        }
    }
        else {
            return null;
        }
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
                            <TabComp selectedUser={this.state.selectedUser.userDetails} bubbleTabs={this.bubbleTabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabValue} selectValue={this.state.selectValue} />
                        </div>
                        <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
                            <div style={{ flex: "1", border: "2px solid teal", marginTop: "10px" }}>
                                <List style={{ height: "40vh", overflow: "auto", direction: "ltr", borderBottom: "2px solid teal" }}>
                                    <UserListComp selectValue={this.state.selectValue} selectUser={this.selectUser} tabValue={this.state.tabValue} />
                                </List>
                               {this.renderFriendList()}
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
const mapStateToProps = state => ({
    toranim: state.toranim.toranimNextMonth,
    myId: state.user._id
})

export default connect(mapStateToProps,null) (CreateToranut);