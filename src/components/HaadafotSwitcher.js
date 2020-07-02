import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Haadafot from "./Haadafot";
import Fab from "@material-ui/core/Fab";
import { Button } from "@material-ui/core";
import LoadingPage from "./LoadingPage";
import CONFIG from "../configs/env"

export default class HaadafotSwitcher extends React.Component {
    constructor() {
        super();
        // this.handlenew = this.handlenew.bind(this);
        this.forMethod = this.forMethod.bind(this);
        this.deleteMethod = this.deleteMethod.bind(this);
        this.fetchyfetch = this.fetchyfetch.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
        this.forFetch = this.forFetch.bind(this);
        this.getDataFromSon = this.getDataFromSon.bind(this);
        this.createStaticFetchedHaadafot = this.createStaticFetchedHaadafot.bind(this);
        this.addDeleteArray = this.addDeleteArray.bind(this);

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
            
        };
    }



    getDiff = () => {
        let final = 0;
      this.state.childrenData.forEach(item => {
            let begin = new Date(item.begindate)
            let end = new Date(item.enddate)
            let sub = end.getTime() - begin.getTime()
            final += (sub / (1000 * 3600 * 24)) + 1
        })
        let f1 = 8 - final
        this.setState({ dayCount: f1 }, () => this.limiter()
        )
    }
    limiter = () => {
        if (this.state.dayCount === 0) {
            this.setState({ showPlus: true })
        } else if (this.state.dayCount > 0) {
            this.setState({ showPlus: false })
        }
    }
   async getDataFromSon(x, y, count, g,checked) { //here we talk with component
    if(this.state.isNeedToChange == false) {
        console.log("getDataFromSon",x, "" , count);
        var tempi = this.state.childrenData;

        var tempiArray = this.state.arri;
      //  if(this.state.isNeedToChange) {
        var index = this.state.arrayMapIndex.indexOf(count);
        console.log("before", tempi ," arri" , tempiArray  );
        if(checked) {
            console.log("pass");
           if(index !== -1) {
        this.setState({isNeedToChange:true});
          tempiArray.splice(index,1);
          tempi.splice(index,1);
            // var tempiArrayT = [];
            // var tempiT = [];
            // for(var i=0;i<tempiArray.length-1;i++) {
            //     if(i < index) {
            //         tempiArrayT[i] = tempiArray[i];
            //         tempiT[i] = tempi[i];
            //     } else {
            //         tempiArrayT[i] = tempiArray[i+1];
            //         tempiT[i] = tempi[i+1];
            //     }
            // }


            await this.increaseArrayByIndex(index);
            console.log("after", tempi ," arri" , tempiArray);
        //    this.setState({ childrenData: tempiT,arri:tempiArrayT}, () => this.getDiff());
   
           }
        } else {
            var obi = { begindate: x, enddate: y, type: g };
            console.log("arraymap" ,  this.state.arrayMapIndex , "count" , count );
            console.log("index" , index , "obj" , obi.begindate);
            tempi[index] = obi;

        }
        this.setState({ childrenData: tempi,arri:tempiArray,isNeedToChange:false}, () => this.getDiff());

     //   }
    }
    }

    UNSAFE_componentWillMount() {
        this.fetchyfetch();
    }

    sendDataToServer() {
        // this.setState({ loaded: false });
        var dat = this.state.childrenData;
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
        fetch(CONFIG.API.GETHAADAFOT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(data => data.json())
            .then(dat => this.forFetch(dat))
            .catch(err => console.log(err));
    }

    forFetch(data) {
        console.log(data);
        this.setState({ fetchedArri: data });
        this.setState({ loaded: true });
        this.createStaticFetchedHaadafot();
        // this.getDiff()

    }
    setArray(size) {
        var array = [];
        for(var i=0;i<size;i++) {
            array[i] = i;
        }
        this.setState({arrayMapIndex:array})
    }
    increaseArrayByIndex(index) {
        console.log("start increase");

        var array = this.state.arrayMapIndex;
       // console.log("index" , index ,"arraylength", this.state.arrayMapIndex);
        for(var i=index;i<this.state.arrayMapIndex.length;i++) {
            array[i] = array[i] + 1;
        }
        this.state.arrayMapIndex.pop();
       // console.log(this.state.arrayMapIndex);
        this.setState({arrayMapIndex:array});
        console.log("finish increase");
    }

    createStaticFetchedHaadafot() {
        var fetched = this.state.fetchedArri;
        var tempi = this.state.arri;
        this.setArray(fetched.length);
        fetched.forEach((element, i) => {
            tempi.push(
                <Haadafot
                    key={i}
                    data={element}
                    getDataFromSon={this.getDataFromSon}
                    compCount={this.state.compCount}
                    dayCount={this.state.dayCount}
                    addDeleteArray={this.addDeleteArray}
                />
            );
            var x = this.state.compCount + 1;
            this.setState({ compCount: x });
        });
        this.setState({ arri: tempi });
        // this.getDiff()

    }
    componentDidMount() {
        this.getDiff()
    }

    addDeleteArray(value,checked) {
        var array =[];
        array = this.state.arriDelete;
        console.log("addDeleteArray",value , " , " , checked);
        if(checked == true) {
        array.push(value);
        } else {
        const index = array.indexOf(value);
        if(index == -1) {
            console.log("erorr");
        } else {
            array.splice(index, 1);
         } }
         console.log("delete array",array);
         this.setState({arriDelete:array});
    }
    increaseArray() {
        var array = this.state.arrayMapIndex;
        array[array.length] = array[array.length-1] + 1;
        this.setState({arrayMapIndex:array});
    }
    forMethod() {
        var tempi = this.state.arri;
        this.increaseArray();
        tempi.push(
            <Haadafot
                getDataFromSon={this.getDataFromSon}
                compCount={this.state.compCount}
                dayCount={this.state.dayCount}
                addDeleteArray={this.addDeleteArray}
            />
        );

        var x = this.state.compCount + 1;
        this.setState({ compCount: x });
        console.log("tempi add", tempi);
        this.setState({ arri: tempi });

    }
    deleteMethod() {
        var tempi = this.state.arri;

       // tempi.pop();
       // this.setState({ arri: tempi });
        var tempi2 = this.state.childrenData;
      //  tempi2.pop();
     // console.log("tempi2" , tempi2);
        
       // console.log("ready arridelte",this.state.arriDelete);
      //  console.log("map index array",this.state.arrayMapIndex);
    //    for(var i=0;i<this.state.arriDelete.length;i++) {
    //        //var index = tempi2.indexOf(arriDelete[i]);
    //        var value = this.state.arriDelete[i];
          

    //    }

        // this.state.arriDelete.forEach(element => {
        //    //tempi2[element] = null;
        //    var index = tempi2.indexOf(haadafotUser[i]);
        //    if (index !== -1) newCounter.splice(index, 1);
        // });
        console.log("after" , tempi ,"tmpi", tempi);
        this.setState({ childrenData: tempi2,arri: tempi }, () => this.getDiff());
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
                            <h3 style={{ color: "red", marginTop: "4px" }}>מזכיר שנמו רק בפיילוט ושבמקביל יש להשתמש בדף העדפות בקומה 5.</h3>
                            <h3 style={{ color: "grey", marginTop: "4px" }}>יש לך עוד <span style={{ color: "teal" }}>{this.state.dayCount}</span> העדפות ואילוצים להזין.</h3>
                        </div>
                        {this.state.arri.map(item => item)}
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
                            <Fab
                                onClick={() => this.deleteMethod()}
                                className="fobi2"
                                style={{}}
                            >
                                <i className="material-icons">delete</i>
                            </Fab>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "20px"
                            }}
                        >
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
