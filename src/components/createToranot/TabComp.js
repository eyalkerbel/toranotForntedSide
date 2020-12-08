import React from "react";
import {connect} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { Select, MenuItem } from "@material-ui/core";
import {ThemeContext} from '../../ColorMode/colors';


 class TabComp extends React.Component {
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
        this.props.bubbleSelect(this.props.jobs[event.target.value]._id);
        this.setState({index:event.target.value});
    }
    getMonthName(monthValue) {
        console.log("getMonthValue" , monthValue);
        switch(monthValue) {
            case 1:
                return "ינואר";
            case 2:
                return "פבואר";
            case 3:
                return "מארס";
            case 4:
                return "אפריל";
            case 5:
                return "מאי"; 
            case 6:
                return "יוני";
            case 7:
               return "יולי";
            case 8:
                return "אוגוסט";
            case 9:
                return "ספטמבר";
            case 10:
                return "אוקטובר";
            case 11:
                return "נובמבר";
            case 0:
                 return "דצמבר";
        }
    }

    render() {
        const monthCurrent= this.getMonthName((new Date().getMonth()+1)%12);
        const monthNext = this.getMonthName((new Date().getMonth()+2)%12);
        console.log("getMonthValue" , monthCurrent);

        console.log("renderTabComp" , this.props);
        return (
            <AppBar position="static" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: "1",color: this.context.titleText, display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
                {this.props.selectedUser == undefined?"בחר משתמש" :  this.props.selectedUser.name}
                </div>
                <Select className={{fontSize: 22}} value={this.state.index} onChange={this.handleSelect} classes={{
                "MuiInputBase-root": {fontSize: "2rem",color:"red"}
            }}
           style={{ flex: "2",color: this.context.titleText,fontSize: 22  }} >
                    {this.props.jobs.map((element,index) => <MenuItem value={index}>{element.name}</MenuItem>)}
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
                        label={monthCurrent}
                        onClick={() => {
                            this.handletabs(0);
                        }}
                    />
                    <Tab
                        label={monthNext}
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