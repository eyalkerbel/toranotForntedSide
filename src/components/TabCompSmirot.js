import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Select, MenuItem } from "@material-ui/core";


export default class TabComp extends React.Component {

    handletabs = (num) => {
        this.props.bubbleTabs(num)
    }

    handleSelect = (event) => {
        this.props.bubbleSelect(event.target.value)
    }

    render() {
        return (
            <AppBar position="static" style={{ backgroundColor: "white", display: "flex", flexDirection: "row" }}>
                <Select value={this.props.selectValue} onChange={this.handleSelect} style={{ flex: "2" }} className="diffselect">
                    <MenuItem value={0}>שמירות שלי</MenuItem>
                    <MenuItem value={1}>בקשות להחלפות</MenuItem>
                    <MenuItem value={2}>תשובות של החלפות</MenuItem>
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
