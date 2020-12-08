import { extend } from "joi";
import React from "react";
import PickUsers from "./PickUsers";
import {connect} from "react-redux";
class UsersSelect extends React.Component {


    render() {
        return <PickUsers toranimThisMonth={this.props.toranimThisMonth} toranimNextMonth={this.props.toranimNextMonth} />
    }
}
function mapStateToProps(state) {
    return {
        toranimThisMonth: state.toranim.toranimThisMonth,
        toranimNextMonth: state.toranim.toranimNextMonth
    }
}

export default connect(mapStateToProps,null)(UsersSelect)