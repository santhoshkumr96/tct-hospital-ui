import { useState , useEffect } from "react";
import PropTypes from 'prop-types';
import Context from "./ErrorContext";

const Provider = ({children}) => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);


    return(
        <Context.Provider value={{error, setError,isErrorDisplayed, setIsErrorDisplayed,message, setMessage}}>
            {children}
        </Context.Provider>
    );
}

export default Provider;