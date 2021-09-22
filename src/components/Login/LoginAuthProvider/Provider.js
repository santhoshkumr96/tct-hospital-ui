import { useState , useEffect } from "react";
import PropTypes from 'prop-types';
import Context from "./Context";

const Provider = ({children}) => {
    const [userId, setUserId] = useState('');
    const [userRole, setUserRole] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [tokenExpired, setTokenExpired] = useState(false);


    return(
        <Context.Provider value={{userId,setUserId,accessToken,
        setAccessToken,userRole,setUserRole,tokenExpired,setTokenExpired}}>
            {children}
        </Context.Provider>
    );
}

export default Provider;