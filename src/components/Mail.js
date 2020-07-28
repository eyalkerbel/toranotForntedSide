import React from "react";
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


export default class Mail extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.mailClick(this.props.index);
    }
    render() {
        return(
            <div className="mail-single" onClick={this.handleClick}>
        <p className="mail-sender">{this.props.name}</p>
        <p className="mail-title">{this.props.header}</p>
        <IconButton>   <ThumbUpRoundedIcon color="primary" /> </IconButton>
  <IconButton><ThumbDownAltIcon color="secondary"  /></IconButton>
        </div>
        );
    }

}