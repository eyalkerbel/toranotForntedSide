import React, {Fragment}  from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import {  Fab } from "@material-ui/core";

import {symbolDiamondSquare} from "d3-symbol-extra";
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';
import {connect} from "react-redux";
import ButtonInDialog from "./ButtonInDialog";
const styles = theme => ({
    dialogPaper: {
        width: "100%",
        height: "500px",
        paddingRight: "0 !important",
        paddingLeft: "0 !important"
      
        
    },
  });


class DialogCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfShapes: [],
            usersDay: []
        }
        this.handleClose = this.handleClose.bind(this);

    }
    componentWillMount() {
        var arri = [];
        arri.push(<Rectangle width={20} height={20} fill={{color:'black'}}  />)
        arri.push(<Circle r={14} fill={{color:'#2409ba'}}  />)
        arri.push(<Ellipse rx={5} ry={15} fill={{color:'#2409ba'}}  />)
        arri.push(<Triangle width={15} height={15} fill={{color:'#2409ba'}}  />)
        arri.push(<Rectangle width={20} height={20} fill={{color:'pink'}}  />)
        arri.push(<Line x1={25} x2={35} y1={25} y2={35} stroke={{color:'#E65243'}} />)
        this.setState({arrayOfShapes:arri});
        // arri.push(<Circle r={20} fill={{color:'black'}}  />);
        // arri.push(<Ellipse rx={30} ry={10}  fill={{color:'black'}}  />)
        // arri.push(<Line x1={25} x2={35} y1={25} y2={35}  stroke={{color:'color'}}/>)
      
        
    }
    handleClose() {
        this.props.handleClose();
      }

      componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps && nextProps.open == true) {
            console.log("propsStarted" ,nextProps);
            if(nextProps.tabValue == 0) {
                var arrayData = nextProps.toranots.toranotsThisMonth.filter(el =>  nextProps.currentDateDialog === new Date(el.date).getDate() && nextProps.selectValue == el.userDetails.type);
            }
         else {
                    var arrayData = nextProps.toranots.toranotsNextMonth.filter(el => nextProps.currentDateDialog == new Date(el.date).getDate());
                  }
                  this.setState({usersDay: arrayData});
         
        }
    }
        preDelete(user) {
            console.log("delete")
        }

      hasShmiraType(index) {
          console.log("hasShmiraType" , index , this.state.usersDay );
            if(this.state.usersDay != []) {
                for(var i=0;i<this.state.usersDay.length;i++) {
                    if(this.state.usersDay[i].shmiraType == index) {
                        console.log("yesss" , i);
                       //   const color = this.getColor(tempArri[x][g].idUser);
                       return (<div key={i} className="shmirotDataHolder">
                                <span style={{backgroundColor: "teal"}} className="shmirotToran">
                                    {this.state.usersDay[i].userDetails.name}
                                </span>
                                <Fab onClick={() => this.props.preDelete(this.state.usersDay[i])} className="deleteShmiraButton">
                                    <i style={{ fontSize: "20px" }} className="material-icons">delete</i>
                                </Fab>
                            </div>)
                    }
                }
            }
          return false;
      }
      renderBody(postion) {
         

          var arri=[];
          console.log("amountPerDay" , this.props);
        for(var i=0;i<this.props.amountPerDay;i++) {
            var shmiraType = this.hasShmiraType(i+postion);
            console.log("shmira type" , shmiraType ,i)
            console.log("succseed");
            arri.push(<ListItem style={{ justifyContent: "flex-start"}}>
                                    <div className="list-item-shape">
                                     {this.state.arrayOfShapes[i]}
                                    </div>
                                    {  shmiraType == false?
                                    <ButtonInDialog {...this.props} shmiraType={i+postion} />
                                   : shmiraType
                                   
                                    }
                                 </ListItem>); 
        }
        console.log("arri" , arri);
        return arri;
      }


    render() {
        const {classes} = this.props;
        console.log("shapes" ,this.state.arrayOfShapes);
        return (
            <Dialog  repositionOnUpdate={false}
            style={{ padding: '0px 0px 0px 0px' }}
            PaperProps={{ classes: {root: classes.dialogPaper} }} open={this.props.open} onClose={this.handleClose}>
            <DialogTitle id="alert-dialog-slide-title">שיבוץ תורנים</DialogTitle>
          <DialogContent classes={{root: classes.dialogPaper }}>
          {this.props.open? 
              <div id="div_full_dialog_Cell">
                <div id="div_right_dialog">
               
                            <div className="list-map-key">
                                <List style={{overflow: "hidden", direction: "rtl",width: "100%" }}>
                               { this.renderBody(0)}
                               </List>
                            </div>
                </div>
                <div className="divider3">

                </div>
                <div id="div_left_dialog">
                { this.renderBody(5)}

                </div>
                </div> : null}
          
                         
          </DialogContent>
          <DialogActions>
          
          <Button onClick={this.handleClose} color="primary">
          סגור
          </Button>
          </DialogActions>
          </Dialog> 
          
        );
    }

}

function mapStateToProps(state) {
    return {
        toranot : state.toranot
    };
}

export default connect(mapStateToProps,null)(withStyles(styles)(DialogCell));
