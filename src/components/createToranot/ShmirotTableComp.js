import React from "react";
import { Button, Fab } from "@material-ui/core";
import {connect} from "react-redux";
import CONFIG from "../../configs/env"
// import user from "../Reducers/UserReducer";
 import {SetNotification} from "../../Actions/NotificationAction";
 import {addToranot,deleteToranot} from "../../Actions/toranotsAction";
 import ShmirotCell from "./ShmirotCell";
 import shortid from 'shortid'; 
 import DialogCell from "./DialogCell";
 import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';

 class ShmirotTableComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priorityHaadafot: [],
            usersPiorrity: [],
            CurrentCellData: null,
            openDailog: false,
            currentGooi: null,
            currentDateDialog: null,
            amountToranim: null,
            arrayOfShapes: null
        };
        this.getColor = this.getColor.bind(this);
        this.preSend = this.preSend.bind(this);
        this.createTableBody = this.createTableBody.bind(this);
        this.openCellDialog = this.openCellDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }    
    UNSAFE_componentWillMount() {
        const amount = this.getAmountShmirotPerDay(this.props);
        var arri =[];
        arri.push(<Rectangle width={10} height={10} fill={{color:'white'}}  />)
        arri.push(<Triangle width={10} height={10} fill={{color:'white'}}  />)
        arri.push(<Circle r={5} fill={{color:'white'}}  />)
        this.setState({amountToranim:amount,arrayOfShapes:arri});
          
    }
    InjectDayOfWeekForHaadafa = (arrina) => {
    if(this.props.selectedUser != undefined){
        const haadafot = this.props.haadafot;
        const piority = this.props.piorityArray;
       // this.algoritemHaadafot(haadafot);
        haadafot.forEach(el => {
            let date1 = new Date(el.begindate)
            let date2 = new Date(el.enddate)
            el.startDay = date1.getDate()
            el.endDay = date2.getDate()
        })
        arrina.forEach(el1 => {
            haadafot.forEach(el2 => {
                if (el1.num === el2.startDay || (el1.num >= el2.startDay && el1.num <= el2.endDay-1) || el1.num == el2.endDay-1  ) {
                    el1.haadafaDay = true;
                }
            });
                for(var i =0;i<=10;i++) {
                    if(el1.num === piority[i]) {
                        el1.suggestionDay = true;
                    }
                }
             });
            }
            // piority.forEach(el3 => {
            //     var arr = 
            // });
        
        
        return (this.createTds(arrina))
    }

    createMainArri = (num) => {
      // var temp = this.props.fetchedArri[num];
      var temp = [];
        if(num == 0) {
            temp = this.props.toranots.toranotsThisMonth;
        } else {
            temp = this.props.toranots.toranotsNextMonth;
        }
        var tempArri = [];
        if(temp != undefined) {
        temp.forEach(el => {
           var date = new Date(el.date)
            var dayOfWeek = date.getDay()
            var dayOfMonth = date.getDate()
            var type = el.userDetails.type
            var name = el.userDetails.name
            var userid = el.userDetails.userid
            var _id = el._id
            var toran = el.toran;
            var points = el.userDetails.points;
            var chosen = false
            var idUser = el.userDetails._id;
            var shmiraType = el.shmiraType;
            var obi = {
                date, dayOfWeek, dayOfMonth, type, name, userid, _id, toran, chosen, points,idUser,shmiraType
            }
        if (this.props.selectValue === type) {
                if (tempArri[dayOfMonth] == null) {
                    tempArri[dayOfMonth] = [];
                    tempArri[dayOfMonth].push(obi)
                } else {
                    tempArri[dayOfMonth].push(obi)
                }
            }
        })
        
    }
        return (this.createTableBody(tempArri))
    }

    getLstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }
    getColor(id) {
        for(var i=0;i<this.props.colors.length;i++) {
           if(this.props.colors[i].idUser ==  id) {
                return this.props.colors[i].color;
            }
        }
    } 

      createTableBody(tempArri)  {
        var d = new Date();
        if (this.props.tabValue === 1) {
            d.setMonth(d.getMonth() + 1);
        }
        d.setDate(1)
        var dayOfWeek2 = d.getDay()
        var arri2 = [];
        var x = 1;
        var lastDay = this.getLstDayOfMonth(d);
        for (var i = dayOfWeek2; i < lastDay + dayOfWeek2; i++) {
            var tempi2 = []

            if (tempArri[x] != null) {
                for (var g = 0; g < tempArri[x].length; g++) {
                    let user = tempArri[x][g];
                    console.log("user" , user)
                    if (user.toran === 0) {
                        // let xio = tempi2.pop()
                       const color =  this.getColor(tempArri[x][g].idUser);
                        tempi2[user.shmiraType] = <div key={g} className="shmirotDataHolder">
                                <span style={{backgroundColor: color,marginRight:"4px"}} className="shmirotToran">
                                {this.state.arrayOfShapes[(user.shmiraType%this.state.amountToranim) % 3]}
                                    {user.name}
                                </span>
                                {/* <Fab onClick={() => this.preDelete(user)} className="deleteShmiraButton">
                                    <i style={{ fontSize: "20px" }} className="material-icons">delete</i>
                                </Fab> */}
                            </div>
                        // tempi2.push(xio)
                    } else {
                        tempi2[user.shmiraType] =  <div key={g} className="shmirotDataHolder">
                                <span className="shmirotAtooda">
                                    {tempArri[x][g].name}
                                </span>
                                <Fab onClick={() => this.preDelete(user)} className="deleteShmiraButton">
                                    <i style={{ fontSize: "20px" }} className="material-icons">delete</i>
                                </Fab>
                            </div>
                    }

                }
            }
            arri2[i] = {
                num: x,
                names: tempi2,
                data: tempArri[x]
            };
            x++;
        }
        return (this.InjectDayOfWeekForHaadafa(arri2))
    }

    preSend = (numOfDay, selectedUser, type, toran,shmiraType) => {
        console.log("preSend" , shmiraType );
        let date = new Date();
        if (this.props.tabValue === 1) {
            date = new Date(new Date().setMonth(date.getMonth() + 1))
        }
        //console.log("here" , selectedUser.userDetails);
        if(selectedUser != undefined) {
        date.setDate(numOfDay)
        let obi = {
            date: date,
            monthTab: this.props.tabValue,
            name: selectedUser.name,
            userid: selectedUser.userid,
            type: type,
            toran: toran,
            points: selectedUser.points,
            userDetails: selectedUser,
            friendDetails: this.props.friendToran,
            shmiraType: shmiraType
        }

        this.send(obi);
    }
    }

    send = (obi) => {
        var DataForRedux = {
            date:obi.date,
            monthTab: this.props.tabValue,
            idUser: this.props.selectedUser._id,
            userStatus: "unknown",
            availableForExchange: true,
            userDetails: this.props.selectedUser,
            toran: obi.toran,
            shmiraType: obi.shmiraType
        }
        var user;
    //   this.props.addNotification(obi.date);
        var ThisOrNext = null;
        if(this.props.selectedUser.name  != "בחר משתמש")
        this.props.addToranot(obi,DataForRedux);
        // this.setState({curre})
    }

    preDelete = (user) => {
        this.deleteToranut(user);
    }

    deleteToranut = (user) => {
        var ThisOrNext = null
       this.props.deleteToranot(user,this.props.tabValue);
    }
    componentWillReceiveProps(nextProps) {
        //  this.setState(nextProps);
        console.log("reciverProps");
        const amount = this.getAmountShmirotPerDay(nextProps);
        this.setState({amountToranim:amount});
        
       }
       comon
    getAmountShmirotPerDay(nextProps) {
        for(var i=0;i<nextProps.jobs.length;i++) {
            if(nextProps.jobs[i]._id == nextProps.selectValue) {
                return nextProps.jobs[i].numToranotPerDay;
            }
        }
    }
    openCellDialog(shmirotCellData,currentGooi,currentDateDialog) {
        if(this.props.selectedUser != undefined)
        {
            console.log("currentCellData" , shmirotCellData);
        this.setState({CurrentCellData:shmirotCellData,openDailog: true,currentGooi:currentGooi,currentDateDialog:currentDateDialog});
        }
    }

    clickDiv(x) {
    }

    createTds = (arri2) => {
        var allRowArri = [];
        var g = 0;
        var started = false;
        for (var i = 0; i < 6; i++) {
            var rowArri = [];
            var started2 = false;
            for (var x = 0; x < 7; x++) {
                if (arri2[g] != null) {
                    started2 = true
                    started = true;
                    let gooi = arri2[g].num;

                    let status = false;
                   let status2 = false;
                    if (typeof arri2[g].haadafaDay != 'undefined') {
                        status = true
                    }
                    if(typeof arri2[g].suggestionDay != 'undefined') {
                        status2 = true;
                    }
                   // rowArri[x] = <div key={x} style={{ backgroundColor: status? "lightblue" : "white"}} className="shmirotCell" >
                //    rowArri[x] = <div onClick={this.clickDiv} key={x} style={status? status? {background:"lightblue"}: {background:"white"} : status2? {background:"lightgreen"}:{background:"white"}} className="shmirotCell" >
                //         <span className="cellDate">
                //             {arri2[g].num}
                //         </span>
                //         {arri2[g].names}
                //         <Button onClick={() => this.preSend(gooi, this.props.selectedUser, this.props.selectValue, this.props.toran)} variant="outlined" style={{ border: "solid 1px teal", color: "teal" }} >הוסף</Button>
                //     </div>;
                    rowArri[x] = <ShmirotCell amountToranim={this.state.amountToranim} openCellDialog={this.openCellDialog} key={shortid.generate()} x={x} status2={status2} status={status} g={g} arri2={arri2} preSend={this.preSend} gooi={gooi} {...this.props} />

                }
                else if (started === false) {
                    rowArri[x] = <div key={x} className="emptyCell"><span></span></div>;
                }
                else if (started2 === true) {
                    rowArri[x] = <div key={x} className="emptyCell"><span></span></div>;
                }
                g++;
            }
            allRowArri[i] = rowArri;
        }
        return allRowArri
    }
    closeDialog() {
        this.setState({openDailog:false});
    }

    render() {
        return (
            <div >
                <div className="shmirotHeadersContainer">
                    <div className="shmirotheaders">
                        <div className="shmirotheaders-items"><span>ראשון</span></div>
                        <div className="shmirotheaders-items">שני</div>
                        <div className="shmirotheaders-items">שלישי</div>
                        <div className="shmirotheaders-items">רביעי</div>
                        <div className="shmirotheaders-items">חמישי</div>
                        <div className="shmirotheaders-items">שישי</div>
                        <div className="shmirotheaders-items">שבת</div>
                    </div>
                    {this.createMainArri(this.props.tabValue).map((el, i) => {
                        return (
                            <div key={i} className="shmirotdivs">
                                {el}
                            </div>
                        )
                    })}
                </div>
                <DialogCell toranots={this.props.toranots} preSend={this.preSend} open={this.state.openDailog} handleClose={this.closeDialog} cellData={this.state.CurrentCellData} amountPerDay={this.state.amountToranim} selectedUser={this.props.selectedUser} 
                preDelete={this.preDelete} selectValue={this.props.selectValue} toran={this.props.toran} gooi={this.state.currentGooi} tabValue={this.props.tabValue} currentDateDialog={this.state.currentDateDialog} />
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    addToranot:(toranot,toranotForRedux) => dispatch(addToranot(toranot,toranotForRedux)),
    deleteToranot: (toranot,monthValue) => dispatch(deleteToranot(toranot,monthValue))
})
function mapStateToProps(state,ownProps) {
    if(ownProps.selectedUser  != undefined) {
    return {
        jobs: state.jobs,
    colors: state.toranim.colors,
    toranots: state.toranots,
    haadafot: state.allHaadafot.filter(hadafa => hadafa.idUser == ownProps.selectedUser._id )
    }
    } else {
        return {
        jobs: state.jobs,
        colors: state.toranim.colors,
        toranots: state.toranots,
        haadafots: []
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShmirotTableComp);