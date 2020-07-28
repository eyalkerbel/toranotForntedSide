import React from "react";
import CONFIG from "../configs/env"
import Button from "@material-ui/core/Button";

export default class ShmirotTableCompSmall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ChosenSubstitute: false,
            oldDate: null,
            newDate: null,
            status: ""
        };
        this.cleanData = this.cleanData.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
    }

    createMainArri = (num) => {
        var temp = this.props.fetchedArri[num];
        var tempMy = this.props.fetchMyToranot;
        console.log("tempMy" , tempMy);
        var tempArri = [];
        if(temp != undefined && tempMy != undefined) {
        temp.forEach(el => {
            var isMine = false;
            for(var i=0;i<tempMy.length;i++) {
                if(el.date == tempMy[i].date) {
                    isMine = true;
                }
            }
            var date = new Date(el.date)
            var dayOfWeek = date.getDay()
            var dayOfMonth = date.getDate()
            var type = el.type
            var name = el.name
            var userid = el.userid
            var id = el._id
            var toran = el.toran
            var obi = {
                date, dayOfWeek, dayOfMonth, type, name, userid, id, toran, isMine
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
    pickProblemDate(date) {
        console.log("pickProblemDgtae", this.state);
        console.log("newData",this.state.newDate);
        if(this.state.newDate != null) {
            alert("need or to send or to cancel")
        }
        else {
        this.setState({ChosenSubstitute:true,oldDate:date});
        }
    }
    pickReplaceDate(date) {
        console.log("pick" , date);
        this.setState({ChosenSubstitute:false,newDate:date});
        console.log("s" , this.state.newDate);
    }
    sendDataToServer() {
        if(this.state.oldDate != null && this.state.newDate != null) {
        this.setState({status:"send a request"});
        console.log("send to server" , this.state.oldDate , "and ", this.state.newDate);
        // let data = {
        //     header: "want to change",
        //     body:  "i want to change my  " + this.state.oldDate.dayOfMonth +  "with yours " +  this.state.newDate.dayOfMonth,
        //     names:  [this.state.newDate.name]
        //   };
        let data = {
          oldDate: this.state.oldDate,
          newDate: this.state.newDate,
          status: "asking",
          seen:false
        }
          this.setState({oldData:null,newDate:null});
          fetch(CONFIG.API.ADDTORANOTCHNAGE, {
            method:"POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify(data)
          }).then(data => data.json())
          .then(dat => console.log("finish"))
          .catch(err => console.log(err));
        }
    }
    cleanData() {
        this.setState({oldData:null,newDate:null,ChosenSubstitute:false,status:"clean all data"});
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
        console.log("chosen" , this.state.ChosenSubstitute);
        var lastDay = this.getLstDayOfMonth(d);
        for (var i = dayOfWeek2; i < lastDay + dayOfWeek2; i++) {
            var tempi2 = []
            if (tempArri[x] != null) {
                for (var g = 0; g < tempArri[x].length; g++) {
                    let user = tempArri[x][g]
                    if (user.toran === 0) {
                        let xio = tempi2.pop()
                        if(user.isMine == false) {
                        tempi2.push(
                            <div style={{ display: "flex",flexDirection: "column", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                <span style={{ width:"60%",backgroundColor: "teal", borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                    {tempArri[x][g].name}
                                </span>
                                {this.state.ChosenSubstitute == true? <span style={{marginTop:"5px"}}>
                                <Button  onClick={() => this.pickReplaceDate(user)} variant="outlined" style={{ border: "solid 1px teal", color: "teal" }}>replace</Button>
                                </span> : null}
                               
                            </div>)
                        tempi2.push(xio)
                        } else {
                            tempi2.push(
                                <div style={{ display: "flex",flexDirection: "column", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                    <span style={{ width:"60%",backgroundColor: "teal", borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                       Me
                                    </span>
                                    {this.state.ChosenSubstitute == false?<span style={{marginTop:"5px"}}>
                                    <Button variant="outlined" onClick={() => this.pickProblemDate(user)} style={{ border: "solid 1px teal", color: "teal" }}>change</Button>
                                    </span> : null}
                               
                                </div>)
                        }
                    } else {
                        tempi2.push(
                            <div style={{ display: "flex", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                <span style={{ backgroundColor: "#B76EB8", borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                    {tempArri[x][g].name}
                                </span>
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
        return (this.createTds(arri2)
        )
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
                    })
                    }
                </div>
                {this.state.ChosenSubstitute==false && this.state.newDate!= null?  <div className="form-bottom" >
                    <div style={{textAlign: "center"}}>{this.state.status} </div>
             <Button className="fobi1" onClick={this.sendDataToServer} >
             <i className="material-icons">send</i>
            </Button>
            <Button className="fobi2" onClick={this.cleanData} >
         <i className="material-icons">cancel</i>
        </Button>
        
            </div>:"click for change with someone"}
               
            </div>
        );
    }
}
