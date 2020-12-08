import styleExport from "../themeStyle";

import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import LoadingPage from "../LoadingPage";
import CONFIG from "../../configs/env";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";

import ShmirotTableCompSmall from './ShmirotTableCompSmall'
import TabCompSmall from '../TabCompSmall';
import { MuiThemeProvider} from 'material-ui/styles';
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import {Fab} from "@material-ui/core";
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';

  const styles = theme => ({
    dialogPaper: {
        width: "300px",
    },
    itemList: {
        width: "100%"
    },
    cancelButton: {
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(238,9,11,1) 0%, rgba(255,0,0,1) 100%, rgba(121,9,9,1) 100%)",
        borderRadius: 35,
        maxWidth: '30px',
         maxHeight: '30px',
        minWidth: '50px',
        minHeight: '30px',
        marginRight:"30px"
        
    },
    approveButton: {
        background: "linear-gradient(90deg, rgba(38,129,26,1) 100%, rgba(0,74,255,1) 100%)",
         borderRadius: 35,
        
    },
  });

 class ShmirotTable extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            fetchedArri: [],
            fetchMyToranot: [],
            selectedUser: { name: "בחר משתמש" },
            selectValue: 0,
            tabValue: 0,
            toran: 0,
            oldData: null,
            newData: null,
            exchangeStatus: null,
            SendStatus: false,
            open:false,
            arrayOfShapes: [],
            amountToranim: null
        };
        this.unPickOther = this.unPickOther.bind(this);
        this.pickOther = this.pickOther.bind(this);
        this.pickMine = this.pickMine.bind(this);
        this.unPickMine = this.unPickMine.bind(this);
        this.pickMyToranot = this.pickMyToranot.bind(this);
        this.pickOtherToranot = this.pickOtherToranot.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.sendChange = this.sendChange.bind(this);
    }
    handleClickOpen() {
        this.setState({open:true});
      };
       handleClose() {
        this.setState({open:false});
      };

    radioHandler = (num) => {
        this.setState({ toran: num })
    }

    //appbar functions
    bubbleTabs = (num) => {
        this.setState({ tabValue: num,oldData:null,newData:null,exchangeStatus:null });
    }
    deleteOldData() {
        this.setState({oldData:null,newData:null,exchangeStatus:null});
    }
    deleteNewData() {
        this.setState({newData:null,exchangeStatus:"my"});
    }

    bubbleSelect = (num) => {
        this.setState({ selectValue: num,oldData:null , newData:null ,exchangeStatus:null })
    }

    selectUser = (el) => {
        this.setState({ selectedUser: el })
    }

    UNSAFE_componentWillMount() {
        console.log("UNSAFE_componentWillMount");
        var roleValueInitinal = 0;
        if(this.props.jobs.length !=0) {
         roleValueInitinal = this.props.jobs[0]._id;
        }
        this.setState({selectValue:roleValueInitinal});
        this.fetchyfetch();
        this.createShapes();
   
    }
    getAmountShmirotPerDay() {
        for(var i=0;i<this.props.jobs.length;i++) {
            if(this.props.jobs[i]._id == this.state.selectValue) {
                return this.props.jobs[i].numToranotPerDay;
            }
        }
    }
    createShapes() {
        var arri = [];
        arri.push(<Rectangle width={10} height={10} fill={{color:'red'}}  />)
        arri.push(<Triangle width={10} height={10} fill={{color:'red'}}  />)
        arri.push(<Circle r={5} fill={{color:'red'}}  />)
        // arri.push(<Ellipse rx={5} ry={5} fill={{color:'green'}}  />)
        // arri.push(<Triangle width={8} height={8} fill={{color:'red'}}  />)
        // arri.push(<Line x1={25} x2={35} y1={25} y2={35} stroke={{color:'red'}} />)
        // arri.push(<Rectangle width={10} height={10} fill={{color:'red'}}  />)
        // arri.push(<Rectangle width={10} height={10} fill={{color:'red'}}  />)
        // arri.push(<Rectangle width={10} height={10} fill={{color:'red'}}  />)
        this.setState({arrayOfShapes:arri}); 
    }

    unPickOther(data) {
        this.setState({newData:null});
    }

    fetchyfetch() {
        this.forFetch();
    }
    pickMine(date) {
        this.setState({oldData:date});
    }
    unPickMine(date) {
        this.setState({oldData:null});
    }
  pickOther(date) {
      console.log("pick other", date);
      this.setState({newData:date});
  }

    forFetch() {
        var arrayToranots = [[[] ,[]] , [[] , []]];
        for(var i=0;i<this.props.toranuts.toranotsThisMonth.length;i++)
        {
            if(this.props.toranuts.toranotsThisMonth[i].idUser == this.props.myId) {
                arrayToranots[0][1].push(this.props.toranuts.toranotsThisMonth[i]);
            } 
            arrayToranots[0][0].push(this.props.toranuts.toranotsThisMonth[i]);
        }
        for(var i=0;i<this.props.toranuts.toranotsNextMonth.length;i++)
        {
            console.log("push")
            if(this.props.toranuts.toranotsNextMonth[i].idUser != this.props.myId) {
                arrayToranots[1][1].push(this.props.toranuts.toranotsNextMonth[i]);

            } 
            arrayToranots[1][0].push(this.props.toranuts.toranotsNextMonth[i]);
        }
       
        this.setState({fetchedArri:arrayToranots,loaded:true});
        // fetch(CONFIG.API.GETTHISMONTHSTORANUTS, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json;charset=utf-8",
        //       Authorization: "Bearer " + localStorage.getItem("jwt")
        //     }
        //   })
        //     .then(data => data.json()).then(jsoned => this.setState({fetchMyToranot:jsoned,loaded: true,fetchedArri: data}));   
    }
    createTable = () => {
        var arri = this.state.fetchedArri.slice(0);
        return (
            <ShmirotTableCompSmall arrayOfShapes={this.state.arrayOfShapes} jobs={this.props.jobs} oldData={this.state.oldData} newData={this.state.newData} unPickMine={this.unPickMine} pickMine={this.pickMine} unPickOther={this.unPickOther} pickOther={this.pickOther} exchangeStatus={this.state.exchangeStatus} sendData={this.sendData} fetchMyToranot={this.state.fetchMyToranot} fetchyfetch={this.fetchyfetch.bind(this)} selectedUser={this.state.selectedUser} fetchedArri={arri} tabValue={this.state.tabValue} selectValue={this.state.selectValue} toran={this.state.toran} />
        )
    }
    pickMyToranot() {
        this.setState({exchangeStatus: "my"});
    }
    pickOtherToranot() {
        this.setState({exchangeStatus: "others"});
    }
    sendChange() {
        console.log("send to server" , this.state.oldData , "and ", this.state.newData);
        if(this.state.oldData != null && this.state.newData != null) {
                this.setState({status:"send a request"});
                let data = {
                  toranotIdOld: this.state.oldData.id,
                  toranotIdNew: this.state.newData.id,
                  status: "asking",
                  oldMessage: this.state.message,
                  seen:false
                }
                  this.setState({oldData:null,newDate:null});
                  fetch(CONFIG.API.ADDTORANOTCHNAGE, {
                    method:"POST",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                      Authorization: "Bearer " + localStorage.getItem("jwt"),
                  },
                  body: JSON.stringify(data)
                  }).then(data => data.json())
                  .then(dat => this.setState({exchangeStatus:"null",oldData:null,newData:null,open:false}))
                  .catch(err => console.log(err));
                }
                this.setState({exchangeStatus:"null"});
                this.handleClose();
    }
    sendData() {
        this.setState({SendStatus:true});     
    }
    exsitShmirabyType() {
        console.log("exsits" , this.state.fetchedArri[this.state.tabValue][1]);
        for(var i=0;i<this.state.fetchedArri[this.state.tabValue][1].length;i++) {
            if(this.state.fetchedArri[this.state.tabValue][1][i].userDetails.type == this.state.selectValue) {
                return true;
            }
        }
        return false;
    }

    render() {
        const { classes } = this.props;
        const amountToraim = this.getAmountShmirotPerDay(); 
        console.log("renderShmiortTable" , this.state);
        return (
            <Fragment>
                {this.state.loaded ? (
                    <Paper className="maincontainer" >
                        <div className={`header-container-new ${classes.headerStyle}`}>
                            <h1 className="header">לוח תורניות</h1>
                            <div className="divider" />
                        </div>
                        <div>
                            <TabCompSmall bubbleTabs={this.bubbleTabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabValue} selectValue={this.state.selectValue} />
                        </div>
                        <div className="shmirot-table-content">
                            <div id="shmirot-table-slide" >
                            {console.log(this.state.fetchMyToranot , "mytoraunto")}
                            {this.exsitShmirabyType() == false? null :
                        <div id="first-row-shmiort-table">
                             <Button size="small" variant="contained" onClick={this.pickMyToranot} color="secondary">בחר משמרת שלך</Button>
                             {this.state.oldData!=null?
                                <Fab size="small" onClick={() => this.deleteOldData()}>
                                <i className="material-icons">delete</i>
                                    </Fab> : null}
                             </div>}
                            {this.state.oldData!=null?
                        <div className="after-pick-one">
                            <div className="dispay-my-data">
                             <div className="owner-toranot">
                                 <div style={{ flex: "1", color: "teal", display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
                            שם:  אני            
                                  </div>
                              <div style={{ flex: "1", color: "teal", display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
                                {this.state.oldData.dayOfMonth} / {new Date(this.state.oldData.date).getMonth() + 1}
                               </div>
                              <div style={{ flex: "1", color: "teal", display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
            {this.state.arrayOfShapes[this.state.oldData.shmiraType%amountToraim]}
                              </div>
                            </div>
                            <div id="change-second-button-shmirot-table">
                            <Button size="medium" style={{marginTop: "10px"}} variant="contained" onClick={this.pickOtherToranot} color="primary">החלף משמרת אחרת</Button>
                            {this.state.oldData != null && this.state.newData != null?    <Fab size="small" onClick={() => this.deleteNewData()}>
          <i className="material-icons">delete</i>
          </Fab> : null}
                            </div>

                            </div>

                             </div>
                               
                              : null }
                            {this.state.oldData != null && this.state.newData != null? 
                                <div className="after-pick-one">
                            <div className="dispay-my-data">
                             <div className="owner-toranot">
                                 <div style={{ flex: "1", color: "teal", display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
                                    {this.state.newData.name }       
                                  </div>
                              <div style={{ flex: "1", color: "teal", display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
                                {this.state.newData.dayOfMonth} / {new Date(this.state.oldData.date).getMonth() + 1}
                               </div>
                              <div style={{ flex: "1", color: "teal", display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
                              {this.state.arrayOfShapes[this.state.newData.shmiraType%amountToraim]}
                              </div>
                            </div>
                            </div>                                <Button id="shmirot-table-approve" className={classes.approveButton} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '50px', minHeight: '30px'}} variant="contained" color="primary" size="small" onClick={this.handleClickOpen} >סיים</Button>
                                <Button id="shmirot-table-cancel" className={classes.cancelButton}  variant="contained" color="primary" size="small" onClick={() => this.setState({exchangeStatus:null,oldData:null,newData:null})}  >בטל</Button>
                                </div> : null}
                            </div>
                            <div style={{ flex: "7",minWidth: "0" }}>
                                {this.createTable()}
                            </div>
                        </div>
                        <Dialog PaperProps={{ classes: {root: classes.dialogPaper} }}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <div style={{textAlign: "center"}}>
                    <textarea className="textarea-dialog" type="text" placeholder="צרף הודעה" onChange={(e) => {this.setState({message:e.target.value})}} />
                    </div>
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.sendChange} color="primary">
            סיים
          </Button>
          <Button onClick={() => this.setState({open:false})} color="primary">
            בטל
          </Button></DialogActions></Dialog>

                    </Paper>
                ) : (
                        <LoadingPage >
                        </LoadingPage>
                    )
                }
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    toranim: state.toranim.toranimNextMonth,
    myId: state.user._id,
    jobs: state.jobs,
    toranuts: state.toranots
})


export default connect(mapStateToProps,null)(withStyles(styleExport)(ShmirotTable));
//