import React, { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import shortid from 'shortid';
import ItemUser from "./ItemUser";
import SearchInput, {createFilter} from 'react-search-input'


export default class TableUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''

        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(item,IsChosen) {
        this.props.updateParnet(item,IsChosen);
    }

    renderTable() {
        var arrRender = [];
        var tempToranim = [];
        var tempNonToranim = [];
        // for(var i=0;i<this.props.userList[0].length;i++) {
        //     if(this.props.userList[0].type == this.props.roleValue) {
        //         tempToranim.push(this.props.userList[0]);
        //     }
        // }
        // for(var i=0;i<this.props.userList[1].length;i++) {
        //     if(this.props.userList[1].type == this.props.roleValue) {
        //         tempNonToranim.push(this.props.userList[1]);
        //     }
        // }

       

        const lowercasedFilter = this.props.searchTerm.toLowerCase();
      for(var i=0;i<this.props.userList[0].length;i++) {
        if(this.props.userList[0][i].userDetails.type == this.props.roleValue && this.props.userList[0][i].userDetails.name.toLowerCase().includes(lowercasedFilter) == true) {
        var obi = {
            obiData: (
                <ItemUser item={this.props.userList[0][i]} handleClick={this.handleClick} checkBoxStatus={true}  />
            )
        }
        arrRender.push(obi.obiData);

    }
        
      }
      for(var i=0;i<this.props.userList[1].length;i++) {
        if(this.props.userList[1][i].userDetails.type == this.props.roleValue && this.props.userList[1][i].userDetails.name.toLowerCase().includes(lowercasedFilter) == true ) {
            var obi = {
                obiData: (
                    <ItemUser item={this.props.userList[1][i]} handleClick={this.handleClick} checkBoxStatus={false} />
                 )
            }
    
        arrRender.push(obi.obiData);
        }        
    }
    return arrRender;

    }

   render() {
       return (
        <Fragment>
         <Table>
            <TableHead>
                <TableRow key={shortid.generate()} align="center">
                    <TableCell style={{width:"3px"}} key={shortid.generate()} align="center">
                    {/* <div className="container-for-users">
                        <div>
                            <SearchInput className="search-input" onChange={this.searchUpdated} />
                        </div>   
                            <div className="name-all-user"> */}
                                שם
                        {/* </div>
                        </div> */}



                   </TableCell> 
                    <TableCell  width="30%" key={shortid.generate()} align="center">תורנות אחרונה</TableCell>
                    <TableCell  width="30%" key={shortid.generate()} align="center">כמות חודשים בבסיס</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.renderTable()}
            </TableBody>
        </Table>
            </Fragment>
       );
   } 
   
}