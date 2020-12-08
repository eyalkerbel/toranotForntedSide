import React ,{ Fragment } from "react";
import {connect} from "react-redux";
import FriendsTable from "./FriendsTable";
import SearchInput, {createFilter} from 'react-search-input';

class PickFriends extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            hadToranot: false,
            searchTerm: ""
        }
        this.searchUpdated = this.searchUpdated.bind(this);
    }
    UNSAFE_componentWillMount() {
        console.log("componentWillMountPickFreinds" , this.props );
        let isMeHaveToranot = false;
        console.log("toranimNextMonth" ,this.props.toranimNextMonth);
        this.props.toranimNextMonth.forEach(element => {
            if(element.idUser == this.props.myId) {
                isMeHaveToranot = true;
               console.log("match" , element);
            }
        });
        console.log("isMeHaveToranotT" ,isMeHaveToranot);
        this.setState({hadToranot:isMeHaveToranot});
    }
    searchUpdated(term) {
        this.setState({searchTerm: term})
      }
    componentDidMount() {
       
    }
    render() {
        console.log("renderprops" , this.props);

        if(this.state.hadToranot == true) {
            return (
                <Fragment>
              <div className="maincontainer" >
                <div className="header-container">
                <h1 className="header">בחירת חברים לתורנות</h1>
                <div className="scroll">
                <FriendsTable searchTerm={this.state.searchTerm}/>
                </div>
                <div style={{
                                display: "flex",
                                marginTop: "10px"}} >
                        <SearchInput className="search-input" onChange={this.searchUpdated} />
                </div>
                </div>
                </div>
                </Fragment>
            );
                }
        else {
            return <div>אין לך תורניות בחודש הבא</div>;
        }
        
    }
    
    
}

function mapStateToProps(state,ownProps) {
    return {
        toranimNextMonth: state.toranim.toranimNextMonth,
        myId: state.user._id
    }
}

export default connect(mapStateToProps,null)(PickFriends);