import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switcher from "./Switcher";
import { createMuiTheme  } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles'; 
import styleExport from "./components/themeStyle";
import { makeStyles,withStyles  } from '@material-ui/core/styles';
import {ThemeContext , themes} from './ColorMode/colors';
import themeDark from "./ColorMode/darkMode";
import themeLight from "./ColorMode/lightMode";



class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        DarkMode: false,
        theme: themes.light
      }
        this.changeDarkMode = this.changeDarkMode.bind(this);
    }
    changeDarkMode() {
      this.setState({DarkMode: !(this.state.DarkMode) , theme:  this.state.theme === themes.dark? themes.light: themes.dark});
    }
render() {
  const {classes} = this.props;
    return (
        <ThemeContext.Provider value={this.state.theme} >
         <ThemeProvider theme={this.state.DarkMode== false? themeLight : themeDark}>
          <CssBaseline /> 
           <Switcher changeDarkMode={this.changeDarkMode} />
          </ThemeProvider >
         </ThemeContext.Provider>
    );
} 
}
export default withStyles(styleExport , { withTheme: true })(App);