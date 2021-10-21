import { Button, Fab } from "@mui/material";
import './CreateCampain.scss'
import { useState, useCallback, useContext, useEffect } from 'react';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from "@mui/material/InputAdornment";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import QuestionSearch from '../QuestionPage/Search';
import styleFunctionSx from "@mui/system/styleFunctionSx";
import Context from "../Login/LoginAuthProvider/Context";
import ErrorContext from "../NetworkAuthProvider/ErrorContext";
import { CAMPAIN_APPROVER_ROLE, QUESTION_TYPE_DROPDOWN, QUESTION_TYPE_RADIO, QUESTION_TYPE_TEXT, SERVICE_BASE_URL, TOKEN_EXPIRED, APPROVE, REJECT } from "../../config";
import { errorHelper } from "../../Helpers/ajaxCatchBlockHelper";
import ajax from "../../Helpers/ajaxHelper";
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

const CreateCampain = ({ onCancelCampain, campaignDataFromParent, viewCampaignBool, approveCampaignBool }) => {



    const defaultCampaingData = {
        campaignName: "",
        campaignDesc: "",
        campaignObjective: ""
    }

    const defaultSection = [
        {
            title: "",
            questions: []
        }
    ]

    // const initialDnDState = {
    //     draggedFrom: null,
    //     draggedTo: null,
    //     draggedEnteredTo: null,
    //     isDragging: false,
    //     originalOrder: [],
    //     updatedOrder: [],
    // }

    const initialDnDState = {
        questionData: {},
        sectionPosition: null
    }

    const [campaignData, setCampaignData] = useState(defaultCampaingData);
    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
    const [list, setList] = useState(defaultSection);
    const [campaignAnswer, setCampaignAnswer] = useState({});
    const [questionList, setQuestionList] = useState([]);
    const [campaignComment , setCampaignComment] = useState('');


    const getQuestionData = async (search) => {

        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .get(`${SERVICE_BASE_URL}v1/getquestionlist?search=${search}`, config)
            .then((res) => {
                // let newList = [...list];
                // let section = newList[search.sectionIndex]
                // let arr = res.data;
                // arr.map((e, i) => {
                //     section.questions.splice(section.questions.length, 0, e);
                // })
                // setList([...newList]);
                setQuestionList(res.data);
                // console.log(res.data);

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

    const createCampaignApi = async (result) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/create-campaign`, result, config)
            .then((res) => {
                console.log('campign uploaded');
                onCancelCampain();
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

    const updateCampaignAnswers = async (result) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/campaign-answer-update`, result, config)
            .then((res) => {
                console.log('campign answer uploaded');
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

    const updateCampaignStatus = async (data) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/udpate-campaign-status`, data, config)
            .then((res) => {
                console.log('campign status uploaded');
                onCancelCampain();
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

    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            questionData: questionList[initialPosition]
        })
    }

    const onDragOver = (event) => {

        const initialPosition = Number(event.currentTarget.dataset.position);
        const sectionPosition = Number(event.currentTarget.dataset.section);
        setDragAndDrop({
            ...dragAndDrop,
            sectionPosition: sectionPosition
        })
        let tempList = list;
        if (isNaN(sectionPosition) !== true) {
            tempList[sectionPosition].questions.push(dragAndDrop.questionData);
            setList(tempList);
        }
        console.log("drag over ===>", initialPosition)

    }

    const onDrop = (event) => {
        console.log("drag drop ===>")
    }

    const onDragEnd = (event) => {

        console.log("drag end ===>")
    }


    // const onDragStart = (event) => {
    //     const initialPosition = Number(event.currentTarget.dataset.position);
    //     setDragAndDrop({
    //         ...dragAndDrop,
    //         draggedFrom: initialPosition,
    //         isDragging: true,
    //         originalOrder: list
    //     })
    //     event.dataTransfer.setData("text/html", '');

    // }

    // const onDragOver = (event) => {
    //     event.preventDefault();

    //     let newList = dragAndDrop.originalOrder;
    //     const draggedFrom = dragAndDrop.draggedFrom;
    //     const draggedTo = Number(event.currentTarget.dataset.position);

    //     const itemDragged = newList[draggedFrom];
    //     const remainingItems = newList.filter((item, index) => index !== draggedFrom);

    //     newList = [
    //         ...remainingItems.slice(0, draggedTo),
    //         itemDragged,
    //         ...remainingItems.slice(draggedTo)
    //     ];


    //     if (draggedTo !== dragAndDrop.draggedTo) {
    //         // setList([...newList]);
    //         setDragAndDrop({
    //             ...dragAndDrop,
    //             updatedOrder: newList,
    //             draggedTo: draggedTo
    //         })
    //     }
    // }

    // const onDrop = () => {
    //     setList([...dragAndDrop.updatedOrder]);
    //     setDragAndDrop({
    //         ...dragAndDrop,
    //         draggedFrom: null,
    //         draggedEnteredTo: null,
    //         draggedTo: null,
    //         isDragging: false
    //     });
    // }

    // const onDragLeave = () => {
    //     setDragAndDrop({
    //         ...dragAndDrop,
    //         draggedTo: null
    //     });
    // }

    // const onDragEnter = (event) => {
    //     const draggedTo = Number(event.currentTarget.dataset.position);

    //     if (dragAndDrop.draggedEnteredTo !== draggedTo) {

    //         setDragAndDrop({
    //             ...dragAndDrop,
    //             draggedEnteredTo: draggedTo
    //         });
    //     }
    // }

    // const onDragEnd = (event) => {
    //     setDragAndDrop({
    //         ...dragAndDrop,
    //         draggedEnteredTo: null
    //     });
    // }

    const onCampainCancel = () => {
        onCancelCampain();
    }

    const onSectionNameEnter = (event, sectionIndex) => {
        let arr = [...list];
        let section = arr[sectionIndex];
        section.title = event.target.value;
        setList([...arr]);
    }

    const onAddSection = (event, index) => {
        let arr = [...list];
        let newSection = defaultSection[0];
        arr.splice(index + 1, 0, newSection);
        setList([...arr]);
    }

    const onDeleteSection = (event, deleteSectinoIndex) => {
        let arr = [...list];
        const newList = arr.filter((item, index) => index !== deleteSectinoIndex);
        if (newList.length !== 0) {
            setList([...newList]);
        } else {
            setList([...[defaultSection[0]]]);
        }

    }

    const onQuestionDelete = (event, sectionIndex, questionIndex) => {
        let arr = [...list];
        let section = arr[sectionIndex];
        let questions = section.questions;
        questions.splice(questionIndex, 1);
        setList([...arr]);
    }

    const onAddQuestion = (event, sectionIndex, questionIndex) => {
        let arr = [...list];
        let section = arr[sectionIndex];
        let questions = [...section.questions];
        questions.splice(questionIndex, 0, defaultSection[0].questions[0]);
        section.questions = questions;
        setList([...arr]);
    }

    const onSectionGoDown = (event, index) => {
        let arr = [...list];
        let temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
        setList([...arr]);
    }

    const onSectionGoUp = (event, index) => {
        let arr = [...list];
        let temp = arr[index];
        arr[index] = arr[index - 1];
        arr[index - 1] = temp;
        setList([...arr]);
    }

    const onSearchQuesiton = (searchValue) => {

        // if (searchValue!== '')
        getQuestionData(searchValue);
    }

    const onCampaignDetailsEnter = (e, value) => {
        let data = { ...campaignData };
        if (value === 1) {
            data.campaignName = e;
            setCampaignData(data)
        }
        if (value === 2) {
            data.campaignDesc = e;
            setCampaignData(data)
        }
        if (value === 3) {
            data.campaignObjective = e;
            setCampaignData(data)
        }

    }

    const onCreateCampaign = () => {
        let result = { ...campaignData };
        result.sections = list;
        createCampaignApi(result);
    }

    const onAddCampaignAnswer = () => {
        console.log(campaignAnswer);
        updateCampaignAnswers(Object.values(campaignAnswer));
    }


    const onHandleAnswerChange = (e, campaignId, sectionId, questionId) => {
        if (Object.keys(campaignDataFromParent).length !== 0) {
            let data = {
                campaignId: campaignId,
                sectionId: sectionId,
                questionId: questionId,
                answer: e.target.value
            }

            let temp = { ...campaignAnswer };
            temp[campaignId.toString() + sectionId.toString() + questionId.toString()] = data;
            setCampaignAnswer(temp);
        }

    }


    const valueForInupts = (campaignId, sectionId, questionId) => {
        if (Object.keys(campaignDataFromParent).length === 0) {
            return ''
        } else {
            if (campaignAnswer[campaignId.toString() + sectionId.toString() + questionId.toString()]) {
                let data = campaignAnswer[campaignId.toString() + sectionId.toString() + questionId.toString()].answer;
                return data;
            }
            return '';
        }

    }


    const onUpdateCampaignStatus = (status) => {
        let data = {};
        data.statusDesc = status;
        data.comments = campaignComment;
        data.campaignId = campaignDataFromParent.campaignId;
        updateCampaignStatus(data);
    }

    const onUpdateCampaignComment = (comment) => {
        setCampaignComment(comment);
    }

    useEffect(() => {
        getQuestionData('');
        if (Object.keys(campaignDataFromParent).length !== 0) {
            const cData = {
                campaignName: campaignDataFromParent.campaignName,
                campaignDesc: campaignDataFromParent.campaignDesc,
                campaignObjective: campaignDataFromParent.campaignObjective,
                campaignId: campaignDataFromParent.campaignId
            }
            setCampaignData({ ...cData })
            setList([...campaignDataFromParent.sections]);
        }
        else
            setList([...defaultSection]);
    }, [])




    return (
        <div>


            <section className={"campaign-section"} id="campain-details-enter">
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Campaign Name"
                    value={campaignData.campaignName.toString()}
                    variant="outlined"
                    onChange={(e) => { onCampaignDetailsEnter(e.target.value, 1) }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Campaign Desc"
                    value={campaignData.campaignDesc.toString()}
                    variant="outlined"
                    onChange={(e) => { onCampaignDetailsEnter(e.target.value, 2) }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    id="standard-basic"
                    label="Objective"
                    value={campaignData.campaignObjective.toString()}
                    variant="outlined"
                    onChange={(e) => { onCampaignDetailsEnter(e.target.value, 3) }}
                />
            </section>

            <section id='campaign-create-add-section'>
                {
                    // Object.keys(campaignDataFromParent).length === 0 &&
                    !viewCampaignBool &&
                    <Button style={{ marginLeft: '20px' }} variant="contained" onClick={() => { onCreateCampaign() }}>
                        create campaign
                    </Button>

                }

                {/* {
                   
                    onPublishBool &&
                    <Button style={{ marginLeft: '20px' }} variant="contained" onClick={() => { onAddCampaignAnswer() }}>
                        Add Answer
                    </Button>
                    
                } */}

                {
                    approveCampaignBool &&
                    <TextField
                        style = {{   width: '65%', marginLeft: '14px'}}
                        id="standard-basic"
                        label="Comment"
                        value={campaignComment}
                        // variant="outlined"
                        onChange={(e) => { onUpdateCampaignComment(e.target.value) }}
                    />
                }



                {
                    approveCampaignBool &&
                    <Button
                        style={{ marginLeft: '20px' }}
                        variant="contained"
                        color="success"
                        onClick={() => { onUpdateCampaignStatus(APPROVE) }}
                    >
                        Approve
                    </Button>

                }

                {
                    approveCampaignBool &&
                    <Button
                        style={{ marginLeft: '20px' }}
                        variant="contained"
                        color="error"
                        onClick={() => { onUpdateCampaignStatus(REJECT) }}
                    >
                        Reject
                    </Button>

                }

                <Button onClick={() => { onCampainCancel() }}>
                    cancel
                </Button>

            </section>


            <section>
                <Row>
                    <Col span={(!viewCampaignBool) ? 16 : 24}>
                        <section className={"campaign-section"}>
                            <ul>

                                {list[0] && list.map((section, sectionIndex) => {
                                    return (
                                        <li
                                            key={sectionIndex}
                                            data-position={sectionIndex}

                                        // draggable

                                        // onDragStart={onDragStart}

                                        // onDragOver={onDragOver}

                                        // onDrop={onDrop}

                                        // onDragEnd={onDragEnd}

                                        // onDragLeave={onDragLeave}

                                        // onDragEnter={onDragEnter}

                                        // className={dragAndDrop && dragAndDrop.draggedEnteredTo === Number(sectionIndex) ? "dropArea" : ""}
                                        >
                                            <div id='draggable-portion'>
                                                {sectionIndex !== 0 && !viewCampaignBool &&
                                                    <Button className={'section-up-down'} onClick={(e) => onSectionGoUp(e, sectionIndex)}>
                                                        <KeyboardArrowUpIcon />
                                                    </Button>
                                                }
                                                {
                                                    sectionIndex !== (list.length - 1) && !viewCampaignBool &&
                                                    <Button className={'section-up-down'} onClick={(e) => onSectionGoDown(e, sectionIndex)}>
                                                        <KeyboardArrowDownIcon />
                                                    </Button>
                                                }
                                                {/* <DragIndicatorIcon /> */}

                                                {!viewCampaignBool &&
                                                    <Button onClick={(e) => onAddSection(e, sectionIndex)} >
                                                        <AddCircleIcon />
                                                    </Button>
                                                }

                                            </div>

                                            <div id='campaign-section-desc'>

                                                <div id='campaign-section-name-delete'>
                                                    <TextField
                                                        placeholder={'Enter Section Name'}
                                                        value={section.title}
                                                        id="standard-basic"
                                                        onChange={(e) => onSectionNameEnter(e, sectionIndex)}
                                                        variant="standard"
                                                    />
                                                    {
                                                        !viewCampaignBool &&
                                                        <Button onClick={(e) => onDeleteSection(e, sectionIndex)}>
                                                            <DeleteIcon />
                                                        </Button>
                                                    }

                                                </div>
                                                <Box id='campaign-box'>

                                                    {section.questions[0] && section.questions.map((question, questionIndex) => {
                                                        return (
                                                            <Card
                                                                className={"campain-question-description-box"}
                                                                variant="outlined"
                                                            // draggable
                                                            // onDragOver={onDragOver}
                                                            // onDrop={onDrop}
                                                            // data-position={0}
                                                            // data-section={sectionIndex}
                                                            >
                                                                <TextField
                                                                    label="Question Id"
                                                                    id="standard-start-adornment"
                                                                    sx={{ m: 1, width: "25ch" }}
                                                                    value={question.questionId}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                    InputProps={{
                                                                        startAdornment: (
                                                                            <InputAdornment position="start"> </InputAdornment>
                                                                        )
                                                                    }}
                                                                    variant="standard"
                                                                />

                                                                <TextField
                                                                    label="Question Name"
                                                                    id="standard-start-adornment"
                                                                    sx={{ m: 1, width: "25ch" }}
                                                                    value={question.questionName}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                    InputProps={{
                                                                        startAdornment: (
                                                                            <InputAdornment position="start"> </InputAdornment>
                                                                        )
                                                                    }}
                                                                    variant="standard"
                                                                />


                                                                <TextField
                                                                    label="Question Desc"
                                                                    id="standard-start-adornment"
                                                                    sx={{ m: 1, width: "25ch" }}
                                                                    value={question.questionDesc}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                    InputProps={{
                                                                        startAdornment: (
                                                                            <InputAdornment position="start"> </InputAdornment>
                                                                        )
                                                                    }}
                                                                    variant="standard"
                                                                />

                                                                {
                                                                    !viewCampaignBool &&
                                                                    <Button id='delete-question-button' onClick={(e) => onQuestionDelete(e, sectionIndex, questionIndex)}>
                                                                        <ClearIcon />
                                                                    </Button>
                                                                }

                                                                <br />
                                                                <br />
                                                                <br />
                                                                {
                                                                    question.responseType === QUESTION_TYPE_TEXT &&
                                                                    <TextField
                                                                        fullWidth
                                                                        placeholder='Text'
                                                                        id="standard-basic"
                                                                        variant="standard"

                                                                        value={valueForInupts(campaignData.campaignId, section.sectionId, question.questionId)}
                                                                        onChange={(e) => onHandleAnswerChange(e, campaignData.campaignId, section.sectionId, question.questionId)}
                                                                    />

                                                                }

                                                                {
                                                                    question.responseType === QUESTION_TYPE_DROPDOWN &&

                                                                    <FormControl fullWidth>
                                                                        <InputLabel id="demo-simple-select-label">Select Input</InputLabel>
                                                                        <Select
                                                                            labelId="demo-simple-select-label"
                                                                            id="demo-simple-select"
                                                                            value={valueForInupts(campaignData.campaignId, section.sectionId, question.questionId)}
                                                                            label={'select input'}
                                                                            onChange={(e) => onHandleAnswerChange(e, campaignData.campaignId, section.sectionId, question.questionId)}
                                                                        >
                                                                            {
                                                                                question.response.map((e, i) => {
                                                                                    return <MenuItem value={e.responseName}>{e.responseName}</MenuItem>
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    </FormControl>

                                                                }
                                                                {
                                                                    question.responseType === QUESTION_TYPE_RADIO &&
                                                                    <FormControl component="fieldset">
                                                                        <FormLabel component="legend">options</FormLabel>
                                                                        <RadioGroup
                                                                            onChange={(e) => onHandleAnswerChange(e, campaignData.campaignId, section.sectionId, question.questionId)}
                                                                            row aria-label="gender"
                                                                            // value = { valueForInupts(campaignData.campaignId,section.sectionId,question.questionId)}
                                                                            name="row-radio-buttons-group">
                                                                            {
                                                                                question.response.map((e, i) => {
                                                                                    return <FormControlLabel value={e.responseName} control={<Radio />} label={e.responseName} />
                                                                                })
                                                                            }
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                }
                                                            </Card>
                                                        )
                                                    })}

                                                    {
                                                        // !section.questions[0] &&
                                                        // Object.keys(campaignDataFromParent).length === 0 &&
                                                        !viewCampaignBool &&
                                                        <div
                                                            draggable
                                                            onDragStart={onDragStart}
                                                            onDragOver={onDragOver}
                                                            onDrop={onDrop}
                                                            onDragEnd={onDragEnd}
                                                            // data-position={0}
                                                            data-section={sectionIndex}
                                                            className="empty-question-box"
                                                        >
                                                            <p> drag and drop questions </p>
                                                        </div>
                                                    }
                                                </Box>



                                                {/* <Box id='campaign-question-add-button'>
                                         <Button onClick={(e)=>onAddQuestion(e,sectionIndex,section.questions.length)}  variant="contained">
                                            add question
                                        </Button> 
                                        {
                                            Object.keys(campaignDataFromParent).length === 0 &&
                                            <QuestionSearch getSearchText={onSearchQuesiton} buttonTitle={'Add Question'} extraData={{ sectionIndex: sectionIndex }} />
                                        }
                                       
                                    </Box> */}

                                            </div>
                                        </li>
                                    )
                                })}

                            </ul>
                        </section>
                    </Col>
                    <Col className="campaign-section-question-selection" span={(!viewCampaignBool) ? 8 : 0}>
                        <div className="campaign-section-question-selection-pane">
                            {
                                // Object.keys(campaignDataFromParent).length === 0 &&
                                !viewCampaignBool &&
                                <QuestionSearch getSearchText={onSearchQuesiton} buttonTitle={'search'} />

                            }
                            <div className="question-list-drag">
                                {
                                    questionList.map((e, questionIndex) => {
                                        return (
                                            <Card
                                                key={questionIndex}
                                                data-position={questionIndex}
                                                draggable
                                                className={"question-list-drag-card"}
                                                onDragStart={onDragStart}
                                                onDragOver={onDragOver}
                                                onDrop={onDrop}
                                                onDragEnd={onDragEnd}
                                                variant="outlined"
                                            >
                                                <p> {e.questionName} </p>
                                                <p> {e.questionDesc} </p>
                                            </Card>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>






        </div>
    )
}

export default CreateCampain;