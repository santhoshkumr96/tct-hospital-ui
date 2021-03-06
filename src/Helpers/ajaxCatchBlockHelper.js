import { TOKEN_EXPIRED } from "../config";


export function errorHelper(e){
    if(typeof(e) !== 'undefined' && typeof(e.response)  !== 'undefined'){ 
        if (  e.response.data.error !== undefined && e.response.data.error.includes('Unauthorized') ){
            return TOKEN_EXPIRED;
        }
        if( e.response.data.message !== undefined && e.response.data.message.includes('JWT expired') ){
            return TOKEN_EXPIRED;
        } else {
            if(e.response.data.message !== undefined){
                return e.response.data.message ;
            }
            return e.message
            
        }
    }
    return e.message;
}

