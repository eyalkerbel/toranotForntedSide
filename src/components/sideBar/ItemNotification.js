import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import {Fab} from "@material-ui/core";
import {ThemeContext} from "../../ColorMode/colors"
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {deleteNotficiationMiddleWare} from ".././../Actions/UserNotficiationsAction";
class ItemNotification extends React.Component {
    constructor(props){
        super(props);
    }
    static contextType = ThemeContext;
    handleClick() {
        console.log("handleClick");

        if(this.props.data.redirect == "myShmirot") {
            this.props.history.push('/shmirot');
           }
           if(this.props.data.redirect == "wantExchange") {
            this.props.history.push({  
                pathname: '/shmirot',
              state: {urlExchange: true,index: 1}
              });
            }
            if(this.props.data.redirect == "answerExchange") {
                this.props.history.push({  
                    pathname: '/shmirot',
                  state: {urlExchange: true,index: 2}
                  });
            }
            if(this.props.data.redirect == "ApproveManager") {
                this.props.history.push({  
                    pathname: '/approve_change'
                  });
            } 
            if(this.props.data.redirect== "ToranotTogther") {
                this.props.history.push({  
                    pathname: '/pick_friend_toranot_together'
                  });
            }
        
    }
    deleteNotification() {
        console.log("deleteNotification" , this.props.data);
        this.props.deleteNotification(this.props.data.notificationInfo._id);
    }

    render() {
        console.log("itemRender");
        return (
            <div className="notification-item" style={{backgroundColor:this.context.extreme,color:this.context.exteme}}>
            <Dropdown.Item  onClick={() => this.handleClick()}>
         
                <div className="message-notifiction">
                <div id="message-notification-description">
                    {this.props.data.message}
                    </div>
                <div className="divider" />
                <div id="message-notification-date">
                    {this.props.data.dateNotification}
                </div>
                
                </div>
                </Dropdown.Item > 
                <div className="divider-right"></div>
                <div className="delete-notification-container">
                 <Fab size="small" onClick={() => this.deleteNotification()}>
                     <i className="material-icons">delete</i>
                 </Fab>
                </div>
                 </div> 
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        deleteNotification: (_id) => dispatch(deleteNotficiationMiddleWare(_id))
    }
}

export default connect(null,mapDispatchToProps)(withRouter(ItemNotification));