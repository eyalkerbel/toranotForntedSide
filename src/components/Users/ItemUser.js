import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import shortid from 'shortid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default class ItemUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
     
    }
   
    handleChange() {
        if(this.state.checked == false) {
        this.setState({checked:true});
        } else {
            this.setState({checked:false});
        }
        this.props.handleClick(this.props.item,this.props.checkBoxStatus);
    }

 render() {
        return(
            <TableRow key={shortid.generate()}> 
         
                    <TableCell style={{width:"10%"}} key={shortid.generate()} align="center">
                    <div className="container-for-users">
                        <div className="check-box-user">
                            <Checkbox checked={this.props.checkBoxStatus} onChange={this.handleChange} inputProps={{ 'aria-label': 'primary checkbox' }}  />
                        </div>   
                            <div className="name-all-user">
                                {this.props.item.userDetails.name}
                        </div>
                        </div>

                    </TableCell>
                      {/* <TableCell  key={shortid.generate()} align="center">{this.props.item.name}</TableCell> */}
                       <TableCell key={shortid.generate()} align="center"></TableCell>
                       <TableCell  key={shortid.generate()} align="center"></TableCell>
                       </TableRow>
                       );  
    }


}