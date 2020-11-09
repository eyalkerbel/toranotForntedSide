import React, { Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Fab } from "@material-ui/core";
import CONFIG from "../../configs/env";
import {connect} from "react-redux";
import TableJobs from "./TableJobs";
import {addJob,saveAll,deleteNotCompleted,middleWareJob} from "../../Actions/jobsAction";
import shortid from 'shortid';
class DefineJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayJobs: []
        }
        this.save = this.save.bind(this);
    }
    componentWillUnmount() {
        this.props.deleteNotCompleted();
    }


    addItem() {
        var id = shortid.generate();
        var job = {_id:id,name:"שם תורן",numToranotPerDay: 1,description: ""};
        console.log("addJob");
      //  this.props.addJobItem(job);
      this.props.middleWareJob("add" , job);
       // var temp = this.state.arrayJobs;
     //   temp.push(job);
       // this.setState({arrayJobs:temp});
    }
    save() {
        var jobs = this.props.jobs;
        fetch(CONFIG.API.ADDJOBS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
              },
             body: JSON.stringify(jobs)
        });
    }

  render() {
      console.log("render it" , this.props.jobs);
      return(<Fragment>
         <Paper className="maincontainer">
                <div className="header-container">
                  <h1 className="header">ניהול תפקידים</h1>
                  </div>
                  <div className="table-job-holder">
          <TableJobs jobs={this.props.jobs} arrayJobs={this.state.arrayJobs} />
          </div>
          <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px"
                            }}
                        >
          <Fab onClick={() => this.addItem()} className="fobi1" style={{}} disabled={false}>
                                <i className="material-icons">add</i>
                            </Fab>
                            <Button
                                variant="contained"
                                onClick={() => this.save()}
                            >
                                שמור
              </Button>
              </div>
         </Paper>
      </Fragment>);
  }  
}

function mapStateToProps(state) {
    return {
        jobs: state.jobs
    }
}
const mapDispatchToProps = dispatch => ({
        addJobItem:(job) => dispatch(addJob(job)),
        deleteNotCompleted: () => dispatch(deleteNotCompleted()),
        middleWareJob: (action , values) => dispatch(middleWareJob(action,values))
});





export default connect(mapStateToProps,mapDispatchToProps)(DefineJobs);