import React from "react";
import {connect} from "react-redux";

class PickFriends extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            hadToranot: false,
        }
    }
    componentWillMount() {
        let isMeHaveToranot = false;
        this.props.toranimNextMonth.forEach(element => {
            if(element.idUser == this.props.myId) {
                isMeHaveToranot = true;
                // break;
            }
        });
        this.setState({hadToranot:isMeHaveToranot});
    }
}

function mapStateToProps(state,ownProps) {
    return {
        toranimNextMonth: state.toranimNextMonth,
        myId: state.user._id
    }
}


export default PickFriends;