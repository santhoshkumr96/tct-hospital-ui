import { React, useEffect, useState, useContext } from 'react';
import './SurveyPage.css'
import Context from '../../Login/LoginAuthProvider/Context';
import ErrorContext from '../../PreTogglesProvider/ErrorContext';
import ajax from '../../../Helpers/ajaxHelper';
import { SERVICE_BASE_URL, TOKEN_EXPIRED, QUESTION_TYPE_TEXT, QUESTION_TYPE_TEXTBOX, QUESTION_TYPE_CHECKBOX, QUESTION_TYPE_RADIO, QUESTION_TYPE_DROPDOWN } from '../../../config';
import { Row, Col , message, Input , Checkbox, Radio } from 'antd';
import Paper from '@mui/material/Paper';
import "antd/dist/antd.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Fab } from "@mui/material";


const SurveyTakeSeciton = () => {

  const errorContext = useContext(ErrorContext);
  const [surveyId, setSurveyId] = useState(-1);
  const [personId, setPersonId] = useState(-1);
  const [campaignIdFromLink, setCampaignIdFromLink] = useState(-1);
  const [userId, setUserId] = useState(-1);
  const [campaignData, setCampaignData] = useState({})
  const [answerData, setAnswerData] = useState({})
  const [answerState, setAnswerState] = useState({})
  const [answerStateInit, setAnswerStateInit] = useState(false)

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

  const setAnswer = async (data) => {
    const config = {};
    ajax
      .post(`${SERVICE_BASE_URL}v1/set-survey-answer`, data, config)
      .then((res) => {
        message.success('survey submitted')
      })
      .catch((e) => {
        message.error('error pls try again later')
      }
      );
  }

  const onTextChange = (event, questionData) => {
    let key = questionData.questionId
    let value = event.target.value
    const temp = answerData;
    temp[key] = value;
    setAnswerData({
      ...temp
    })
    let tempState = answerState;
    tempState[key] = true
    if(event.target.value === ''){
      tempState[key] = false
    }
    setAnswerState({
      ...tempState
    })
  }

  const onRadioBoxChange = (event, questionData) => {
    let key = questionData.questionId
    let value = event.target.value
    const temp = answerData;
    temp[key] = value;
    setAnswerData({
      ...temp
    })
    let tempState = answerState;
    tempState[key] = true
    setAnswerState({
      ...tempState
    })
  }

  const onCheckBoxChange = (event, questionData) => {
    let key = questionData.questionId
    let value = event.toString();
    const temp = answerData;
    temp[key] = value;
    setAnswerData({
      ...temp
    })
    let tempState = answerState;
    tempState[key] = true
    setAnswerState({
      ...tempState
    })
  }

  const updateInitialAnswerState = (questionData) => {
    let key = questionData.questionId;
    const temp = answerState;
    if(temp[key] === undefined){
      temp[key] = false;
      setAnswerState({
        ...temp
      })
    }
  }

  const onSubmitData = () => {
    let isValid = true;
    Object.keys(answerState).forEach((key) => {
      if(answerState[key] === false && isValid){
        message.warn("please fill question "+ key);
        isValid = false;
      }
      if(!isValid){
        return false;
      }
      
    });
    if(isValid){
      const temp = {}
      temp['data'] = answerData;
      temp['surveyId'] = surveyId;
      temp['user'] = userId;
      temp['personId'] = personId;
      console.log(temp);
      setAnswer(temp);
    }
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
      {
        Object.keys(campaignData).length > 0 && campaignData.sections.map((section, index)=> {
          return (
            <Row>
              <Col>
                  <p>{section.title}</p>
                  {
                    section.questions.map((question, qindex)=> {
                      return (
                        <Row>
                          <Col>
                            {!answerStateInit && updateInitialAnswerState(question)}
                            <p>{question.questionId}</p>
                            <p>{question.questionName}</p>
                            <p>{question.questionDesc}</p>
                            {
                              (question.responseType === QUESTION_TYPE_TEXT || question.responseType === QUESTION_TYPE_TEXTBOX) && 
                              <Input onChange={(event)=>onTextChange(event,question)} placeholder="Basic usage" />
                            }
                            {
                              (question.responseType === QUESTION_TYPE_CHECKBOX) && 
                              <Checkbox.Group onChange={(event)=>onCheckBoxChange(event,question)}>
                                {question.response.map((res,rindex)=>{
                                  return <Checkbox  value={res.responseName}>{res.responseName}</Checkbox>
                                })}
                              </Checkbox.Group>
                            }
                            {
                              (question.responseType === QUESTION_TYPE_DROPDOWN) && 
                              <Radio.Group onChange={(event)=>onRadioBoxChange(event,question)}>
                                {question.response.map((res,rindex)=>{
                                  return <Radio value={res.responseName}>{res.responseName}</Radio>
                                })}
                              </Radio.Group>
                            }
                            {
                              (question.responseType === QUESTION_TYPE_RADIO) && 
                              <Radio.Group onChange={(event)=>onRadioBoxChange(event,question)}>
                                {question.response.map((res,rindex)=>{
                                  return <Radio value={res.responseName}>{res.responseName}</Radio>
                                })}
                              </Radio.Group>
                            }
                          </Col>
                        </Row>
                      )
                    })
                  }
              </Col>
              {!answerStateInit && setAnswerStateInit(true)}
            </Row>
          )
        })
      }
      <Button style={{ marginBottom: 20 }}  onClick={() => { onSubmitData() }} variant="contained">
        <DoneIcon />
      </Button>
    </div>

  )
}

export default SurveyTakeSeciton;