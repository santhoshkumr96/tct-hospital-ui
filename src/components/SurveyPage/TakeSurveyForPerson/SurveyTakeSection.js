import { React, useEffect, useState, useContext } from 'react';
import './SurveyPage.css'
import Context from '../../Login/LoginAuthProvider/Context';
import ErrorContext from '../../PreTogglesProvider/ErrorContext';
import ajax from '../../../Helpers/ajaxHelper';
import { SERVICE_BASE_URL, TOKEN_EXPIRED, QUESTION_TYPE_TEXT, QUESTION_TYPE_TEXTBOX, QUESTION_TYPE_CHECKBOX, QUESTION_TYPE_RADIO, QUESTION_TYPE_DROPDOWN, QUESTION_TYPE_DATE } from '../../../config';
import { Row, Col , message, Input , Checkbox, Radio ,  DatePicker } from 'antd';
import Paper from '@mui/material/Paper';
import "antd/dist/antd.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Fab } from "@mui/material";
import './SurveyPage.css'
import { color } from '@mui/system';
import moment from 'moment';


const SurveyTakeSeciton = (props) => {

  const errorContext = useContext(ErrorContext);
  const [campaignData, setCampaignData] = useState({})
  const [answerData, setAnswerData] = useState({})
  const [answerState, setAnswerState] = useState({})
  const [answerStateInit, setAnswerStateInit] = useState(false)
  const [isSurveyDone, setIsSurveyDone] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [nextSection, setNextSection] = useState('')

  const dateFormat = 'YYYY/MM/DD';

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
        checkIfSurveyDone(data.surveyId, data.personId)
        props.closeTakeSurvey();
      })
      .catch((e) => {
        message.error('error pls try again later')
      }
      );
  }

  const checkIfSurveyDone = async (surveyId,personId) => {
    const config = {};
    ajax
      .post(`${SERVICE_BASE_URL}v1/check-if-survey-closed`, {surveyId,personId}, config)
      .then((res) => {
        setIsSurveyDone(res.data);
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

  const onDateChange = (event, questionData) => {
    console.log(event._d)
    let key = questionData.questionId
    let value = event._d
    const temp = answerData;
    temp[key] = value;
    setAnswerData({
      ...temp
    })
    let tempState = answerState;
    tempState[key] = true
    if(event._d === ''){
      tempState[key] = false
    }
    setAnswerState({
      ...tempState
    })
  }


  const onRadioBoxChange = (event, questionData, sectionCondition) => {

    //next section logic 
    questionData.response.map((res,index)=> {
      if(event.target.value === res.responseName){
        if (sectionCondition[questionData.questionId] !== undefined){
          if(sectionCondition[questionData.questionId][res.responseId] !== undefined){
            console.log(sectionCondition[questionData.questionId][res.responseId] )
            setNextSection(sectionCondition[questionData.questionId][res.responseId])
          }
        }
      }
    })

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


  const onRadioBoxChangedropDOwn = (event, questionData) => {

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
    if(questionData.isRequired){
      const temp = answerState;
      if(temp[key] === undefined){
        temp[key] = false;
        setAnswerState({
          ...temp
        })
      }
    }
  }

  const updateInitialAnswerStateEmpty = () => {
    setAnswerState({})
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
      temp['surveyId'] = props.surveyId;
      temp['user'] = props.user;
      temp['personId'] = props.personId;
      console.log(temp)
      setAnswer(temp);
    }
  }
  
  const beforePage = () => {
    if(sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1)
    }
  }

  const afterPage = () => {
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
    if(sectionIndex + 1  < campaignData.sections.length && isValid) {
      if(nextSection == ''){
        setSectionIndex(sectionIndex + 1)
      } else {
        campaignData.sections.map((section,sectionIndex)=>{
          if(section.title == nextSection){
            setSectionIndex(sectionIndex)
          }
        })
        setNextSection('')
      }
    }
  }

  useEffect(() => {
    checkIfSurveyDone(props.surveyId,props.personId);
    getData(props.campaignId);
  }, [])

  return (

    <div className="add-user-wrapper-wrapper">
      {/* { !isSurveyDone && */}
      {
        Object.keys(campaignData).length > 0 && campaignData.sections.map((section, index)=> {
          if(sectionIndex === index) {
            return (
              <div>
                <p>{'Section :'+(index+1)+"/"+campaignData.sections.length}</p>
                <Row className="section-row">
                  <Col>
                      <p>{'Section Name :'+section.title}</p>
                      {/* {updateInitialAnswerStateEmpty() && answerState !== {}} */}
                      {
                        section.questions.map((question, qindex)=> {
                          return (
                            <Row className="question-row">
                              <Col>
                                {updateInitialAnswerState(question)}
                                <p><span style={{color:"red"}}>{question.isRequired===true?'*':''}</span>{question.questionId+' : '+question.questionName}</p>
                                <p>{'Question Desc :'+question.questionDesc}</p>
                                {
                                  question.responseType === QUESTION_TYPE_DATE && 
                                    <DatePicker  defaultValue={moment(answerData[question.questionId] === undefined ? moment() : answerData[question.questionId], dateFormat)} format={dateFormat} onChange={(event)=>onDateChange(event,question)} />
                                }
                                {
                                  (question.responseType === QUESTION_TYPE_TEXT || question.responseType === QUESTION_TYPE_TEXTBOX) && 
                                  <Input value={answerData[question.questionId] === undefined ? '' : answerData[question.questionId]} onChange={(event)=>onTextChange(event,question)} placeholder="Basic usage" />
                                }
                                {
                                  (question.responseType === QUESTION_TYPE_CHECKBOX) && 
                                  <Checkbox.Group defaultValue={answerData[question.questionId] === undefined ? [] : answerData[question.questionId].split(',')}  onChange={(event)=>onCheckBoxChange(event,question)}>
                                    {question.response.map((res,rindex)=>{
                                      return <Checkbox  value={res.responseName}>{res.responseName}</Checkbox>
                                    })}
                                  </Checkbox.Group>
                                }
                                {
                                  (question.responseType === QUESTION_TYPE_DROPDOWN) && 
                                  <Radio.Group value={answerData[question.questionId] === undefined ? '' : answerData[question.questionId]} onChange={(event)=>onRadioBoxChangedropDOwn(event,question)}>
                                    {question.response.map((res,rindex)=>{
                                      return <Radio value={res.responseName}>{res.responseName}</Radio>
                                    })}
                                  </Radio.Group>
                                }
                                {
                                  (question.responseType === QUESTION_TYPE_RADIO) && 
                                  <Radio.Group value={answerData[question.questionId] === undefined ? '' : answerData[question.questionId]} onChange={(event)=>onRadioBoxChange(event,question, section.sectionCondition)}>
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
                  {/* {!answerStateInit && setAnswerStateInit(true)} */}
                </Row>
              </div>
            )
          }
        })
      }
       {/* { !isSurveyDone && */}
       {
          <Row>
            <Col>
              <Button style={{ margin: 20 , float : 'right'}}  onClick={() => { props.closeTakeSurvey()}} variant="contained">
                close
              </Button>
            </Col>
            {/* <Col>
              <Button style={{ margin: 20 , float : 'right'}}  onClick={() => { beforePage()}} variant="contained">
                before
              </Button>
            </Col> */}
            <Col>
              <Button style={{ margin: 20 , float : 'right'}}  onClick={() => { afterPage()}} variant="contained">
                next
              </Button>
            </Col>
            {
             campaignData.sections !== undefined && campaignData.sections.length === (sectionIndex+1) &&
              <Col>
              <Button style={{ margin: 20 , float : 'right'}}  onClick={() => { onSubmitData() }} variant="contained">
                <DoneIcon />
              </Button>
              </Col>
            }
          </Row>
      }
      {/* { isSurveyDone &&
        <p> This survey is already taken for the person, thanks!.</p>
      } */}
    </div>

  )
}

export default SurveyTakeSeciton;