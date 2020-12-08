import { makeStyles,withStyles } from '@material-ui/core/styles';

export default theme => ({
  headerStyle: {
      color: theme.palette.text.default 
  },
  textRegualar: {
    color: theme.palette.text.secondary +" !important",
  },
  borderStyle : {
    borderColor: theme.palette.text.secondary,
    border: "solid 1px"
  },
  
  dialogPaper: {
    width: "300px",
},
itemList: {
    width: "100%"
},
cancelButton: {
    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(238,9,11,1) 0%, rgba(255,0,0,1) 100%, rgba(121,9,9,1) 100%)",
    borderRadius: 35,
    maxWidth: '30px',
     maxHeight: '30px',
    minWidth: '50px',
    minHeight: '30px',
    marginRight:"30px"
    
},
approveButton: {
    background: "linear-gradient(90deg, rgba(38,129,26,1) 100%, rgba(0,74,255,1) 100%)",
     borderRadius: 35,
    
},
bigIndicator: {
  color: theme.palette.text.secondary,
},
labelControl: {
  color: theme.palette.text.default,
},
root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    marginTop: theme.spacing(10)
  },
 
  label: {
    // display: "inline-block",
    // textAlign: "right",
    color: theme.palette.text.primary,
    right: "0 !important",
    width: "100px"
  },
  labelCreateUser: {
    // display: "inline-block",
    // textAlign: "right",
    color: theme.palette.text.primary
}
});

