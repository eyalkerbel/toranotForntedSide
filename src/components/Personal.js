import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CONFIG from "../configs/env"
import { connect } from "react-redux";


const useStyles = theme => ({
 root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    marginTop: theme.spacing(10)
  },
});

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
  //   console.log("componentWillMount personal is");
  //   fetch(CONFIG.API.GETPERSONDATA, {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json;charset=utf-8",
  //         Authorization: "Bearer " + localStorage.getItem("jwt")

  //     },
  //     body: []
  // }).then(data => data.json())
  // .then(jsoned => {
  //   console.log("jsnoed",jsoned.name);
    this.setState({name: this.props.user.name,sn:this.props.user.sn,password:this.props.user.password});
  // })
  }

  render() {
    const {classes} = this.props;
    console.log(this.state);
    return (
      <Paper className="maincontainer">
        <div className="header-container">
          <h1 className="header">פרטים אישיים</h1>
          <div className="divider" />
          {/* <h3 style={{ marginTop: "30px" }}>עמוד זה בפיתוח..</h3> */}
          <div className={classes.root}>
          <TextField
          id="standard-full-width"
          label="name"
          style={{ marginTop: 40 }}
          placeholder={this.state.name}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="standard-full-width"
          label="sn"
          style={{ marginTop: 40 }}
          placeholder={this.state.sn}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <TextField
          id="standard-full-width"
          label="password"
          style={{ marginTop: 40 }}
          placeholder={this.state.password}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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


export default connect(mapStateToProps,null)(withStyles(useStyles)(Personal))
