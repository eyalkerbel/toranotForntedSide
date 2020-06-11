import React from "react";
import CONFIG from "../configs/env"


export default class ShmirotTableCompSmall extends React.Component {

    createMainArri = (num) => {
        var temp = this.props.fetchedArri[num];
        var tempArri = [];
        if(temp != undefined) {
        temp.forEach(el => {
            var date = new Date(el.date)
            var dayOfWeek = date.getDay()
            var dayOfMonth = date.getDate()
            var type = el.type
            var name = el.name
            var userid = el.userid
            var id = el._id
            var toran = el.toran
            var obi = {
                date, dayOfWeek, dayOfMonth, type, name, userid, id, toran
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
    }
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
                            <div style={{ display: "flex", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                <span style={{ backgroundColor: "teal", borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                    {tempArri[x][g].name}
                                </span>
                            </div>)
                        tempi2.push(xio)
                    } else {
                        tempi2.push(
                            <div style={{ display: "flex", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                <span style={{ backgroundColor: "#B76EB8", borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                    {tempArri[x][g].name}
                                </span>
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
        return (this.createTds(arri2)
        )
    }

    preSend = (numOfDay, selectedUser, type, toran) => {
        let date = new Date();
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
                    rowArri[x] = <div key={x}
                        style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex", minHeight: "12vh", padding: "5px" }}>
                        <span style={{ textAlign: "right", color: "grey" }}>
                            {arri2[g].num}
                        </span>
                        {arri2[g].names}
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
                <div style={{ width: "100%", textAlign: "center", border: "teal 1px solid", marginTop: "10px", borderRadius: "", overflow: "hidden", padding: "" }}>
                    <div className="shmirotheaders">
                        <div style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex" }}>ראשון</div>
                        <div style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex" }}>שני</div>
                        <div style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex" }}>שלישי</div>
                        <div style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex" }}>רביעי</div>
                        <div style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex" }}>חמישי</div>
                        <div style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex" }}>שישי</div>
                        <div style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex" }}>שבת</div>
                    </div>
                    {this.createMainArri(this.props.tabValue).map((el, i) => {
                        return (
                            <div className="shmirotdivs" key={i}>
                                {el}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
