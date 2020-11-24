import React from "react";
import {Button} from "@material-ui/core";
class ButtonInDialog extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <Button onClick={() => this.props.preSend(this.props.gooi, this.props.selectedUser, this.props.selectValue, this.props.toran,this.props.shmiraType)} variant="outlined" style={{ border: "solid 1px teal", color: "teal", minWidth: '104px', maxHeight: '104px' }} >הוסף</Button>
        );
    }

}
export default ButtonInDialog;