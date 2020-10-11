import React, { Fragment } from "react";
import CONFIG from "../../configs/env"
import LoadingPage from "../LoadingPage";
import TabCompSmall from "../TabCompSmall";
import TableUsers from './TableUsers';
import Button from '@material-ui/core/Button';
import SearchInput, {createFilter} from 'react-search-input'

export default class PickUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            monthValue: 0,
            roleValue: 0,
            arraySavingChanges: [],
            userList: null,
            searchTerm: ''
        }
        this.changeMonth = this.changeMonth.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.getDataFromSon = this.getDataFromSon.bind(this);
        this.forFetch = this.forFetch.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this);
    }

    componentWillMount() {
        fetch(CONFIG.API.GETALLUSERS, { 
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
        console.log("data" , data);
        this.setState({loading:false,userList:data});
    }
    changeMonth(num) {
        this.setState({monthValue:num});
        // for(var i=0;i<this.state.userList;i++) {
        //     if(this.state.userList[)
        // }

    }
    selectRole(num) {
        this.setState({roleValue:num});
    }
    getDataFromSon(item,isChosen) {
        var temp = this.state.arraySavingChanges;
        if(isChosen == false) {
            // console.log("userList" , this.state.userList);
            var index = this.state.userList[this.state.monthValue][1].indexOf(item);
            this.state.userList[this.state.monthValue][0].push(item);
            this.state.userList[this.state.monthValue][1].splice(index,1);
        } else {
            var index = this.state.userList[this.state.monthValue][0].indexOf(item);
            this.state.userList[this.state.monthValue][1].push(item);
            this.state.userList[this.state.monthValue][0].splice(index,1);
        } 
        var needToUpdate = false;
        for(var i=0;i<temp.length;i++) {
            if(temp[i].item == item && temp[i].monthValue == this.state.monthValue) {
                needToUpdate = true;
                temp[i].isChosen = isChosen;
            }
        } 
        if(needToUpdate == false) {
        temp.push({item:item,isChosen:isChosen,monthValue:this.state.monthValue});
        }
        this.setState({arraySavingChanges:temp});
        console.log("arraySaving" , this.state.arraySavingChanges);
    }

    sendDataToServer() {
      //  this.setState({arraySavingChanges: []});
      var arrayUsers = this.state.arraySavingChanges;
      this.setState({arraySavingChanges: []});
        var oneCheck = true;
      console.log("userList" , this.state.arrayUsers , arrayUsers );
      var  arrayUsersJson = {arrayUsers:arrayUsers};


      
        if(this.state.monthValue == 0 ) {
        fetch(CONFIG.API.SENDCURRENTTORANIM , {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(arrayUsersJson)
        }).then(dat => this.setState({arraySavingChanges: []}));
    } else {
        fetch(CONFIG.API.SENDNEXTMONTHTORANIM , {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(arrayUsersJson)
        }).then(dat => this.setState({arraySavingChanges: []}));
    }
    }

    searchUpdated(term) {
        this.setState({searchTerm: term})
      }

    render() {
    //    console.log("mylist" , thus.state.userList)
        return (<Fragment>
            {this.state.loading? (
                        <LoadingPage >
                        </LoadingPage>
                    ) : (
                    <div className="maincontainer" >
                    <div className="header-container">
                        <h1 className="header">בחירת משתמשים לתורנות</h1>
                        <div>
                        <TabCompSmall bubbleTabs={this.changeMonth} bubbleSelect={this.selectRole} tabValue={this.state.monthValue} selectValue={this.state.roleValue} />
                        </div>
                        <div className="scroll">
                            <TableUsers searchTerm={this.state.searchTerm} userList={this.state.userList[this.state.monthValue]} updateParnet={this.getDataFromSon} roleValue={this.state.roleValue} />
                        </div>
                    </div>

                        

                    <div style={{
                                display: "flex",
                                marginTop: "10px"}} >
                        <SearchInput className="search-input" onChange={this.searchUpdated} />


                        <Button
                                variant="contained"
                                onClick={() => this.sendDataToServer()}
                            >
                                שמור
                        </Button>
                    </div>
                    </div>)}    
        </Fragment>);
        
    }
}