import { useState , useEffect ,useContext } from "react";
import PropTypes from 'prop-types';
import Context from "./ErrorContext";
import ErrorContext from '../NetworkAuthProvider/ErrorContext'
import ajax from "../../Helpers/ajaxHelper";
import { TOKEN_EXPIRED, SERVICE_BASE_URL } from '../../config';
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';

const Provider = ({children}) => {
    const errorContext = useContext(ErrorContext);

    const [questionCategoryType, setQuestionCategoryType] = useState({});
    const [questionResponseType, setQuestionResponseType] = useState({});

    const getQuestionCategoryType = async (search) => {
        ajax
            .get(`${SERVICE_BASE_URL}v1/getAllQuestionCategory`, {})
            .then((res) => {
                setQuestionCategoryType(res.data);
            })
            .catch((e) => {
                if (errorHelper(e) == TOKEN_EXPIRED) {
                    console.log("nothing")
                } else {
                    errorContext.setIsErrorDisplayed(true);
                    errorContext.setError(errorHelper(e));
                }
            }
            );
    }

    const getQuestionResponseType = async (search) => {
        ajax
            .get(`${SERVICE_BASE_URL}v1/getAllQuestionResponseType`, {})
            .then((res) => {
                setQuestionResponseType(res.data);
            })
            .catch((e) => {
                if (errorHelper(e) == TOKEN_EXPIRED) {
                    console.log("nothing")
                } else {
                    errorContext.setIsErrorDisplayed(true);
                    errorContext.setError(errorHelper(e));
                }
            }
            );
    }

    useEffect(()=>{
        getQuestionCategoryType();
        getQuestionResponseType();
    },[])

    return(
        <Context.Provider value={{questionCategoryType, setQuestionCategoryType,questionResponseType, setQuestionResponseType}}>
            {children}
        </Context.Provider>
    );
}

export default Provider;