import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Haadafot from "./Haadafot";
import Fab from "@material-ui/core/Fab";
import { Button } from "@material-ui/core";
import LoadingPage from "./LoadingPage";
import CONFIG from "../configs/env"
import { connect } from "react-redux";

 class HaadafotSwitcher extends React.Component {
    constructor() {
        super();
        // this.handlenew = this.handlenew.bind(this);
        this.forMethod = this.forMethod.bind(this);
        this.deleteMethod = this.deleteMethod.bind(this);
        this.fetchyfetch = this.fetchyfetch.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
        this.forFetch = this.forFetch.bind(this);
     //   this.getDataFromSon = this.getDataFromSon.bind(this);
        this.createStaticFetchedHaadafot = this.createStaticFetchedHaadafot.bind(this);
        this.saveDelete = this.saveDelete.bind(this);
        this.updateOnAdd = this.updateOnAdd.bind(this);
        this.state = {
            arri: [],
            loaded: false,
            childrenData: [],
            compCount: 0,
            dayCount: 0,
            showPlus: false,
            arriDelete: [],
            arrayMapIndex: [],
            isNeedToChange:false,
            allChildren: [],
            canOneMore:true,
            fetchedArri: [],
            arriAdditonal: []
            
        };
    }

    
    getDiff = () => {
        console.log("get diff", this.props.myHaadafot);
        let final = 0;
      this.props.myHaadafot.forEach(item => {
          if(item != null) {
            let begin = new Date(item.begindate)
            let end = new Date(item.enddate)
            let sub = end.getTime() - begin.getTime()
            final += (sub / (1000 * 3600 * 24)) + 1
          }
        });
        let f1 = 8 - final;
        console.log("f1 " , f1);
        this.setState({ dayCount: f1 }, () => this.limiter())
     //  return f1;
    }
    limiter = () => {
        if (this.state.dayCount === 0) {
            this.setState({ showPlus: true })
        } else if (this.state.dayCount > 0) {
            this.setState({ showPlus: false })
        }
    }

    async dataExistInArray(x,y) {
        
        var temp = this.state.childrenData;
        console.log("childern", temp);
        let beginDateX = new Date(x);
        let endDateY = new Date(y);
        let newBegin = beginDateX.getDate();
        let newEnd = endDateY.getDate();
        for(var i=0;i<temp.length;i++) {
            var element = temp[i];
            if(element != null) {
            let beginDate = new Date(element.begindate);
            let endDate = new Date(element.enddate);
            let beginChildren = beginDate.getDate();
            let endChildren = endDate.getDate();
            console.log("new begin" , newBegin , "," , newEnd);
            console.log("child" , beginChildren , ", " , endChildren);
            if((newBegin >= beginChildren && newBegin <= endChildren) || (newEnd >= beginChildren && newEnd <= endChildren) || (newBegin <= beginChildren && newEnd >= endChildren)){
                console.log("begin" , beginChildren , "end" , endChildren , "new" , newBegin , "after", newEnd);    
                console.log("true" , i);
                return true;
            }
        }
            }
            return false;
    } 
//    async getDataFromSon(x, y, count, g,checked,kindDescription) { //here we talk with component
//     console.log("passs");
//     var obi = { begindate: x, enddate: y, type: g };
//     console.log("obiNew" , obi);
//     var tempi = this.state.childrenData;
//     var temp2 = this.state.allChildren;
//     console.log("tempi " , tempi);
//     var isexits = await this.dataExistInArray(x,y);
//     console.log("isexits" , isexits);
//    if(isexits) {
//       //  alert("פעמיים אותו הדבר");
//       //  this.saveDelete(count);
//     } else {
//     //this.state.allChildren[count] = obi;
//     tempi[count] = obi;
//     temp2[count] = obi;
//     console.log("tempiNew" , tempi);
//     this.setState({ childrenData: tempi,allChildren: temp2 }, () => this.getDiff());
//     }
//     }

    UNSAFE_componentWillMount() {
        this.fetchyfetch();
    }

    sendDataToServer() {
        // this.setState({ loaded: false });
        var dattemp = this.state.childrenData;
        console.log("before childen"  , dattemp)
        var dat = dattemp.filter(elemnet => elemnet != null ); 
        console.log("afer childer" , dat);
        fetch(CONFIG.API.SETHAADAFOT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify(dat)
        })
            // .then(res => {
            //     this.setState({ loaded: true })
            // })
            .then(this.getDiff())


    }

    fetchyfetch() {
        // fetch(CONFIG.API.GETHAADAFOT, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json;charset=utf-8",
        //         Authorization: "Bearer " + localStorage.getItem("jwt")
        //     }
        // })
        //     .then(data => data.json())
        //     .then(dat => this.forFetch(dat))
        //     .catch(err => console.log(err));
        this.forFetch(this.props.myHaadafot);
    }

    forFetch(data) {
        console.log(data);
        this.setState({ fetchedArri: data,allChildren:data});
        this.setState({ loaded: true });
        this.createStaticFetchedHaadafot();
         this.getDiff()

    }
    setArray(size) {
        var array = [];
        for(var i=0;i<size;i++) {
            array[i] = i;
        }
        this.setState({arrayMapIndex:array})
    }
    increaseArrayByIndex(index) {

        var array = this.state.arrayMapIndex;
       // console.log("index" , index ,"arraylength", this.state.arrayMapIndex);
        for(var i=index;i<this.state.arrayMapIndex.length;i++) {
            array[i] = array[i] + 1;
        }
        this.state.arrayMapIndex.pop();
       // console.log(this.state.arrayMapIndex);
        this.setState({arrayMapIndex:array});
    }

    createStaticFetchedHaadafot() {
        var fetched = this.props.fetchedArri;
        var tempi = this.state.arri;
        if(fetched != undefined) {
        this.setArray(fetched.length);
        fetched.forEach((element, i) => {
            tempi.push(
                <Haadafot
                    key={i}
                    data={element}
                    getDataFromSon={this.getDataFromSon}
                    compCount={this.state.compCount}
                    dayCount={this.state.dayCount}
                    saveDelete={this.saveDelete}
                />
            );
            var x = this.state.compCount + 1;
            this.setState({ compCount: x });
        });
        this.setState({ arri: tempi });
        // this.getDiff()
    }
    }
    componentDidMount() {
        this.getDiff()
    }

    saveDelete(value) {
 
        this.setState({canOneMore:true});
    }
    increaseArray() {
        var array = this.state.arrayMapIndex;
        array[array.length] = array[array.length-1] + 1;
        this.setState({arrayMapIndex:array});
    }
    updateOnAdd() {
        this.setState({canOneMore:true});
    }
 
    deleteMethod() {
        var tempi = this.state.arri;
        var tempi2 = this.state.childrenData;
        this.setState({ childrenData: tempi2,arri: tempi, }, () => this.getDiff());
    } 

    forMethod() {
        //  var tempi = this.state.arri;
        var tempi = [];
        
            var tempiNull = [];
          this.increaseArray();
          if(this.state.canOneMore == true) {
              console.log("succsees");
          // tempi.push(
          //     <Haadafot
          //         getDataFromSon={this.getDataFromSon}
          //         compCount={this.state.compCount}
          //         dayCount={this.state.dayCount}
          //         saveDelete ={this.saveDelete}
          //         updateOnAdd={this.updateOnAdd}
          //     />
          // );
          tempiNull.push(
              <Haadafot
                  getDataFromSon={this.getDataFromSon}
                  compCount={this.state.compCount}
                  dayCount={this.state.dayCount}
                  saveDelete ={this.saveDelete}
                  updateOnAdd={this.updateOnAdd}
                  hasSend={false}
              />
          );
  
          var x = this.state.compCount + 1;
          //this.setState({  });
          this.setState({ arri: tempi,canOneMore:false,arriAdditonal:tempiNull,compCount: x });
          
          }
      }

    renderHaadafot() {
        console.log("renderHaadafot" , this.props.myHaadafot);
        var fetched = this.props.myHaadafot;
     //   this.getDiff()
        //var tempi = this.state.arri;
        var tempi = [];
//this.setArray(fetched.length);
            if(fetched != undefined) {
        fetched.forEach((element, i) => {
            tempi.push(
                <Haadafot
                    key={i}
                    data={element}
                    getDataFromSon={this.getDataFromSon}
                    compCount={this.state.compCount}
                    dayCount={this.state.dayCount}
                    saveDelete={this.saveDelete}
                    hasSend={true}
                />
            );
            var x = this.state.compCount + 1;
               

          //  this.setState({ compCount: x });

        });
        }
        if(this.state.canOneMore == false) {
            console.log("kkk");
            tempi.push(this.state.arriAdditonal[0]);
        }
        return tempi;
       // this.setState({ arri: tempi });
        // this.getDiff()
    }

    render() {
      //  {console.log("arri" , this.state.arri)}
        return (
            <Fragment>
                {this.state.loaded ? (
                    <Paper className="maincontainer">
                        <div className="header-container">
                            <h1 className="header">העדפות ואילוצים</h1>
                            <div className="divider" />
                            <h3 style={{ color: "red", marginTop: "4px" }}></h3>
                            <h3 style={{ color: "grey", marginTop: "4px" }}>יש לך עוד <span style={{ color: "teal" }}>{this.props.numRemaining}</span> העדפות ואילוצים להזין.</h3>
                        </div>
                        {/* {this.state.arri.map(item => item)} */}
                        {this.renderHaadafot()}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px"
                            }}
                        >
                            <Fab
                                onClick={() => this.forMethod()}
                                className="fobi1"
                                style={{}}
                                disabled={this.state.showPlus}
                            >
                                <i className="material-icons">add</i>
                            </Fab>
                            {/* <Fab 
                                onClick={() => this.deleteMethod()}
                                className="fobi2"
                                style={{}}
                            >
                                <i className="material-icons">delete</i>
                            </Fab> */}
                            <Button
                                variant="contained"
                                onClick={() => this.sendDataToServer()}
                            >
                                שמור
              </Button>

                        </div>
                    </Paper>
                ) : (
                        <LoadingPage >
                        </LoadingPage>
                    )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    myHaadafot: state.myHaadafot.haadafot,
    numRemaining:state.myHaadafot.numRemaining
  });

  export default connect(mapStateToProps,null)(HaadafotSwitcher);
