import { React, useEffect, useState, useContext } from 'react';
import './SurveyPage.css'
import Context from '../../Login/LoginAuthProvider/Context';
import ErrorContext from '../../PreTogglesProvider/ErrorContext';
import ajax from '../../../Helpers/ajaxHelper';
import { SERVICE_BASE_URL, TOKEN_EXPIRED } from '../../../config';
import { Alert, message } from 'antd';

const SurveyTakeSeciton = () => {

  const errorContext = useContext(ErrorContext);
  const [surveyId, setSurveyId] = useState(-1);
  const [personId, setPersonId] = useState(-1);
  const [campaignIdFromLink, setCampaignIdFromLink] = useState(-1);
  const [userId, setUserId] = useState(-1);
  const [campaignData, setCampaignData] = useState({})

  const getData = async (campaignId) => {
    const config = {};
    ajax
      .post(`${SERVICE_BASE_URL}v1/view-campaign`, {campaignId}, config)
      .then((res) => {
        setCampaignData(res.data);
      })
      .catch((e) => {
        message.error('error pls try again later')
      }
      );
  }
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSurveyId(params.get('surveyId'))
    setPersonId(params.get('personId'))
    setCampaignIdFromLink(params.get('campaignId'))
    setUserId(params.get('user'))
   
    getData(params.get('campaignId'));
  }, [])

  return (

    <div className="add-user-wrapper-wrapper">
      <p>{campaignIdFromLink}</p>
    </div>

  )
}

export default SurveyTakeSeciton;