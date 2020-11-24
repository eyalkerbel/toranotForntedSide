import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';

class UserListComp extends React.Component {
    constructor(props) {

        super(props);
        this.state ={
            userList: [],
            userListThis: [],
            userListNext: []
        }
    }
    componentWillMount() {
        var arri = [];
        var userList = [];
        if(this.props.tabValue == 0) {
            console.log("propsUserLista" , this.props)
            userList = this.props.toranim.toranimThisMonth;
        } else {
            userList = this.props.toranim.toranimNextMonth;
        }
        console.log("userList" , userList);
        if(userList != undefined) {
       userList.sort(function(a,b){
            var keyA = a.points;
            var keyB = b.points;
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });

        


    }
        //console.log("arri " , props.arri);
        this.setState({userList:userList});
        console.log("toranim" , this.props.toranim);

        var userListThisMonth = this.props.toranim.toranimThisMonth;
        var userListNextMonth = this.props.toranim.toranimNextMonth;
        this.setState({userListThis:userListThisMonth,userListNext:userListNextMonth});
    }

    getPointtById(id) {
        for(var i=0;i<this.props.users.length;i++) {
            if(this.props.users[i]._id == id ) {
                return this.props.users[i].points;
            }
        }
    }
    createUserList() {
        var arri = [];
        // if(this.state.userList != undefined) {
        // this.state.userList.forEach((el, i) => {
        //     console.log("selecteduse ::",el , this.props.selectValue);
    
        //     if (el.userDetails.type === this.props.selectValue) {
        //         arri.push(<ListItem key={i} button onClick={() => this.props.selectUser(el.userDetails)}>
        //             <ListItemText draggable="true" primary={<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flex: 1 }}><span> {el.userDetails.name} {el.userDetails.points} </span><i className="material-icons" style={{ marginLeft: "5px", color: "teal" }}>person</i></div>}></ListItemText>
        //         </ListItem>
        //         )
        //     }
        // })
        var userList
        if(this.props.tabValue == 0) {
            userList = this.state.userListThis;
        } else {
            userList = this.state.userListNext;
        }

        if(userList != undefined) {
           userList.forEach((el, i) => {
              //  console.log("selecteduse ::",el , this.props.selectValue);
        
                if (el.userDetails.type === this.props.selectValue) {
                    var points = this.getPointtById(el.userDetails._id);
                    console.log("points" , points)
                    arri.push(<ListItem key={i} button onClick={() => this.props.selectUser(el)}>
                        <ListItemText draggable="true" primary={<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flex: 1 }}><span> {el.userDetails.name} {points} </span><i className="material-icons" style={{ marginLeft: "5px", color: "teal" }}>person</i></div>}></ListItemText>
                    </ListItem>
                    )
                }
            })

    }
        return arri;
    }
  render() {
    return (
        <div>
        {this.createUserList()}
        </div>
        );

}
}

const mapStateToProps = state => ({
    toranim: state.toranim,
    users: state.users
})


export default connect(mapStateToProps,null)(UserListComp);