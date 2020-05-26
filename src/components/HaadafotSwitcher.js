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
        this.createStaticFetchedHaadafot = this.createStaticFetchedHaadafot.bind(
            this
        );
        this.state = {
            arri: [],
            loaded: false,
            childrenData: [],
            compCount: 0,
            dayCount: 0,
            showPlus: false
        };
    }
    getDiff = () => {
        let final = 0;
        // console.log(this.state.childrenData)
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
    getDataFromSon(x, y, count, g) {
        var obi = { begindate: x, enddate: y, type: g };
        var tempi = this.state.childrenData;
        tempi[count] = obi;
        this.setState({ childrenData: tempi }, () => this.getDiff());
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
        this.setState({ fetchedArri: data });
        this.setState({ loaded: true });
        this.createStaticFetchedHaadafot();
        // this.getDiff()

    }

    createStaticFetchedHaadafot() {
        var fetched = this.state.fetchedArri;
        var tempi = this.state.arri;
        fetched.forEach((element, i) => {
            tempi.push(
                <Haadafot
                    key={i}
                    data={element}
                    getDataFromSon={this.getDataFromSon}
                    compCount={this.state.compCount}
                    dayCount={this.state.dayCount}
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
    forMethod() {
        var tempi = this.state.arri;
        tempi.push(
            <Haadafot
                getDataFromSon={this.getDataFromSon}
                compCount={this.state.compCount}
                dayCount={this.state.dayCount}
            />
        );
        var x = this.state.compCount + 1;
        this.setState({ compCount: x });

        this.setState({ arri: tempi });

    }
    deleteMethod() {
        var tempi = this.state.arri;
        tempi.pop();
        this.setState({ arri: tempi });

        var tempi2 = this.state.childrenData;
        tempi2.pop();
        this.setState({ childrenData: tempi2 }, () => this.getDiff()
        );
    }

    render() {
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
