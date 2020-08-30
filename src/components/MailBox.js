import React, {Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import CONFIG from "../configs/env";
import LoadingPage from "./LoadingPage";
// import { id, da } from "date-fns/locale";
import Mail from "./Mail";

export default class MailBox extends React.Component {
    constructor(){
    super();
    this.state ={ 
        message: [],
        loading:true,
        compMessage: [],
        data: [],
        bodyIndex: null
    };
    this.mailClick = this.mailClick.bind(this);
    }
    componentWillMount() {
        if(this.state.loading) {
            this.getMessage();
        }
    }
    getMessage() {
        fetch(CONFIG.API.GETMESSAGEBYID, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
           },
        }).then(data => data.json()).then((dat) => this.forFetch(dat));
    }
    mailClick(index) {
        this.setState({bodyIndex:index});
    }

    forFetch(data) {
        console.log("data", data);
        var temp = [];
        
        data.forEach((element,index) => {
            temp.push(<Mail key={index} index={index} header={element.header} body={element.body} name={element.name} mailClick={this.mailClick} />  )
        });
        this.setState({message:data,loading:false,data:data,compMessage:temp});
    }
    render() {
        return (
            <Paper className="maincontainer">
            <div className="header-container">
               <h1 className="header">תיבת דואר</h1>
            <div className="divider" />
            <div className="mail-list">
             <div className="mail-headers">
                <p className="mail-sender">שולח</p>
                <p className="mail-title">כותרת</p>
             </div>
             <div className="mail-data">
             {this.state.compMessage.map(item => item)}
             </div>
            </div>
            <div className="mail-body">
            {this.state.bodyIndex == null? "pick mail" : this.state.data[this.state.bodyIndex].body}
            </div>
            </div>
           </Paper>
        )
    
    }
}