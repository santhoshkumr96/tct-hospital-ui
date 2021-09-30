
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';
import { useContext, useState } from 'react';
import Login from '../Login/Login';
import Context from '../Login/LoginAuthProvider/Context';
import ErrorContext from '../NetworkAuthProvider/ErrorContext';
import { SERVICE_BASE_URL, TOKEN_EXPIRED } from '../../config';
import { useEffect } from 'react';
import ajax from '../../Helpers/ajaxHelper';




const AssociatePopulationSection = () => {

    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [popData, setPopData] = useState([]);


    const getData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .get(`${SERVICE_BASE_URL}v1/get-campaign-population`, config)
            .then((res) => {
                setPopData(res.data);
            })
            .catch((e) => {
                if (errorHelper(e) == TOKEN_EXPIRED) {
                    loginContext.setTokenExpired(true);
                } else {
                    errorContext.setIsErrorDisplayed(true);
                    errorContext.setError(errorHelper(e));
                }
            }
            );
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            {
                console.log(popData),
                popData.map((e)=>{
                   return  <pre> {JSON.stringify(e, undefined ,6)}</pre>
                })
            }
           
        </div>
    )
}

export default AssociatePopulationSection;