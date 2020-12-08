import React from "react";
import {AppBar} from "@material-ui/core";
import {ThemeContext} from '../../ColorMode/colors';

class TabCompHeaders extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextType = ThemeContext;

    render() {
        return (
                <AppBar className="table-bar" position="static" style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{width:"180.734px" ,flex: "1",color: this.context.titleText, display: "flex", justifyContent: "center", alignItems: "center" }} className="diffselect" >
                     שם
                    </div>
                     <div style={{flex:"2",textAlign:"center",color: this.context.titleText}} className="diffselect">
                        סוג
                    </div> 
                    <div style={{flex:"5",display:"flex"}}> 
                      <div style={{flex:"1",textAlign:"center",color: this.context.titleText}} className="diffselect" aria-label="simple tabs example">
                        חודש נוכחי
                    </div> 
                    <div style={{flex:"1",textAlign: 'center',color: this.context.titleText}} className="diffselect"  aria-label="simple tabs example">
                        חודש הבא
                    </div> 
                    </div>
                </AppBar>
        );
    }

}

export default TabCompHeaders;