import React, { Fragment } from "react";
import CONFIG from "../../configs/env"
import LoadingPage from "../LoadingPage";
import TabCompSmall from "../TabCompSmall";
import TableUsers from './TableUsers';
import Button from '@material-ui/core/Button';
import SearchInput, {createFilter} from 'react-search-input'
import {connect} from "react-redux";
import {middleWare} from "../../Actions/toranimAction";
import styleExport from "../themeStyle";
import { makeStyles,withStyles  } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

class PickUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            monthValue: 0,
            roleValue: 0,
            arraySavingChanges: [],
            userList: null,
            searchTerm: '',
            sended: false
        }
        this.changeMonth = this.changeMonth.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.getDataFromSon = this.getDataFromSon.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this);
    }

    componentWillMount() {
        var roleValueInitinal = 0;
        if(this.props.jobs.length !=0) {
         roleValueInitinal = this.props.jobs[0]._id;
        }
        this.setToranim();
        this.setState({roleValue:roleValueInitinal});
    }
    componentWillReceiveProps(nextProps) {
        var temp =[[ [] , []] , [ [] , []]];
        console.log("reciverProps" , this.props  , nextProps);
        temp[0] = this.divideArray(nextProps.toranimThisMonth , this.props.users , 0); 
        temp[1] = this.divideArray(nextProps.toranimNextMonth  , this.props.users,1);
        this.setState({userList:temp});
    }

    setToranim() {
        var temp =[[ [] , []] , [ [] , []]];
        temp[0] = this.divideArray(this.props.toranimThisMonth , this.props.users , 0); 
        temp[1] = this.divideArray(this.props.toranimNextMonth  , this.props.users,1);
        this.setState({userList:temp,loading:false});
    }
    divideArray(usersMonth,allUsers,monthTab) {
        var MonthTemp = [[]];
        var MonthNot = [];
        if( usersMonth.length != 0) {
         for(var i=0;i<allUsers.length;i++) {
            var isEqual = false;
            for(var j=0;j<usersMonth.length;j++) {
                var monthId = usersMonth[j].userDetails._id.toString();
                var UserId = allUsers[i]._id.toString();
                if(monthId === UserId) {
                isEqual = true;
                }
            }
            if(isEqual == false) {
                var toranObjct={
                userDetails: allUsers[i],
                idUser:allUsers[i]._id,
                monthTab: monthTab
                 }
                MonthNot.push(toranObjct);
          }
         }
        } else {
            for(var i=0;i<allUsers.length;i++) {
                var toranObjct={
                    userDetails: allUsers[i],
                    idUser: allUsers[i]._id,
                    monthTab: monthTab
                }
                MonthNot.push(toranObjct);
            }
            usersMonth = [];
        
    }
    MonthTemp[0] = usersMonth;
    MonthTemp[1] = MonthNot;
    return MonthTemp;
    }
 
    changeMonth(num) {
        this.setState({monthValue:num});
    }
    selectRole(num) {
        this.setState({roleValue:num});
    }
    getDataFromSon(item,isChosen) {
        var temp = this.state.arraySavingChanges;
        if(isChosen == false) {
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
                if(temp.length == 1) {
                    temp = [];
                } else {
                temp.splice(i,1);
                }
            }
        } 
        if(needToUpdate == false) {
        temp.push({item:item,isChosen:isChosen,monthValue:this.state.monthValue});
        }
        this.setState({arraySavingChanges:temp,sended:false});
    }

    sendDataToServer() {
      var arrayUsers = this.state.arraySavingChanges;
      this.setState({arraySavingChanges: []});
      arrayUsers.map((el,index) => {el["index"] = index});
      console.log("userList" , this.state.arrayUsers , arrayUsers );
      this.props.ChangeToranim(arrayUsers,this.state.monthValue);
      console.log("pickUserSave");
      this.setState({sended:true});
    }

    searchUpdated(term) {
        this.setState({searchTerm: term})
      }
      getUserListByindex(sended) {
          if(sended == false) {
              return this.state.userList;
          } else {
            var temp =[[ [] , []] , [ [] , []]];
            temp[0] = this.divideArray(this.props.toranimThisMonth , this.props.users , 0); 
            temp[1] = this.divideArray(this.props.toranimNextMonth  , this.props.users,1);
            return temp;
          }
      }

    render() {
        console.log("pickUserRender");
        const {classes} = this.props;
      //  const userList = this.getUserListByindex(this.state.sended);
        return (<Fragment>
            {this.state.loading? (
                        <LoadingPage >
                        </LoadingPage>
                    ) : (
                    
                         <div>
                         <div>
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

function mapDispatchToProps(dispatch) {
    return {
        ChangeToranim:(array,monthTab) => dispatch(middleWare(array,monthTab))
    };
}


function mapStateToProps(state,ownProps) {
    return {
        jobs: state.jobs,
        users: state.users
    };

}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styleExport)(PickUsers));