import React from "react";
import CONFIG from "../configs/env"
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
    dialogPaper: {
        width: "300px",
    }
   
  });


export default class ShmirotTableCompSmall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ChosenSubstitute: false,
            oldDate: null,
            newDate: null,
            status: "",
            message: ""
        };
        this.cleanData = this.cleanData.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
    }

    createMainArri = (num) => {
        var temp = this.props.fetchedArri[num][0];
        var tempMy = this.props.fetchedArri[num][1];
        console.log("propsFetchArri" , temp);
      // console.log("tempMy" , temp);
        var tempArri = [];
        if(temp != undefined && tempMy != undefined) {
        temp.forEach(el => {
            console.log("el" , el);
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
            console.log("type" , type , this.props.selectValue );

            var name = el.userDetails.name
            var userid = el.userDetails.userid
            var id = el._id
            var toran = el.toran
            var userStauts = el.userStatus;
         //   var toranotId = el.userDetails._id
          //  var userDetails = el.userDetails;
            var obi = {
                date, dayOfWeek, dayOfMonth, type, name, userid, id, toran, isMine,userStauts
            }
            if (this.props.selectValue === type) {
                console.log("c" , tempArri);
                if (tempArri[dayOfMonth] == null) {
                    tempArri[dayOfMonth] = [];
                    tempArri[dayOfMonth].push(obi)
                } else {
                    tempArri[dayOfMonth].push(obi)
                }

            }
        })
    }
        console.log("tempArri" , tempArri);
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
    sendDataToServer() {

    }
    cleanData() {
        this.setState({oldData:null,newDate:null,ChosenSubstitute:false,status:"clean all data"});
    }


    createTableBody = (tempArri) => {
        console.log("tempArri" , tempArri);
        if(this.props.newData != null) {
       // console.log("newDated" , this.props.newData.date);
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
               // console.log("sizeTempArri" , tempArri[x].length);
                for (var g = 0; g < tempArri[x].length; g++) {
                    let user = tempArri[x][g];
                 //   console.log("userData" , user);
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
                   // console.log("mycolor " , backgroundColor);

                    if (user.toran === 0) {
                    //    let xio = tempi2.pop()
                   // let xio = tempi2.top();
                        if(this.props.exchangeStatus == "others") {
                             var ok=false;
                            if(user.isMine == false) {
                                if(this.props.newData != null && this.props.newData.date.getDate() == x) {
                                     ok = true;
                                }
                            tempi2.push(
                            <div style={{ display: "flex",flexDirection: "column", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                <span style={{width:"60%",backgroundColor: backgroundColor, borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                    {tempArri[x][g].name}
                                </span>
                            <span style={{marginTop:"5px"}}>
                            {ok==true? <Button  onClick={() => this.unPickReplaceDate(user)} variant="outlined" style={{ border: "solid 1px teal", color: "teal",paddingRight: "0px",paddingLeft: "0px" }}>בטל בחירה</Button>  
                                 : <Button onClick={() => this.pickReplaceDate(user)} variant="outlined" style={{ border: "solid 1px teal", color: "teal" }}>בחר</Button>}
                                </span>
                               
                            </div>)
                          //  tempi2.push(xio)
                            }
                        } else if(this.props.exchangeStatus == "my") {
                            var ok=false;
                            if(user.isMine == true) {
                                if(this.props.oldData != null && this.props.oldData.date.getDate() == x) {
                                    ok = true;
                               }
                            tempi2.push(
                                        <div style={{ display: "flex",flexDirection: "column", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                            <span style={{ width:"60%",backgroundColor: backgroundColor, borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                               Me
                                            </span>
                                            <span style={{marginTop:"5px"}}>
                                            {ok==true? <Button  onClick={() => this.unPickProblemDate(user)} variant="outlined" style={{ border: "solid 1px teal", color: "teal",paddingRight: "0px",paddingLeft: "0px"}}>בטל בחירה</Button>  
                                              :<Button size="small" variant="outlined" onClick={() => this.pickProblemDate(user)} style={{ border: "solid 1px teal", color: "teal" }}>בחר</Button>}
                                            </span> 
                                       
                                        </div>)
                        
                        }
                    } else {
                        if(user.isMine == false) {
                        tempi2.push(
                            <div style={{ display: "flex",flexDirection: "column", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                <span style={{ width:"60%",backgroundColor: backgroundColor, borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                    {tempArri[x][g].name}
                                </span>
                                </div>)
                        }
                        else {
                            tempi2.push(
                                <div style={{ display: "flex",flexDirection: "column", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                    <span style={{ width:"60%",backgroundColor: backgroundColor, borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                       Me
                                    </span>
                                    </div>)
                        }
                    }
                    
                    } else {
                        tempi2.push(
                            <div style={{ display: "flex", alignItems: "center", margin: "3px 0 3px 0" }} key={g}>
                                <span style={{ backgroundColor: backgroundColor, borderRadius: "4px", flex: "1", color: "white", padding: "2px", boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.75)" }}>
                                    {tempArri[x][g].name}
                                </span>
                            </div>)
                    }

                }
            }
          //  console.log("tempi2" , tempi2 , x );
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

                  //  console.log("createTds" , arri2[g].names);
                    started2 = true
                    started = true;
                    rowArri[x] = <div key={x}
                        style={{ border: "solid 1px teal", flex: "1", flexDirection: "column", display: "flex", minHeight: "8vh", padding: "5px" }}>
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
       // console.log("allROWarri" , allRowArri);
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
                            </div>
                        )
                    })
                    }
                    </div>
                </div>
                {this.state.ChosenSubstitute==false && this.state.newDate!= null?
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
            </div>:null}
               
            </div>
        );
    }
}
