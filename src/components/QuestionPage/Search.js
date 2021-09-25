
import { useState, useContext, useEffect, useCallback } from 'react';
import { SERVICE_BASE_URL, TOKEN_EXPIRED } from '../../config';
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';
import Context from '../Login/LoginAuthProvider/Context';
import ErrorContext from '../NetworkAuthProvider/ErrorContext';
import ajax from '../../Helpers/ajaxHelper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { version } from 'react-dom/cjs/react-dom.development';
import { debounce } from 'lodash';
import { Button } from '@mui/material';
import { display } from '@mui/system';




const QuestionSearch = ({getSearchText}) => {

    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);

    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(true);
    const getOptionsDelayed = useCallback(
      debounce((text, callback) => {
        setOptions([]);
        getOptionsAsync(text).then(callback);
      },100),
      []
    );

    const config = {
        headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };

    const getOptionsAsync = (query) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            setLoading(true);
            resolve(
                (query === 0 || query === '') ? [] :
                ajax
                    .get(`${SERVICE_BASE_URL}v1/searchQuestion?search=${query}`, config)
                    .then((res) => {
                        
                        return res.data;
                    })
                    .catch((e) => {
                        if (errorHelper(e) == TOKEN_EXPIRED) {
                            loginContext.setTokenExpired(true);
                        } else {
                            setOptions([]);
                            errorContext.setIsErrorDisplayed(true);
                            errorContext.setError(errorHelper(e));
                        }
                    }
                )
            );
          }, 100);
        });
      };

    
      const onClickOkButton = () =>{
        
        getSearchText(inputValue);
      }


    useEffect(() => {
        getOptionsDelayed(inputValue, (filteredOptions) => {
          setOptions(filteredOptions);
          setLoading(false);
        });
      }, [inputValue, getOptionsDelayed]);

    return (
        <div style={{display:"inline-flex"}}>
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option}
                value={inputValue}
                id="clear-on-escape"
                clearOnEscape
                // // disable filtering on client
                // filterOptions={(x) => x}
                loading={loading}
                sx={{ width: 300 }}
                onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
                renderInput={(params) => <TextField variant="standard" {...params} label="Search Questions" />}
            />
            <Button variant="contained" onClick={()=>onClickOkButton()}>
                ok
            </Button>
        </div>
    )
}

export default QuestionSearch;


  
