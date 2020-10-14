import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';

 function UserListComp(props) {
    var arri = [];
    var userList = [];
    if(props.tabValue == 0) {
        userList = props.toranim.toranimThisMonth;
    } else {
        userList = props.toranim.toranimNextMonth;
    }
    console.log("userList" , userList);
   userList.sort(function(a,b){
        var keyA = a.points;
        var keyB = b.points;
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });
    //console.log("arri " , props.arri);
    console.log("toranim" , props.toranim);
  


    userList.forEach((el, i) => {
        console.log("selecteduse ::",el , props.selectValue);

        if (el.userDetails.type === props.selectValue) {
            arri.push(<ListItem key={i} button onClick={() => props.selectUser(el.userDetails)}>
                <ListItemText draggable="true" primary={<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flex: 1 }}><span> {el.userDetails.name} {el.userDetails.points} </span><i className="material-icons" style={{ marginLeft: "5px", color: "teal" }}>person</i></div>}></ListItemText>
            </ListItem>
            )
        }
    })
    return arri;
}

const mapStateToProps = state => ({
    toranim: state.toranim
})


export default connect(mapStateToProps,null)(UserListComp);