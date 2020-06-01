import React from "react";
import { Redirect } from 'react-router-dom'
export default class RedirectorHome extends React.Component {
    render() {
        return (
            <Redirect to="/home" />
        );
    }
}
