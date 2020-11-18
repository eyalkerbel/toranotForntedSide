import { MsalAuthProvider, LoginType } from 'react-aad-msal';
 
// Msal Configurations
const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: '8974e97b-2ed9-4a83-8d97-b74caf859430',
    redirectUri: 'https://nemos.azurewebsites.net/home'
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: [
    'user.read',
    'https://Click.onmicrosoft.com/navy.idf/'
  ]
}

// Options
const options = {
    loginType: LoginType.Popup,
    tokenRefreshUri: window.location.origin + '/auth.html'
  }
   
  export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)