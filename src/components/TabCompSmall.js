import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Select, MenuItem } from "@material-ui/core";
import {connect} from "react-redux";
import {ThemeContext} from '.././ColorMode/colors';


class TabCompSmall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    static contextType = ThemeContext;

    handletabs = (num) => {
        this.props.bubbleTabs(num)
    }

    handleSelect = (event) => {
        //this.props.bubbleSelect(event.target.value)
        this.props.bubbleSelect(this.props.jobs[event.target.value]._id);
        this.setState({index:event.target.value});

    }

    render() {
        console.log('props' ,this.props);
        return (
            <AppBar position="static" style={{ display: "flex", flexDirection: "row" }}>
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
                <Tabs TabIndicatorProps={{style: {background:this.context.bodyText}}}
                    style={{
                        flex: "5",
                        color: this.context.titleText

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

export default connect(mapStateToProps,null)(TabCompSmall);
