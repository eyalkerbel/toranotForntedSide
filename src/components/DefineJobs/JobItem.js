import React from "react";
import TableRow from "@material-ui/core/TableRow";
import { TableCell } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import {deleteJob,changeJob,middleWareJob} from "../../Actions/jobsAction";
import {connect} from "react-redux";
const styles = theme => ({
    tableCellNoPadding: {
       padding: 0,
      },
      textField: {
        width: '100%'
    },
    input2: {
        height: 43,
    
      }

 
  });
  
   class JobItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            numToranim:this.props.data.numToranotPerDay,
            description:this.props.data.description,
            form1: null,
        }
        this.changeNum = this.changeNum.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.onBlurName = this.onBlurName.bind(this);
        this.onBlurDescription = this.onBlurDescription.bind(this);
        this.onBlurNum = this.onBlurNum.bind(this);
    }
    deleteItem() {
       // this.props.deleteMe(this.props.data._id);
       this.props.middleWareJob("delete" , this.props.data);
    }
    changeName(name) {
        // console.log("changeName" , name);
        this.setState({name:name});
    }
    onBlurName(value) {
        //console.log("value" , value);
      //  this.props.changeItem(this.props.data._id,this.state.name,"name");
      this.props.middleWareJob("change" , {_id:this.props.data._id, value:this.state.name},"name");

    }

    changeNum(num) {
        this.setState({numToranim: num.target.value});
    }
    onBlurNum(value) {
        console.log("valueNum" , value);
     //   this.props.changeItem(this.props.data._id,this.state.numToranim,"amountToranim");
     this.props.middleWareJob("change" , {_id:this.props.data._id, value:this.state.numToranim},"amountToranim");

    }

    changeDescription(description) {
        this.setState({description:description});

    }
    onBlurDescription(value) {
       // console.log("value" , value)
     //   this.props.changeItem(this.props.data._id,this.state.description,"description");
     this.props.middleWareJob("change" , {_id:this.props.data._id, value:this.state.description},"description");


    }
    sendToStore() {
      //  var job = { }
      console.log("sendToStore");
    }


    render() {
        const { classes } = this.props;
        console.log("numtoranot" , this.state.numToranim)
        return (<TableRow>
        
            <TableCell align="center">
            <div className="sidebutton">
        <Fab size="small" onClick={() => this.deleteItem()}>
          <i className="material-icons">delete</i>
          </Fab>
          </div>
            <TextField value={this.state.name} required="true" onBlur={(e) => this.onBlurName(e)} onChange={(event) => this.changeName(event.target.value)} /> </TableCell>
            <TableCell align="center" >  <TextField value={this.state.numToranim} required="true"  onBlur={(e) => this.onBlurNum(e)}  id="standard-number" type="number" InputLabelProps={{shrink: true,}} onChange={(value) => this.changeNum(value)} /></TableCell>
            <TableCell id="tablepadding2" align="center"><div style={{width:"100%",height:"100%"}}>
            <TextField className="full-textfield" required="true" value={this.state.description}  onBlur={(e) => this.onBlurDescription(e)} onChange={(event) => this.changeDescription(event.target.value)} InputProps={{ classes: { input: this.props.classes.input2 }}} /></div>
            </TableCell>
        </TableRow>)
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeItem:(id,value, key) => dispatch(changeJob(id,value,key)),
        deleteMe:(id) => dispatch(deleteJob(id)),
        middleWareJob: (action , values,key) => dispatch(middleWareJob(action,values,key))

    }
}

export default connect(null,mapDispatchToProps)(withStyles(styles)(JobItem));