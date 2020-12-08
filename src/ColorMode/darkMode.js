import {createMuiTheme } from "@material-ui/core/styles";
import {themes} from "./colors";
const {dark} = themes;
const themeDark = createMuiTheme({
    root: {
      MuiAppBar: {
        color: "red"
      }
    },
    palette: {
      primary: {
        main: dark.bodyBackGround,
        default: dark.bodyBackGround // This is an orange looking color,
              },
        secondary: {
              main: dark.menuTopBackGround 
              },
              text: {
                default: dark.exteme, // white
               primary: dark.titleText,
               secondary: dark.bodyText, // green -blue
             },
      background: {
        paper: dark.bodyBackGround,
      },
    },
    overrides: {
      MuiTableCell: {
       head: {
        color: dark.exteme
        }
      },
      MuiTab:  {
        root: {
        color: dark.titleText + "!important"
    }
  },
        MuiAppBar: {
        color: dark.titleText
    },
       
    }
  });
  export default themeDark;