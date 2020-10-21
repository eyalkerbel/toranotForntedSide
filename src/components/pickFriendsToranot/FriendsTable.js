import React, {Fragment} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import FriendItem from "./FriendItem";
import {addIdToranim} from "../../Actions/toranimAction";
import CONFIG from "../../configs/env";
class FriendsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            as: "",
            currentFreindId: null
        }
        this.chooseFriend = this.chooseFriend.bind(this);
    }
    componentWillMount() {
        for(var i=0;i<this.props.toranimNextMonth.length;i++) {
            if(this.props.toranimNextMonth[i].idUser == this.props.myId ) {
                console.log("componentWillMOUNTsuccsees");
                this.setState({currentFreindId:this.props.toranimNextMonth[i].friendId});
            }
        }
    }

    chooseFriend(element,asisstValue) {
        if(element !=null) {
            this.props.setFriendId(element.idUser,this.props.myId);
            var friendId = element.idUser;
            this.setState({currentFreindId:element.idUser});
            } else {
                this.props.setFriendId(null,this.props.myId);
               var friendId = null;
               this.setState({currentFreindId:null});

            }
      
        var userId = this.props.myId;
     //   this.setState({as:"saa"});
        fetch(CONFIG.API.UPDATEFRIENDTORNOT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({friendId,userId,asisstValue})
        });
    }



    render() {
        const lowercasedFilter = this.props.searchTerm.toLowerCase();

        console.log("propsTable" , this.props);
        return (
                <Fragment>
                    <Table>
                        <TableHead>
                            <TableRow align="center">
                                <TableCell align="center">שם</TableCell>
                                 <TableCell align="center">סוג תורן</TableCell>
                                 <TableCell align="center" >בחר חבר</TableCell>
                            </TableRow>
                            </TableHead>
                                <TableBody>
                                    {this.props.toranimNextMonth.map((element,index) =>{
                                        if(element.userDetails.name.toLowerCase().includes(lowercasedFilter) == true && element.idUser != this.props.myId ) {
                                         //   var isRequest = element.idUser == this.state.currentFreindId;
                                            var isRequest = false;
                                            var oppositeRequest = false;
                                            console.log("eqaul" , element.idUser , "," , this.state.currentFreindId)
                                            if( element.idUser == this.state.currentFreindId) {
                                                isRequest =true;
                                            } 
                                            if(element.friendId == this.props.myId) {
                                                oppositeRequest = true;
                                            }
                                       return <FriendItem element={element} oppositeRequest={oppositeRequest} isRequest={isRequest} index={index} chooseFriend={this.chooseFriend} />
                                        }
                                        
                                    }
                                    )} 
                                </TableBody>
                    </Table>

                </Fragment>

        );
    }
}
function mapStateToProps(state) {
    return {
        toranimNextMonth: state.toranim.toranimNextMonth,
        myId: state.user._id
    }
}

const mapDispatchToProps = dispatch => ({
    setFriendId: (friendId,myId) => dispatch(addIdToranim(friendId,myId))
})

export default connect(mapStateToProps,mapDispatchToProps)(FriendsTable);