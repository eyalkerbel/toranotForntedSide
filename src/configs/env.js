import CONFIGDEV from './config.dev.json'
import CONFIGPRD from './config.prd.json'
import CONFIGLOCAL from './config.local.json'

function envmaker() {
    console.log(process.env.REACT_APP_ENV);

    const envi = "prd";

    console.log("ss",envi)
    if (envi === "dev") {
        return CONFIGDEV;
    }
    else if (process.env.REACT_APP_ENV === "prd") {
        console.log("config production");
        return CONFIGPRD;
    }
    else if (process.env.REACT_APP_ENV === "local") {
        console.log("local production");
        return CONFIGLOCAL;
    }
    else {
        console.log("da");
        return "ENVFAIL"
    }
}

export default envmaker()

