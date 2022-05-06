import { TOKEN_EXPIRED } from "../config";


export function errorHelper(e){
    if(e.response != undefined || e.response != null){
        if(e.response.data.error.includes('Unauthorized')  || e.response.data.message.includes('JWT expired') ){
            return TOKEN_EXPIRED;
        } else {
            return e.response.data.message;
        }
    }
    else{
       return e.message;
    } 
}

