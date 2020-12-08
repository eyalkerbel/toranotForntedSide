import styleExport from "./themeStyle";
import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CONFIG from "../configs/env"
import { connect } from "react-redux";
import NotificationBox from "./sideBar/NotificationBox";

// const useStyles = theme => ({
//  root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: '25ch',
//     marginTop: theme.spacing(10)
//   },
//   label: {
//     // display: "inline-block",
//     // textAlign: "right",
//     color: theme.palette.text.primary,
//     right: "0 !important",
//     width: "100px"
//   }
// });

const styles2 = {
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  textField: {
      width: 300,
      margin: 100,
  },
  //style for font size
  resize:{
    fontSize:50
  },
  }

 class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      sn:null,
      password: ""
    };
  }

  componentWillMount() {
 
    this.setState({name: this.props.user.name,sn:this.props.user.sn,password:this.props.user.password});
  // })
  }

  render() {
    const {classes} = this.props;
    console.log(this.state);
    return (
      <Paper className="maincontainer">
        <div className={`header-container ${classes.headerStyle}`}>
          <h1 className="header">פרטים אישיים</h1>
          <div className="divider" />
          <div id="full-personal-details-div">
          <TextField
          id="standard-full-width"
          label="שם"
           style={{ marginTop: 40,width:"100%" }}
          placeholder={this.state.name}
          margin="normal"
          InputLabelProps={{
            style: {
              fontSize: 34,
              textAlign: "right",
            },
            shrink: true,
           classes: {root: classes.label}
          }} 
          inputProps={{style: {fontSize: 30}}} 
        />

        <TextField
          label="ת.ז"
          style={{width:"100%" }}
          placeholder={this.state.sn}
          margin="normal"
          InputLabelProps={{
            style: {
              fontSize: 34,
              textAlign: "right",
              left: "100px !important"
            },
            shrink: true,
           classes: {root: classes.label}
          }}
          inputProps={{style: {fontSize: 30}}} 
        />
         <TextField
          label="סיסמא"
          style={{width:"100%",fontText: "50px" }}
          placeholder={this.state.password}
          margin="normal"
          InputLabelProps={{
            style: {
              fontSize: 34
            },
            shrink: true,
           classes: {root: classes.label}
          }} 
          inputProps={{style: {fontSize: 34}}} 
        />
      
        </div>
        </div>

      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps,null)(withStyles(styleExport)(Personal))
