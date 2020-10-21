import React from "react";
import {NotificationManager,NotificationContainer} from 'react-notifications';
import { withRouter } from "react-router-dom";
import CONFIG from "../configs/env";


 class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }




    createNotification() {
       for(var i=0;i<this.props.info.length;i++) {
        // if(this.props.exchanges[i].seen == "false")

          if(this.props.info[i].action == "myShmirot") {
             NotificationManager.info(this.props.info[i].message,"",3000,() => {this.MyShmirot(i) });
            }
            if(this.props.info[i].action == "wantExchange") {
              NotificationManager.info(this.props.info[i].message,"",3000,() => {this.wantExchage(i) });
             }
             if(this.props.info[i].action == "answerExchange") {
              NotificationManager.info(this.props.info[i].message,"",3000,() => {this.AnswerExchage(i) });
             }
             if(this.props.info[i].action == "ApproveManager") {
              NotificationManager.info(this.props.info[i].message,"",3000,() => {this.ApproveManager() });
             } 
             if(this.props.info[i].action == "ToranotTogther") {
              NotificationManager.info(this.props.info[i].message,"",3000,() => {this.toranotTogther() });

             }
         }
     
      }
  
      MyShmirot(index) {
        this.props.history.push('/shmirot');
      }
      wantExchage(index) {
        console.log("pppp");
        this.props.history.push({  
          pathname: '/shmirot',
        state: {urlExchange: true,index: 1}
        });
      }
      AnswerExchage(index) {
        console.log("pppp");
        this.props.history.push({  
          pathname: '/shmirot',
        state: {urlExchange: true,index: 2}
        });
      }
      ApproveManager() {
        this.props.history.push({  
          pathname: '/approve_change'
        });
      }
      toranotTogther() {
        this.props.history.push({  
          pathname: '/pick_friend_toranot_together'
        });
      }


      render() {
          return (<div>{this.createNotification()} </div>);
      }

} 

export default withRouter(Notifications);