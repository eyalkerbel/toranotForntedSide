import styleExport from "../themeStyle";
import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import LoadingPage from "../LoadingPage";
import {Button} from "@material-ui/core";
import List from '@material-ui/core/List';
import { connect } from "react-redux";
import ShmirotTableComp from './ShmirotTableComp'
import TabComp from './TabComp'
import UserListComp from './UserListComp'
import CONFIG from "../../configs/env"
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FriendList from "./FriendList";
import {setColor} from "../../Actions/toranimAction";
import TabCompHeaders from "./TabCompHeaders";
import DailogEditUsers from "./DailogEditUsers";
import { makeStyles,withStyles  } from '@material-ui/core/styles';

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
            ifTogther: false,
            dailogUsers: false
        };
        this.changeInSelectFriend = this.changeInSelectFriend.bind(this);
        this.openDialogEditUser = this.openDialogEditUser.bind(this);
        this.closeDailogPickUsers = this.closeDailogPickUsers.bind(this);
    }

    radioHandler = (num) => {
        this.setState({ toran: num })
    }
    openDialogEditUser() {
        this.setState({dailogUsers: true});
    }

    //appbar functions
    bubbleTabs = (num) => {
        this.setState({ tabValue: num });
    }
    bubbleSelect = (num) => {
        this.setState({ selectValue: num,selectedUser: {name: "בחר משתמש" } })
    }
    selectUser = (el) => {
        this.setState({ selectedUser: el});
        this.setState({ifTogther:false});
       this.fetchPiority(el);
    }

    UNSAFE_componentWillMount() {
       var roleValueInitinal = 0;
       if(this.props.jobs.length !=0) {
        roleValueInitinal = this.props.jobs[0]._id;
       }
    //    this.setColorsInRedux();
       this.setState({selectValue:roleValueInitinal});
        this.fotchyfetch();
    }
    // setColorsInRedux() {
    //     for(var i=0;i<this.props.toranimThisM.length;i++) {
    //         this.props.setColor(this.props.toranimThisM[i].idUser,this.getRandomColor(),0);
    //    }
    //    for(var i=0;i<this.props.toranimNextM.length;i++) {
    //        var checkExist = false;
    //         for(var j=0;j<this.props.toranimThisM.length;j++) {
    //             if(this.props.toranimThisM[j].idUser == this.props.toranimNextM[i].idUser) {
    //                 checkExist = true;
    //             }
    //         }
    //         if(checkExist == false) {
    //             this.props.setColor(this.props.toranimNextM[i].idUser,this.getRandomColor(),1);
    //         }    
    //    }  
    // }
     getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
    fotchyfetch(userid) {
        this.forFetchTwho([],userid)
        this.setState({loaded:true});
    }
    fetchPiority = (userid) => {
        this.setState({fetchPiority:[]});
    }

    forFetchTwho(data,id) {
        if(this.state.paiorityArray != undefined) {
        this.setState({ piorityArray: data});
    } else {
        this.setState({ piorityArray: data});
        this.fetchPiority(id);
    }
    }

    changeInSelectFriend(friendElemnt,status) {
        if(status == false) {
            this.setState({friendElement:friendElemnt,ifTogther:true});
        
        } else {
            this.setState({friendElement:null,ifTogther:false});
        }
    }
    closeDailogPickUsers() {
        this.setState({dailogUsers:false});
        // this.setColorsInRedux();
    }
    createTable = () => {
        if(this.state.selectedUser.name != "בחר משתמש") {
            var friendId = this.state.selectedUser.friendId;
            var friendDetails;
        if(this.state.ifTogther == true) {
            for(var i=0;i<this.props.toranim.length;i++) {
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
        return (
            <ShmirotTableComp
                selectedUser={this.state.selectedUser.userDetails}
                tabValue={this.state.tabValue}
                selectValue={this.state.selectValue}
                toran={this.state.toran}
                 selectUser={this.selectUser}
                piorityArray={this.state.fetchPiority}
                fetchPiority={this.fetchPiority}
     friendToran={friendDetails} />
        )
    }
    renderFriendList() {
        if(this.state.selectedUser.name != "בחר משתמש") {
        var friendId = this.state.selectedUser.friendId;
        var friendDetails;
        var renderComp = false;
        for(var i=0;i<this.props.toranim.length;i++) {
            if(friendId == this.props.toranim[i].idUser && this.state.selectedUser.userDetails._id == this.props.toranim[i].friendId) {
                friendDetails = this.props.toranim[i];
                renderComp = true;
            }
        }
        if(renderComp == true) {
      return <List style={{ height: "10vh", overflow: "auto", direction: "ltr", borderBottom: "2px solid teal" }}>
        <FriendList friendDetails={friendDetails} updateParent={this.changeInSelectFriend} selectedUser={this.state.selectedUser} selectValue={this.state.selectValue} selectUser={this.selectUser} tabValue={this.state.tabValue} />
    </List>
        }
        else {
            return null;
        }
    }   else {
            return null;
        }
    }
    render() {
        const {classes} = this.props;
        console.log("CreateToranot" , this.state);
        return (
            <Fragment>
                {this.state.loaded ? (
                    <Paper className="maincontainer" >
                        <div className={`header-container ${classes.headerStyle}`}>
                            <h1 className="header">יצירה תורניות</h1>
                            <div className="divider" />
                        </div>
                        <div>
                            <TabCompHeaders />
                            <TabComp selectedUser={this.state.selectedUser.userDetails} bubbleTabs={this.bubbleTabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabValue} selectValue={this.state.selectValue} />
                        </div>
                        <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
                            <div style={{ flex: "1", border: "2px solid teal", marginTop: "10px"}}>
                                <List style={{ height: "50vh", overflow: "hidden", direction: "ltr", borderBottom: "2px solid teal" }}>
                                    <UserListComp selectValue={this.state.selectValue} selectUser={this.selectUser} tabValue={this.state.tabValue} />
                                </List>
                               {this.renderFriendList()}
                                    <RadioGroup defaultValue="0" aria-label="regular" name="customized-radios">
                                    <FormControlLabel onClick={() => this.radioHandler(0)} value="0" control={<Radio />} label="תורן" />
                                    <FormControlLabel onClick={() => this.radioHandler(1)} value="1" control={<Radio />} label="עתודה" />
                                </RadioGroup>
                                <Button onClick={() => this.openDialogEditUser()}>
                                    שנה משתמשים
                                </Button>
                            </div>
                            <div style={{ flex: "7" , minWidth: "0" }}>
                                {this.createTable()}
                            </div>
                        </div>
                        <DailogEditUsers open={this.state.dailogUsers} handleClose={this.closeDailogPickUsers} />
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
function mapDispatchToProps(dispatch) {
    return {
        setColor:(id,color,monthTab) => dispatch(setColor(id,color,monthTab))
    };
}

const mapStateToProps = state => ({
    colors:state.toranim.colors,
    toranimThisM: state.toranim.toranimThisMonth,
    toranimNextM: state.toranim.toranimNextMonth,
    toranim: state.toranim.toranimNextMonth,
    myId: state.user._id,
    jobs: state.jobs
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styleExport) (CreateToranut));