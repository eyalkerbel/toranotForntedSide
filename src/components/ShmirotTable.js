import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import LoadingPage from "./LoadingPage";
import CONFIG from "../configs/env"
import Button from "@material-ui/core/Button";
import { green, purple,red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import ShmirotTableCompSmall from './ShmirotTableCompSmall'
import TabCompSmall from './TabCompSmall';
import { MuiThemeProvider} from 'material-ui/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// const greenTheme = createMuiTheme({ palette: { primary: green } })
// const redTheme = createMuiTheme({ palette: { primary: red } })
// const theme = createMuiTheme({
//     palette: {
//       primary: red,
//       secondary: green,
//     },
//   });

  const styles = theme => ({
    dialogPaper: {
        width: "300px",
    },
    cancelButton: {
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(238,9,11,1) 0%, rgba(255,0,0,1) 100%, rgba(121,9,9,1) 100%)",
        borderRadius: 35,
        
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
            open:false
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

    bubbleSelect = (num) => {
        this.setState({ selectValue: num })
    }

    selectUser = (el) => {
        this.setState({ selectedUser: el })
    }

    UNSAFE_componentWillMount() {
        console.log("UNSAFE_componentWillMount");
        this.fetchyfetch();
     //   this.fetchToranot();
    }
    unPickOther(data) {
        this.setState({newData:null});
    }

    fetchyfetch() {
        fetch(CONFIG.API.GETALLTORANUTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(data => data.json())
            .then(dat => this.forFetch(dat))
            .catch(err => console.log(err));
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

    forFetch(data) {
        console.log("forFetch");
        this.setState({fetchedArri:data,loaded:true});
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
        console.log("arri" , arri ,"my toranot" , this.state );
      console.log("p" ,this.state.exchangeStatus);
        return (
            <ShmirotTableCompSmall oldData={this.state.oldData} newData={this.state.newData} unPickMine={this.unPickMine} pickMine={this.pickMine} unPickOther={this.unPickOther} pickOther={this.pickOther} exchangeStatus={this.state.exchangeStatus} sendData={this.sendData} fetchMyToranot={this.state.fetchMyToranot} fetchyfetch={this.fetchyfetch.bind(this)} selectedUser={this.state.selectedUser} fetchedArri={arri} tabValue={this.state.tabValue} selectValue={this.state.selectValue} toran={this.state.toran} />
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
                  oldDate: this.state.oldData,
                  newDate: this.state.newData,
                  status: "asking",
                  oldMessage: this.state.message,
                  seen:false
                }
                  this.setState({oldData:null,newDate:null});
                  fetch(CONFIG.API.ADDTORANOTCHNAGE, {
                    method:"POST",
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                      Authorization: "Bearer " + localStorage.getItem("jwt")
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

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                {this.state.loaded ? (
                    <Paper className="maincontainer" >
                        <div className="header-container-new">
                            <h1 className="header">לוח שמירות</h1>
                            <div className="divider" />
                        </div>
                        <div>
                            <TabCompSmall bubbleTabs={this.bubbleTabs} bubbleSelect={this.bubbleSelect} tabValue={this.state.tabValue} selectValue={this.state.selectValue} />
                        </div>
                        <div style={{ display: "flex", width: "100%", marginBottom: "20px",position: "relative" }}>
                            <div style={{flex: "1", border: "2px solid teal", marginTop: "10px" }}>
                            {console.log(this.state.fetchMyToranot , "mytoraunto")}
                            {(this.state.fetchedArri[this.state.tabValue][1].length == 0)? null : <Button size="small" variant="contained" onClick={this.pickMyToranot} color="secondary">בחר משמרת שלך</Button>}
                            {this.state.oldData!=null? <Button size="medium" style={{marginTop: "10px"}} variant="contained" onClick={this.pickOtherToranot} color="primary">החלף משמרת אחרת</Button> : null }
                            <div className="div-botton" >
                     <Button className={classes.approveButton} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '50px', minHeight: '30px'}} variant="contained" color="primary" size="small" onClick={this.handleClickOpen} >סיים</Button>

                            <Button className={classes.cancelButton} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '50px', minHeight: '30px',marginRight:"30px"}} variant="contained" color="primary" size="small" onClick={() => this.setState({exchangeStatus:null,oldData:null,newData:null})}  >בטל</Button>
                            </div>
                            </div>
                            <div style={{ flex: "7" }}>
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
            finish
          </Button>
          <Button onClick={() => this.setState({open:false})} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>

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
export default withStyles(styles)(ShmirotTable);
//