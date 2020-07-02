import React from "react";
import { Button, Fab } from "@material-ui/core";

import CONFIG from "../configs/env"
import user from "../Reducers/UserReducer";

export default class ShmirotTableComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priorityHaadafot: [],
            usersPiorrity: []
        };
    }    
    
    InjectDayOfWeekForHaadafa = (arrina) => {
       console.log("shmirotTableCompinject",this.props.fetchedHaadafot)
        console.log("arrine",arrina);
        const haadafot = this.props.fetchedHaadafot;
        const piority = this.props.piorityArray;
        console.log("haadfot",haadafot);
        console.log("piority",piority);
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

            // piority.forEach(el3 => {
            //     var arr = 
            // });
        
        
        return (this.createTds(arrina))
    }
//     algoritemHaadafot(haadafot) {
//         var counter = Array.apply(null, Array(31)).map(function (x, i) { return 0; });
//       //  console.log("counter",counter);
//        // console.log("haadafot",haadafot);
//         haadafot.forEach(el => {
//             let date1 = new Date(el.begindate)
//             let date2 = new Date(el.enddate)
//             el.startDay = date1.getDate();
//             el.endDay = date2.getDate();
//          //   console.log(el.startDay,",",el.endDay);
//             for(var i = el.startDay;i<=el.endDay;i++) {
//                 counter[i]++;
//             }
           
//          //   console.log("counter",counter);
//         });
//        // console.log("counter",counter);
//        var tempCounter = counter;
//        //var tempo = tempCounter;
//         var tempo = [];
//        for(var i=0;i<tempCounter.length;i++){
//            tempo[i] = tempCounter[i];
//        }
//        //console.log("tempo",tempo);
//         var newArray = tempo.sort();
//         //console.log("newArray",newArray);
//         var newCounter = [];
//         newArray[0] = -1;
//         //console.log("tempCounter",tempCounter);
//         for(var i=1;i<newArray.length;i++) {
//             for(var j=1;j<tempCounter.length;j++) {
//                 if(newArray[i] == tempCounter[j]) {
//                  //   console.log(newArray[i],"",tempCounter[j]);
//                     newCounter[i] = j;
//                     tempCounter[j]= -1;
//                     j=tempCounter.length;
//                 }
//             }
//         }

// //
//         var count = 0;
//         var users = [];
//         haadafot.forEach(el => {
//            // console.log("el",el);
//             if(users.includes(el.userid) == false) {
//                 users[count] = el.userid;
//                 count++;
//             }
//         });
//     //    console.log("users",users);
//         var tempUsers = [];
//         for(var i =0; i<users.length;i++) {
//             tempUsers[i] = users[i];
//             }
//             var tempoUsers = [];
//             for(var i=0;i<users.length;i++) {
//                 tempoUsers[i] = 0;
//             }

//             haadafot.forEach(el => {
//             //    console.log("userid",el.userid);
//                 const isEquel = (element) => element == el.userid;
//               var index = tempUsers.findIndex(isEquel);
//            //   console.log("index",index);
//               var hefresh = el.endDay - el.startDay;
//             //  console.log("hefrhes", hefresh);
//                 tempoUsers[index] = tempoUsers[index] + hefresh;
//             });
//            // console.log("tempoUsers",tempoUsers);
//            // tempoUsers.sort();
//            var usersSorted = [];
//             for(var i=0;i<tempoUsers.length;i++){
//                 usersSorted[i] = tempoUsers[i];
//             }
//             usersSorted.sort();
//             var userPoirity = [];
//            // console.log("userSorted",usersSorted);
//             for(var i=0;i<usersSorted.length;i++) {
//                 const value = (element) => element == usersSorted[i];
//                 const index = tempoUsers.findIndex(value);
//                 userPoirity[i] = users[index];
//                 tempoUsers[i] = 100000;
//             }
//             console.log("userPiority",userPoirity);

//         this.setState({priorityHaadafot:newCounter,usersPiorrity:userPoirity});
//        // console.log("newcounter",newCounter);

//     }


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
        //    console.log("myuser",el);
           var date = new Date(el.date)
           console.log("date", date);
            var dayOfWeek = date.getDay()
            var dayOfMonth = date.getDate()
          //  console.log("dayofmonth",dayOfMonth);
            var type = el.type
            var name = el.name
            var userid = el.userid
            var id = el._id
            var toran = el.toran
            var points = el.points;
            var chosen = false
            var obi = {
                date, dayOfWeek, dayOfMonth, type, name, userid, id, toran, chosen, points
            }
            //conosle.log("fetched" , )
         //  console.log("object",obi);
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
        console.log("tempArri",tempArri);
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
                  // console.log("userafterDelete" , user);
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
            name: selectedUser.name,
            userid: selectedUser.userid,
            type: type,
            toran: toran,
            points: selectedUser.points 
        }
        this.send(obi)
    }

    send = (obi) => {
        var user;
        var ThisOrNext = null;
        if (this.props.tabValue === 0) {
            ThisOrNext = "settoranutthismonth";
        } else if (this.props.tabValue === 1) {
            ThisOrNext = "settoranutnextmonth";
        }
        fetch(`${CONFIG.MAINAPI}/${ThisOrNext}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(obi)
        }).then((jsoned) => {
            this.props.fetchyfetch();
            this.props.fotchyfetch();
          //  this.props.selectUser(user);
        });
    }

    preDelete = (user) => {

        this.deleteToranut(user);
    }

    deleteToranut = (user) => {
        var ThisOrNext = null
        if (this.props.tabValue === 0) {
            ThisOrNext = "deletetoranutthismonth";
        } else if (this.props.tabValue === 1) {
            ThisOrNext = "deletetoranutnextmonth";
        }
        fetch(`${CONFIG.MAINAPI}/${ThisOrNext}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(user)
        })
            .then((jsoned) => this.props.fetchyfetch())
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
                    console.log(arri2[g].suggestionDay);
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
                        <div className="shmirotHeader"><span>ראשון</span></div>
                        <div className="shmirotHeader">שני</div>
                        <div className="shmirotHeader">שלישי</div>
                        <div className="shmirotHeader">רביעי</div>
                        <div className="shmirotHeader">חמישי</div>
                        <div className="shmirotHeader">שישי</div>
                        <div className="shmirotHeader">שבת</div>
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
