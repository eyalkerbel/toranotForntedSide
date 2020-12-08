import React from "react";

export const themes = {
    light: {
        exteme: "#222222", // black
      titleText: '#008080', // white
      bodyText: "#008080", 
      menuTopBackGround:"#668cff",
      bodyBackGround: "#ffffff", 
    },
    dark: {
         exteme : "#ffffff", // white
        titleText: "#c6d9f5",
        bodyText: "#28cca7", // green -blue
        menuTopBackGround: "#061B2A",
        bodyBackGround: "#042b45"
    },
  };
  
  export const ThemeContext = React.createContext(
    themes // default value
  );