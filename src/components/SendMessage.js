import React, {Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
//import user from "../Reducers/UserReducer";
import CONFIG from "../configs/env";
import LoadingPage from "./LoadingPage";
const styles = theme => ({
    formControl: {
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
    },
  });

//import ArrowDropRight from 'material-ui/core/svg-icons/navigation-arrow-drop-right';
 class SendMessage extends React.Component  {
    
    constructor() {
        super();
        this.state = {
            names: [],
            personName: [],
            evrobody:false,
            loading:true,
            header: "",
            body: '',
            users: [],
            notifaction: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
        this.forFetch = this.forFetch.bind(this);
        this.sendDataToServer = this.sendDataToServer.bind(this);
    }
   async componentDidMount() {
      await this.getNames();
      console.log("finish");
    }
    async getNames() {
        fetch(CONFIG.API.CREATETORANUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(data => data.json())
            .then(dat => {
                console.log("hello" , dat)
                return this.forFetch(dat);
            }
                )
            .catch(err => console.log(err));
    }
    forFetch(array) {
        var names = ["all"];
        console.log("array" , array);
        var users = array[0];
        console.log("user" , users)
        for(var i=0;i<users.length;i++) {
            names.push(users[i].name);
        }
        console.log("names",names);
        this.setState({names:names,loading:false,users:users});
    }
    handleChange(event) {
        var isAllFound = false;
        console.log("event" , event.target.value);
        this.setState({personName:event.target.value});
        console.log(event.target.value);
        for(var i=0;i<event.target.value.length;i++) {
            if(event.target.value[i] == "all") {
                isAllFound = true;
                console.log("good")
                this.setState({personName:this.state.names,evrobody:true});
            }
        }
        if(isAllFound == false && this.state.evrobody == true) {
            console.log("found");
            this.setState({evrobody:false , personName: []});
        }

    }
    handleChangeMultiple(event) {
        const { options } = event.target;
        console.log("option" , options);
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({personName:value});
    var isAllFound = false;
    for(var i=0;i<event.target.value.length;i++) {
        if(event.target.value[i] == "all") {
            isAllFound = true;
            console.log("good")
            this.setState({personName:this.state.names,evrobody:true});
        }
    }
    if(isAllFound == false && this.state.evrobody == true) {
        console.log("found");
        this.setState({evrobody:false , personName: []});
    }
  }
      sendDataToServer() {
        console.log("header" , this.state.header);
        let data = {
          header: this.state.header,
          body: this.state.body,
          names: this.state.personName
        };
        fetch(CONFIG.API.SENDMESSAGE, {
          method:"POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify(data)
        }).then(this.setState({body: '' , header: ''}));
      } 
    render() {
        const { classes } = this.props;
        const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
         style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
        },
  },
};
        return (
            <Fragment>
            {this.state.loading == false ? (
        <Paper className="maincontainer">
         <div className="header-container">
            <h1 className="header">צור קשר</h1>
         <div className="divider" />
         </div>
        <form>
        <div className="field-head">
            <label className="label-form" >כותרת:</label>
            <textarea type="text" className="header-input"  name="head" value={this.state.header}  onChange={(e) => {this.setState({header:e.target.value})}} /> 
        </div>
        <div className="field-body">
            <label className="label-form" >הודעה</label>
            <textarea type="text" className="header-input" name="body" value={this.state.body} onChange={(e) => {this.setState({body:e.target.value})}} />
        </div>
        <div className="field-recivers">
        {/* <InputLabel id="demo-simple-select-readonly-label">Name</InputLabel> */}
        <label className="label-select" >מקבלים </label>
      
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={this.state.personName}
          onChange={this.handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          style={{ minWidth: '160px',maxWidth: '25px',marginRight: '20px'}}
 >
          {this.state.names.map((element) => (
            <MenuItem key={element} value={element}>
              <Checkbox checked={this.state.personName.indexOf(element) > -1} />
              <ListItemText primary={element} />
            </MenuItem>
          ))}
        </Select>
        </div>
        <div className="form-bottom" >
        <Fab className="fobi1" onClick={this.sendDataToServer} >
         <i className="material-icons">send</i>
        </Fab>
        </div>
            </form>
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


export default withStyles(styles)(SendMessage);
