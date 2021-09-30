
import { useContext, useState, useEffect } from 'react';
import Context from '../Login/LoginAuthProvider/Context';
import { CAMPAIGNS_SECTION, QUESTION_CREATOR_ROLE, SERVICE_BASE_URL, TOKEN_EXPIRED } from '../../config';
import { Button } from '@mui/material';
import './Campain.scss'
import CreateCampain from './CreateCampain';
import QuestionTable from '../QuestionPage/QuestionTable';
import { Box } from '@mui/system';
import ErrorContext from '../NetworkAuthProvider/ErrorContext';
import ajax from '../../Helpers/ajaxHelper';
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';




const CampainSection = () => {



    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [createCampainBool , setCreateCampainBool] = useState(false);
    const [campaignDetails , setCampaignDetails] = useState({});
    const [campaignData, setCampaignData] = useState({}); 



    const onCreateCampign = () =>{
       setCreateCampainBool(true);
    }

    const onCancelCampign = () =>{
        setCampaignData({...{}})
        setCreateCampainBool(false);
     }

     const getData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .get(`${SERVICE_BASE_URL}v1/get-all-campaign`, config)
            .then((res) => {
                setCampaignDetails(res.data);
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

    const deleteCampaign = async (campaignId) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/delete-campaign`, { campaignId }, config)
            .then((res) => {
                getData();
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

    const getCampaign = async (campaignId) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/view-campaign`, { campaignId }, config)
            .then((res) => {
                setCampaignData(res.data);
                setCreateCampainBool(true);
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

    const onCampaignDelete = (value) => {
        deleteCampaign(value);
    }


    const onCampaignView = (value) => {
        getCampaign(value);
    }

    const onPuslishCampaign = (value) =>{
        console.log(value)
    } 

     useEffect(() => {
        getData();
     }, [campaignDetails])

    return (
        <div id='campaign-main-div'>
            {loginContext.userRole.includes(QUESTION_CREATOR_ROLE)  &&
                createCampainBool === false && 
                <div id='campaign-search-create'>

                    <Button variant="contained" onClick={() => { onCreateCampign() }}>
                        Create Campain
                    </Button>
                    <Button id='campain-search-create-button' disabled variant="contained" onClick={() => { onCreateCampign() }}>
                        Create Campain from existing
                    </Button>
                </div>
            }
            {
                createCampainBool === true && 
                <CreateCampain onPublishBool={true} 
                onCancelCampain={onCancelCampign} 
                campaignDataFromParent={campaignData}/>
            }
            {
                createCampainBool === false && 
                    <Box className ={'campaign-table-wrapper'}>
                         <QuestionTable 
                            typeOfTable={CAMPAIGNS_SECTION}
                            deleteQuestionOnclick={onCampaignDelete} 
                            viewQuestionOnClick = {onCampaignView}
                            questions={campaignDetails}
                            publishOnClick={onPuslishCampaign}
                            />
                    </Box>   
            }
        </div>
    )
}

export default CampainSection;