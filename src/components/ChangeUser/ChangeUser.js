import React, { Fragment } from "react";
import CONFIG from "../../configs/env"
import Button from '@material-ui/core/Button';
import SearchInput, {createFilter} from 'react-search-input'
import {connect} from "react-redux";
import TableUser from "./TableUser";
class ChangeUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.searchUpdated = this.searchUpdated.bind(this);
    }
    searchUpdated(term) {
        this.setState({searchTerm: term})
      }

    render() {
        return (
            <Fragment>  
                 <div className="maincontainer" >
                        <div className="header-container">
                        <h1 className="header">שנה משתמשים</h1>
                            <div className="scroll">
                                <TableUser searchTerm={this.state.searchTerm} userList={this.props.users} />
                            </div>
                        </div>
                            <div style={{
                                display: "flex",
                                marginTop: "10px"}} >
                                <SearchInput className="search-input" onChange={this.searchUpdated} />
                        </div>
                    
                </div>
        </Fragment>);
    }

}   

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps,null)(ChangeUser);