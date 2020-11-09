import React from "react";

export function withJobItem(jobItem) {
    return class extends React.Component {
     // make some enhancements
        sendToStore() {
            //Redux
        }
       render() {
          //return original component with additional props
          return <jobItem {...this.props} sendToStore={this.sendToStore} />
       }
    }
 }