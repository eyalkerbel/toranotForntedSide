import React from "react";
import Shmirot from "../shmirot/Shmirot";

class ShmirotCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div key={this.props.x} className="shmirotCell">
                <span className="cellDate">
                        {this.props.data.num}
                </span>
                <div className="full-cell-details">
                    <div class="row-xs-12">
                    {this.props.data!= []?  this.props.data.names.map((el,index) => index < this.props.amountToranim? <div class="row-xs-3">{el}</div> : null)
                    : null}
                    </div>
                    {/* </div> */}
                    <div className="divider2"></div>
                    <div class="row-xs-12">
                        {this.props.data!= []?  this.props.data.names.map((el,index) => index > (this.props.amountToranim -1)? <div class="row-xs-3">{el}</div> : null)
                    : null}
                        </div>
                    </div>
                 </div>    
        );
    }

} 


export default ShmirotCell;