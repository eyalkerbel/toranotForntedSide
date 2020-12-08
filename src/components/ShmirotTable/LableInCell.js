import { extend } from "joi";
import React from "react";
import {connect} from "react-redux";
 class LabelInCell extends React.Component {
     constructor(props) {
         super(props);
         this.pickMyDate = this.pickMyDate.bind(this);
     }
     pickMyDate() {
         if(this.props.exchangeStatus == "my") {
         this.props.pickProblemDate(this.props.user) 
         } else if(this.props.exchangeStatus == "others") {
             this.props.pickReplaceDate(this.props.user);
         }
     }
     getColor(id) {
         console.log("getColor" , id , this.props.user);
        for(var i=0;i<this.props.colors.length;i++) {
           if(this.props.colors[i].idUser ==  id) {
               console.log("foundOne");
                return this.props.colors[i].color;
            }
        }
    } 

     render() {
        const color =  this.getColor(this.props.user.idUser);
        //backgroundColor: this.props.backgroundColor
         console.log("propsLabel" , (this.props.user.shmiraType%this.props.amountToranim) % 3);
         return (<div onClick={this.pickMyDate} id="div-label-in-cell"  key={this.props.g}>
                                <span style={{backgroundColor:color}} className="shmirotToran">
                              <div className="list-item-shape-display">
                                {this.props.arrayOfShapes[(this.props.user.shmiraType%this.props.amountToranim) % 3]}
                                </div>
                                {this.props.user.isMine==false? this.props.user.name : "אני"}
                                </span>
                                </div>
         );
     }
     
 }
 function mapStateToProps(state) {
     return {
         colors: state.toranim.colors
     }
 }

 export default connect(mapStateToProps,null)(LabelInCell);


 