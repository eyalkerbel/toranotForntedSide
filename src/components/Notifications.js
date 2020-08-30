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
            if(this.props.exchanges[i].seen == "false")
        NotificationManager.info(this.props.info[i],"action:",3000,() => {this.ReadAndDispaly(i)
        });
        }
        for(var i=0;i<this.props.exchanges.length;i++) {
            NotificationManager.info(this.props.exchanges[i],"action:",3000,() => {this.ReadAndDispaly2(i)
            });
            }
         }
      ReadAndDispaly(index) {
        this.props.history.push('/shmirot');
      }
      ReadAndDispaly2(index) {
        console.log("pppp");
        this.props.history.push({  
          pathname: '/shmirot',
        state: {urlExchange: true}
        });
      }

      render() {
          return (<div>{this.createNotification()} </div>);
      }

} 

export default withRouter(Notifications);