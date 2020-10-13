import React from "react";
import { Button, Fab } from "@material-ui/core";
import {connect} from "react-redux";
import CONFIG from "../../configs/env"
// import user from "../Reducers/UserReducer";
 import {SetNotification} from "../../Actions/NotificationAction"
 class ShmirotTableComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priorityHaadafot: [],
            usersPiorrity: []
        };
    }    
    
    InjectDayOfWeekForHaadafa = (arrina) => {
    //    console.log("shmirotTableCompinject",this.props.fetchedHaadafot)
    //     console.log("arrine",arrina);
    console.log("selectedValue" , this.props.selectedUser.name);
    if(this.props.selectedUser.name != "בחר משתמש" ){
        const haadafot = this.props.fetchedHaadafot;
        const piority = this.props.piorityArray;
      //  console.log("piority", this.props.piorityArray);
        // console.log("haadfot",haadafot);
        // console.log("piority",piority);
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

    UNSAFE_componentWillMount() {
       // this.fetchAllHaadafot();
    }
    
    fetchAllHaadafot() {
        fetch(CONFIG.API.GETALLHAADAFOT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(data => data.json())
            .then(dat => {console.log("hi")})
            .catch(err => console.log(err));
    }
    


    createMainArri = (num) => {
    //   console.log("shmirotTableComp",this.props.fetchedArri)
       var temp = this.props.fetchedArri[num];

      //  console.log(temp);
        var tempArri = [];
        temp.forEach(el => {
           var date = new Date(el.date)
            var dayOfWeek = date.getDay()
            var dayOfMonth = date.getDate()
            var type = el.userDetails.type
            var name = el.userDetails.name
            var userid = el.userDetails.userid
            var id = el._id
            var toran = el.toran;
            var points = el.userDetails.points;
            var chosen = false
            var obi = {
                date, dayOfWeek, dayOfMonth, type, name, userid, id, toran, chosen, points
            }
            //conosle.log("fetched" , )
          console.log("objectr",obi.name);
            if (this.props.selectValue === parseInt(type)) {
                if (tempArri[dayOfMonth] == null) {
                    tempArri[dayOfMonth] = [];
                    tempArri[dayOfMonth].push(obi)
                } else {
                    tempArri[dayOfMonth].push(obi)
                }

            }
        })
      //  console.log(tempArri);
        return (this.createTableBody(tempArri))
    }

    getLstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }


    createTableBody = (tempArri) => {
        //console.log("tempArri",tempArri);
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
                    if (user.toran === 0) {
                        let xio = tempi2.pop()

                        tempi2.push(
                            <div key={g} className="shmirotDataHolder">
                                <span className="shmirotToran">
                                    {tempArri[x][g].name}
                                </span>
                                <Fab onClick={() => this.preDelete(user)} className="deleteShmiraButton">
                                    <i style={{ fontSize: "20px" }} className="material-icons">delete</i>
                                </Fab>
                            </div>)
                        tempi2.push(xio)

                    } else {
                        tempi2.push(
                            <div key={g} className="shmirotDataHolder">
                                <span className="shmirotAtooda">
                                    {tempArri[x][g].name}
                                </span>
                                <Fab onClick={() => this.preDelete(user)} className="deleteShmiraButton">
                                    <i style={{ fontSize: "20px" }} className="material-icons">delete</i>
                                </Fab>
                            </div>)
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

    preSend = (numOfDay, selectedUser, type, toran) => {
        let date = new Date();
        if (this.props.tabValue === 1) {
            date = new Date(new Date().setMonth(date.getMonth() + 1))
        }
        date.setDate(numOfDay)
        let obi = {
            date: date,
            monthTab: this.props.tabValue,
            name: selectedUser.name,
            userid: selectedUser.userid,
            type: type,
            toran: toran,
            points: selectedUser.points 
        }
        this.send(obi);
        console.log("fsds");
    }

    send = (obi) => {
        var user;
    //   this.props.addNotification(obi.date);
        var ThisOrNext = null;
        fetch(CONFIG.API.SETTORANOT, {
                method: "POST",
                headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(obi)
        }).then(data => data.json()).then((jsoned) => {
                this.props.fetchyfetch();
                this.props.fotchyfetch(obi.userid);
            });
        


        // console.log("database");
        // if (this.props.tabValue === 0) {
        //     ThisOrNext = "settoranutthismonth";
        // } else if (this.props.tabValue === 1) {
        //     ThisOrNext = "settoranutnextmonth";
        // }
        // fetch(`${CONFIG.MAINAPI}/${ThisOrNext}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json;charset=utf-8",
        //         Authorization: "Bearer " + localStorage.getItem("jwt")
        //     },
        //     body: JSON.stringify(obi)
        // }).then(data => data.json()).then((jsoned) => {
        //     this.props.fetchyfetch();
        //     this.props.fotchyfetch(obi.userid);
        // });
    }

    preDelete = (user) => {

        this.deleteToranut(user);
    }

    deleteToranut = (user) => {
        var ThisOrNext = null

        console.log("delete " , user);
      
        fetch(CONFIG.API.DELETETORANOT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(user)
        })
            .then((jsoned) => this.props.fetchyfetch())
        // console.log("delete " , user);
        // if (this.props.tabValue === 0) {
        //     ThisOrNext = "deletetoranutthismonth";
        // } else if (this.props.tabValue === 1) {
        //     ThisOrNext = "deletetoranutnextmonth";
        // }
        // fetch(`${CONFIG.MAINAPI}/${ThisOrNext}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json;charset=utf-8",
        //         Authorization: "Bearer " + localStorage.getItem("jwt")
        //     },
        //     body: JSON.stringify(user)
        // })
        //     .then((jsoned) => this.props.fetchyfetch())
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
                   rowArri[x] = <div key={x} style={status? status? {background:"lightblue"}: {background:"white"} : status2? {background:"lightgreen"}:{background:"white"}} className="shmirotCell" >
                        <span className="cellDate">
                            {arri2[g].num}
                        </span>
                        {arri2[g].names}
                        <Button onClick={() => this.preSend(gooi, this.props.selectedUser, this.props.selectValue, this.props.toran)} variant="outlined" style={{ border: "solid 1px teal", color: "teal" }} >Add</Button>
                    </div>;
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

    render() {
        return (
            <div style={{ width: "100%" }}>
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
            </div>
        );
    }
}
// const mapDispatchToProps = dispatch => ({
//     addNotification:(date) => dispatch(SetNotification(date)),
// })

export default connect(null,null)(ShmirotTableComp);