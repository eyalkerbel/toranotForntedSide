import {createMuiTheme } from "@material-ui/core/styles";
import {themes} from "./colors";
const {light} = themes;

const themeLight = createMuiTheme({
    palette: {
      primary: {
        main: "#ffffff",
               },
        default: {
          main:  "#bec914"
            },
          text: {
            primary: "#222222"
            },
        secondary: {
          main: "#668cff" 
        },
        text: {
         default: "#222222",
         primary: "#008080",
         secondary: "#008080"
       },
       
      },
    
    
  });
  
  export default themeLight;