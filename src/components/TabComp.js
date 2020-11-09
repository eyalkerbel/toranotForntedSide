import React from "react";
import {connect} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Select, MenuItem } from "@material-ui/core";


 class TabComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    handletabs = (num) => {
        this.props.bubbleTabs(num)
    }

    handleSelect = (event) => {
        this.props.bubbleSelect(this.props.jobs[event.target.value]._id);
        this.setState({index:event.target.value});
    }

    render() {
        return (
            <AppBar position="static" style={{ backgroundColor: "white", display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "1", color: "teal", display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
                    {this.props.selectedUser == undefined?"בחר משתמש" :  this.props.selectedUser.name}
                </div>
                <Select value={this.state.index} onChange={this.handleSelect} style={{ flex: "2" }} className="diffselect">
                    {this.props.jobs.map((element,index) => <MenuItem value={index}>{element.name}</MenuItem>)}
                    {/* <MenuItem value={0}>סמל תורן בפנים</MenuItem>
                    <MenuItem value={1}>קצין תורן בפנים</MenuItem>
                    <MenuItem value={2}>חייל חובה חוץ</MenuItem>
                    <MenuItem value={3}>נגד שער</MenuItem>
                    <MenuItem value={4}>ע' קצין תורן</MenuItem>
                    <MenuItem value={5}>קצין תורן</MenuItem>
                    <MenuItem value={6}>מפקד תורן</MenuItem> */}
                </Select>
                <Tabs
                    style={{
                        flex: "5",
                        backgroundColor: "white",
                        color: "teal"
                    }}
                    value={this.props.tabValue}
                    aria-label="simple tabs example"
                >
                    <Tab
                        label="חודש הנוכחי"
                        onClick={() => {
                            this.handletabs(0);
                        }}
                    />
                    <Tab
                        label="חודש הבא"
                        onClick={() => {
                            this.handletabs(1);
                        }}
                    />
                </Tabs>
            </AppBar>
        );
    }
}


function mapStateToProps(state) {
    return {
        jobs: state.jobs
    }
}

export default connect(mapStateToProps,null)(TabComp);