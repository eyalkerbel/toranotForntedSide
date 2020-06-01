import React from "react";
import { Button, Fab } from "@material-ui/core";

import CONFIG from "../configs/env"

export default class ShmirotTableComp extends React.Component {

    InjectDayOfWeekForHaadafa = (arrina) => {
        const haadafot = this.props.fetchedHaadafot
        haadafot.forEach(el => {
            let date1 = new Date(el.begindate)
            let date2 = new Date(el.enddate)
            el.startDay = date1.getDate()
            el.endDay = date2.getDate()
        })
        arrina.forEach(el1 => {
            haadafot.forEach(el2 => {
                if (el1.num === el2.startDay) {
                    el1.haadafaDay = true;
                }
            })
        })
        return (this.createTds(arrina))
    }

    createMainArri = (num) => {
        var temp = this.props.fetchedArri[num];
        var tempArri = [];
        temp.forEach(el => {
            var date = new Date(el.date)
            var dayOfWeek = date.getDay()
            var dayOfMonth = date.getDate()
            var type = el.type
            var name = el.name
            var userid = el.userid
            var id = el._id
            var toran = el.toran
            var chosen = false
            var obi = {
                date, dayOfWeek, dayOfMonth, type, name, userid, id, toran, chosen
            }
            if (this.props.selectValue === parseInt(type)) {
                if (tempArri[dayOfMonth] == null) {
                    tempArri[dayOfMonth] = [];
                    tempArri[dayOfMonth].push(obi)
                } else {
                    tempArri[dayOfMonth].push(obi)
                }

            }
        })
        return (this.createTableBody(tempArri)
        )
    }

    getLstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }


    createTableBody = (tempArri) => {
        var d = new Date();
        if (this.props.tabValue === 1) {
            d.setMonth(d.getMonth() + 1)
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

                    let user = tempArri[x][g]
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
                            </div >)
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
        return (this.InjectDayOfWeekForHaadafa(arri2)
        )
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
            toran: toran
        }
        this.send(obi)
    }

    send = (obi) => {
        var ThisOrNext = null
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
        }).then((jsoned) => this.props.fetchyfetch())
    }

    preDelete = (user) => {

        this.deleteToranut(user)
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
                    let gooi = arri2[g].num
                    let status = false;
                    if (typeof arri2[g].haadafaDay != 'undefined') {
                        status = true
                    }
                    rowArri[x] = <div key={x}
                        style={{ backgroundColor: status ? "lightblue" : "white" }} className="shmirotCell">
                        <span className="cellDate">
                            {arri2[g].num}
                        </span>
                        {arri2[g].names}
                        <Button onClick={() => this.preSend(gooi, this.props.selectedUser, this.props.selectValue, this.props.toran)} variant="outlined" style={{ border: "solid 1px teal", color: "teal" }} >Add</Button>
                    </div >;
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
