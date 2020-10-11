import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function test(props) {
    var arri = [];
    props.arri.sort(function(a,b){
        var keyA = a.points;
        var keyB = b.points;
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });

    props.arri.forEach((el, i) => {
        console.log("selecteduse ::",el);

        if (el.userDetails.type === props.selectValue) {
            arri.push(<ListItem key={i} button onClick={() => props.selectUser(el)}>
                <ListItemText draggable="true" primary={<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flex: 1 }}><span> {el.userDetails.name} {el.userDetails.points} </span><i className="material-icons" style={{ marginLeft: "5px", color: "teal" }}>person</i></div>}></ListItemText>
            </ListItem>
            )
        }
    })
    return arri;
}