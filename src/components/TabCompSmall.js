import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Select, MenuItem } from "@material-ui/core";


export default class TabCompSmall extends React.Component {

    handletabs = (num) => {
        this.props.bubbleTabs(num)
    }

    handleSelect = (event) => {
        this.props.bubbleSelect(event.target.value)
    }

    render() {
        console.log('props' ,this.props);
        return (
            <AppBar position="static" style={{ backgroundColor: "white", display: "flex", flexDirection: "row" }}>
                <Select value={this.props.selectValue} onChange={this.handleSelect} style={{ flex: "2" }} className="diffselect">
                    <MenuItem value={0}>סמל תורן בפנים</MenuItem>
                    <MenuItem value={1}>קצין תורן בפנים</MenuItem>
                    <MenuItem value={2}>חייל חובה חוץ</MenuItem>
                    <MenuItem value={3}>נגד שער</MenuItem>
                    <MenuItem value={4}>ע' קצין תורן</MenuItem>
                    <MenuItem value={5}>קצין תורן</MenuItem>
                    <MenuItem value={6}>מפקד תורן</MenuItem>
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
