import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function test(props) {
    var arri = []
    props.arri.forEach((el, i) => {
        if (el.type === props.selectValue) {
            arri.push(<ListItem key={i} button onClick={() => props.selectUser(el)}>
                <ListItemText draggable="true" primary={<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flex: 1 }}><span>{el.name}</span><i className="material-icons" style={{ marginLeft: "5px", color: "teal" }}>person</i></div>}></ListItemText>
            </ListItem>
            )
        }
    })
    return arri;
}