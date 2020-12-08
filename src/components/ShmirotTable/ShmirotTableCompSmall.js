import React from "react";
import CONFIG from "../../configs/env";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ShmirotCell from "./ShmirotCell";
import LabelInCell from "./LableInCell";
export default class ShmirotTableCompSmall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ChosenSubstitute: false,
            oldDate: null,
            newDate: null,
            status: "",
            message: "",
            amountToranim: null,
            arrayOfShapes: null
        };
        this.cleanData = this.cleanData.bind(this);
     //   this.sendDataToServer = this.sendDataToServer.bind(this);
        this.pickProblemDate = this.pickProblemDate.bind(this);
        this.pickReplaceDate = this.pickReplaceDate.bind(this);
    }

    createMainArri = (num) => {
        var temp = this.props.fetchedArri[num][0];
        var tempMy = this.props.fetchedArri[num][1];
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
            var type = el.userDetails.type;
            var name = el.userDetails.name
            var userid = el.userDetails.userid
            var id = el._id
            var toran = el.toran
            var userStauts = el.userStatus;
            var shmiraType = el.shmiraType;
            var idUser = el.userDetails._id;
            var obi = {
                date, dayOfWeek, dayOfMonth, type, name, userid, id, toran, isMine,userStauts,shmiraType,idUser
            }
            if (this.props.selectValue === type) {
                if (tempArri[dayOfMonth] == null) {
                    tempArri[dayOfMonth] = [];
                    tempArri[dayOfMonth].push(obi)
                } else {
                    tempArri[dayOfMonth].push(obi)
                } }})}
        return (this.createTableBody(tempArri)
        )
    }

    getLstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }
    pickProblemDate(date) {
        this.props.pickMine(date);
    }
    unPickProblemDate(date) {
        this.props.unPickMine(date);
    }
    pickReplaceDate(date) {
    this.props.pickOther(date);
     }
     unPickReplaceDate(date) {
         this.props.unPickOther(date);
     }
    componentWillReceiveProps(nextProps) {  
        const amount = this.getAmountShmirotPerDay(nextProps);
        this.setState({amountToranim:amount});
       }
       UNSAFE_componentWillMount() {
        const amount = this.getAmountShmirotPerDay(this.props);
        this.setState({amountToranim:amount});
        }


    cleanData() {
        this.setState({oldData:null,newDate:null,ChosenSubstitute:false,status:"clean all data"});
    }
    getAmountShmirotPerDay(nextProps) {
        for(var i=0;i<nextProps.jobs.length;i++) {
            if(nextProps.jobs[i]._id == nextProps.selectValue) {
                return nextProps.jobs[i].numToranotPerDay;
            }
        }
    }
    createTableBody = (tempArri) => {
        if(this.props.newData != null) {
        }
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
                    let user = tempArri[x][g];
                    var backgroundColor;
                    switch(tempArri[x][g].userStauts) {
                        case "nothappy":
                            backgroundColor = "red";
                            break;
                        case "happy":
                            backgroundColor = "green";
                            break;
                        default:
                            backgroundColor = "teal";
                            break;
                    }
                    if (user.toran === 0) {
                        if(this.props.exchangeStatus == "others") {
                             var ok=false;
                            if(user.isMine == false) {
                                if(this.props.newData != null && this.props.newData.date.getDate() == x) {
                                     ok = true;
                                }
                                tempi2[user.shmiraType] = <LabelInCell pickReplaceDate={this.pickReplaceDate} pickProblemDate={this.pickProblemDate} user={user} {...this.props} amountToranim={this.state.amountToranim} arrayOfShapes={this.props.arrayOfShapes} backgroundColor={backgroundColor} g={g} />
                            }
                        } else if(this.props.exchangeStatus == "my") {
                            var ok=false;
                            if(user.isMine == true) {
                                if(this.props.oldData != null && this.props.oldData.date.getDate() == x) {
                                    ok = true;
                               } 
                         
                            tempi2[user.shmiraType] = <LabelInCell pickReplaceDate={this.pickReplaceDate} pickProblemDate={this.pickProblemDate} user={user} {...this.props} amountToranim={this.state.amountToranim} arrayOfShapes={this.props.arrayOfShapes} backgroundColor={backgroundColor} g={g} />
                        }
                    } else {
                        tempi2[user.shmiraType] = <LabelInCell pickProblemDate={this.pickProblemDate} user={user} {...this.props} amountToranim={this.state.amountToranim} arrayOfShapes={this.props.arrayOfShapes} backgroundColor={backgroundColor} g={g} />
             }
                    } else {
                        tempi2[user.shmiraType] =<div style={{ display: "flex",flexDirection: "column", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>                                <span style={{ backgroundColor: backgroundColor, borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                {this.props.arrayOfShapes[user.shmiraType%this.props.amountToranim]}
                                    {tempArri[x][g].name}
                                </span>
                            </div>
                    }             }}
            arri2[i] = {
                num: x,
                names: tempi2,
                data: tempArri[x]
            };
            x++;
        }
        return (this.createTds(arri2) )
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
                    rowArri[x] = <ShmirotCell jobs={this.props.jobs} x={x} data={arri2[g]}  amountToranim={this.state.amountToranim}/>
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
        const {classes} = this.props;
        return (
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%", textAlign: "center", border: "teal 1px solid", marginTop: "10px", borderRadius: "", overflow: "hidden", padding: "" }}>
                    <div className="shmirotheaders">
                        <div className="shmirotheaders-items">ראשון</div>
                        <div className="shmirotheaders-items">שני</div>
                        <div className="shmirotheaders-items">שלישי</div>
                        <div className="shmirotheaders-items">רביעי</div>
                        <div className="shmirotheaders-items">חמישי</div>
                        <div className="shmirotheaders-items">שישי</div>
                        <div className="shmirotheaders-items">שבת</div>
                    </div>
                    <div className="shmirotdivs-wrapper">
                    {this.createMainArri(this.props.tabValue).map((el, i) => {
                        return (
                            <div className="shmirotdivs" key={i}>
                                {el}
                            </div> )          })
                    }
                    </div>
                </div>
                {/* {this.state.ChosenSubstitute==false && this.state.newDate!= null?
                <div style={{textAlign: "center"}}>
                    <textarea className="textarea-exchange" type="text" placeholder="צרף הודעה" onChange={(e) => {this.setState({message:e.target.value})}} />
                  <div className="form-bottom">
                     <Button className="fobi1" onClick={this.sendDataToServer} >
             <i className="material-icons">send</i>
            </Button>
            <Button className="fobi2" onClick={this.cleanData} >
         <i className="material-icons">cancel</i>
        </Button>
         </div>
            </div>:null} */}
               
            </div>
        );
    }
}
