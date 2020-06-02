import CONFIGDEV from './config.dev.json'
import CONFIGPRD from './config.prd.json'
import CONFIGLOCAL from './config.local.json'

function envmaker() {
    console.log(process.env.REACT_APP_ENV);

    const envi = process.env.REACT_APP_ENV;

    console.log("ss",envi)
    if (envi === "dev") {
        return CONFIGDEV;
    }
    else if (process.env.REACT_APP_ENV === "prd") {
        console.log("config production");
        return CONFIGPRD;
    }
    else if (process.env.REACT_APP_ENV === "local") {
        return CONFIGLOCAL;
    }
    else {
        return "ENVFAIL"
    }
}

export default envmaker()

