
import { Button, Fab, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useContext, useState, React } from 'react';
import { QUESTION_CREATOR_ROLE, SERVICE_BASE_URL, TOKEN_EXPIRED, QUESTION_TYPE_TEXT, QUESTION_TYPE_RADIO, QUESTION_TYPE_DROPDOWN } from '../../config';
import Context from '../Login/LoginAuthProvider/Context';
import ajax from '../../Helpers/ajaxHelper';
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';
import ErrorContext from '../NetworkAuthProvider/ErrorContext';
import { useEffect } from 'react';
import _ from 'lodash';
import './Questionpage.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormHelperText from '@mui/material/FormHelperText';
import DialogContentText from '@mui/material/DialogContentText';
import Input from '@mui/material/Input';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, message } from 'antd';
import CancelIcon from '@mui/icons-material/Cancel';

import QuestionTable from './QuestionTable';
import QuestionSearch from './Search';

const QuestionSection = () => {

    const QUESTION_NAME = 'questionName';
    const QUESTION_DESC = 'questionDesc';
    const RESPONSE_NAME = 'responseName';
    const RESPONSE_DESC = 'responseDesc';
    const QUESTION_TYPE = 'questionType';
    const APPROVE = 'APPROVED';
    const REJECT = 'REJECTED';

    const createdQuestionData = {
        questionName: '',
        questionDesc: '',
        responseType: '',
        questionId: 0,
        comment: '',
        response: []
    }


    const defaultQuestionDataEntryCheck = {
        questionNameBool: false,
        questionDescBool: false,
        responseTypeBool: false,
        commentBool: false,
        responseNameBool: false,
        responseDescBool: false,
        responseSizeBool: false,
        helperText: "Enter Data"
    }

    const createdResponseData = {
        responseName: '',
        responseDesc: ''
    }

    const defaultQuestionData = [
        {
            questionName: "seomthing",
            questionId: 50,
            questionDesc: "nerw",
            comments: null,
            responseType: "dropdown",
            response: [
                {
                    responseId: 37,
                    responseName: "sdf",
                    responseDesc: "asdf",
                    questionId: 50,
                    createdBy: "santy",
                    changedBy: null,
                    approvedBy: null,
                    statusDesc: null,
                    createdDate: "2021-09-26T12:55:02.000+00:00",
                    changedDate: null,
                    approvedDate: null,
                    enabled: null,
                    comments: null
                }
            ],
            statusDesc: "PENDING"
        }
    ]

    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [questionData, setQuestionData] = useState(defaultQuestionData);
    const [createQuestionStore, setCreateQuestionStore] = useState(createdQuestionData);
    const [rows, setRows] = useState(questionData);
    const [searched, setSearched] = useState('');
    const [responseData, setResponseData] = useState(createdResponseData);
    const [responseDataName, setResponseDataName] = useState('');
    const [responseDataDesc, setResponseDataDesc] = useState('');
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
    const [isViewingQuestion, setIsViewingQuestion] = useState(false);
    const [isApprovingQuestion, setIsApprovingQuestion] = useState(false);
    const [isEditQuestion, setIsEditQuestion] = useState(false);
    const [resultQuestion, setResultQuestion] = useState({});
    const [qidFromChild, setQidFromChild] = useState(0);
    const [comment, setComment] = useState('')
    const [searchValue, setSearchValue] = useState('');
    const [questionDataEntryCheck, setQuestionDataEntryCheck] = useState(defaultQuestionDataEntryCheck);


    const getData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .get(`${SERVICE_BASE_URL}v1/getquestionlist?search=${searchValue}`, config)
            .then((res) => {
                // console.log(res.data);
                setQuestionData(res.data);
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

    const getOneQuestionData = async (questionId, type) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/getquestion`, { questionId }, config)
            .then((res) => {
                setCreateQuestionStore({ ...res.data });
                if (type === 'viewQuestion') {
                    setIsViewingQuestion(true);
                }
                if (type === 'editQuestion') {
                    setIsEditQuestion(true);
                }

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

    const createQuestionRequest = async (question) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/createquestion`, question, config)
            .then((res) => {
                setResultQuestion({ ...question });
                message.success('Question Created');
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

    const editQuestionRequest = async (question) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/editquestion`, question, config)
            .then((res) => {
                setResultQuestion({ ...question });
                message.success('Question Edit Created');
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

    const updateQuestionStatus = async (data) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/update-question-status`, data, config)
            .then((res) => {
                handleDialogClose();
                setResultQuestion({ ...{} });
                message.success('Question ' + data.statusDesc);
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


    const deleteQuestionRequest = async (questionId) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/deleteQuestion`, { questionId }, config)
            .then((res) => {
                setResultQuestion({ ...{} });
                message.success('Question ' + questionId + ' Deleted');
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

    const requestSearch = (searchedVal) => {
        // console.log(searchedVal);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };


    const onCreateQuestionButtonClick = () => {
        setIsViewingQuestion(false);
        setIsApprovingQuestion(false);
        setIsCreatingQuestion(true);
    }

    const handleDialogClose = () => {
        setIsCreatingQuestion(false);
        setIsViewingQuestion(false);
        setIsApprovingQuestion(false);
        setIsEditQuestion(false);
        setResponseDataName('');
        setResponseDataDesc('');
        setCreateQuestionStore({ ...createdQuestionData });
        setResponseData({ ...createdResponseData });
        setQuestionDataEntryCheck({ ...defaultQuestionDataEntryCheck });
    }

    const handleTypeSelectChange = (event) => {
        let val = { ...createQuestionStore }
        val.responseType = event.target.value;
        setCreateQuestionStore(val);
        if (event.target.value === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseTypeBool: true
            }))
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseTypeBool: false
            }))
        }
    };

    const onNewQuestionDataEntryChange = (e, what) => {
        let data = { ...createQuestionStore }
        if (what === QUESTION_NAME) {
            data.questionName = e;
            setCreateQuestionStore(data);
            if (e === "") {
                setQuestionDataEntryCheck(prevState => ({
                    ...prevState,
                    questionNameBool: true
                }))
            } else {
                setQuestionDataEntryCheck(prevState => ({
                    ...prevState,
                    questionNameBool: false
                }))
            }
        }
        if (what === QUESTION_DESC) {
            data.questionDesc = e;
            setCreateQuestionStore(data);
            if (e === "") {
                setQuestionDataEntryCheck(prevState => ({
                    ...prevState,
                    questionDescBool: true
                }))
            } else {
                setQuestionDataEntryCheck(prevState => ({
                    ...prevState,
                    questionDescBool: false
                }))
            }
        }
    }

    const addNewResponse = () => {
        if (responseData.responseName === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseNameBool: true
            }))
        }
        if (responseData.responseDesc === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseDescBool: true
            }))
        }
        if (responseData.responseName !== "" && responseData.responseDesc !== "") {
            let data = { ...createQuestionStore };
            data.response.push(responseData);
            setCreateQuestionStore(data);
            setResponseDataName("");
            setResponseDataDesc("");
            setResponseData({ ...createdResponseData });
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseDescBool: false,
                responseTypeBool: false
            }))
        }
    }

    const deleteResponse = (event, i) => {
        let data = { ...createQuestionStore };
        data.response.splice(i, 1);
        setCreateQuestionStore(data);
    }

    const onResponseUpdate = (e, what) => {
        let val = { ...responseData };
        if (what == RESPONSE_NAME) {
            setResponseDataName(e.target.value);
            val.responseName = e.target.value
            if (e.target.value === "") {
                setQuestionDataEntryCheck(prevState => ({
                    ...prevState,
                    responseNameBool: true
                }))
            } else {
                setQuestionDataEntryCheck(prevState => ({
                    ...prevState,
                    responseNameBool: false
                }))
            }
        }
        if (what == RESPONSE_DESC) {
            setResponseDataDesc(e.target.value);
            val.responseDesc = e.target.value;
            if (e.target.value === "") {
                setQuestionDataEntryCheck(prevState => ({
                    ...prevState,
                    responseDescBool: true
                }))
            } else {
                setQuestionDataEntryCheck(prevState => ({
                    ...prevState,
                    responseDescBool: false
                }))
            }
        }

        setResponseData(val);
    }

    const handleDialogOnQuestionCreate = () => {
        const result = {};
        result.responseType = createQuestionStore.responseType;
        result.questionName = createQuestionStore.questionName;
        result.questionDesc = createQuestionStore.questionDesc;
        result.response = createQuestionStore.response;
        if (createQuestionStore.questionName === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                questionNameBool: true
            }))
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                questionNameBool: false
            }))
        }
        if (createQuestionStore.questionDesc === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                questionDescBool: true
            }))
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                questionDescBool: false
            }))
        }
        if (createQuestionStore.responseType === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseTypeBool: true
            }))
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseTypeBool: false
            }))
        }
        if (
            result.responseType !== "" &&
            result.questionName !== "" &&
            result.questionDesc !== ""
        ) {
            if (QUESTION_TYPE_TEXT === result.responseType) {
                createQuestionRequest(result);
                handleDialogClose();
            } else {
                if (result.response.length >= 2) {
                    createQuestionRequest(result);
                    handleDialogClose();
                } else {
                    setQuestionDataEntryCheck(prevState => ({
                        ...prevState,
                        responseSizeBool: true
                    }))
                }
            }
        }
        // createQuestionRequest(result);

    }

    const handleDialogOnQuestionEdit = () => {
        const result = {};
        result.responseType = createQuestionStore.responseType;
        result.questionName = createQuestionStore.questionName;
        result.questionDesc = createQuestionStore.questionDesc;
        result.questionId = createQuestionStore.questionId;
        result.response = createQuestionStore.response;
        if (createQuestionStore.questionName === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                questionNameBool: true
            }))
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                questionNameBool: false
            }))
        }
        if (createQuestionStore.questionDesc === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                questionDescBool: true
            }))
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                questionDescBool: false
            }))
        }
        if (createQuestionStore.responseType === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseTypeBool: true
            }))
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                responseTypeBool: false
            }))
        }
        if (
            result.responseType !== "" &&
            result.questionName !== "" &&
            result.questionDesc !== ""
        ) {
            if (QUESTION_TYPE_TEXT === result.responseType) {
                editQuestionRequest(result);
                handleDialogClose();
            } else {
                if (result.response.length >= 2) {
                    editQuestionRequest(result);
                    handleDialogClose();
                } else {
                    setQuestionDataEntryCheck(prevState => ({
                        ...prevState,
                        responseSizeBool: true
                    }))
                }
            }
        }
    }

    const deleteQuesiton = (qid) => {
        deleteQuestionRequest(qid);

    }

    const viewQuesiton = (qid) => {
        setIsCreatingQuestion(true);
        getOneQuestionData(qid, 'viewQuestion');
    }

    const onEditQuestionButtonOnTable = (questionId) => {
        setIsCreatingQuestion(true);
        let temp = { ...createQuestionStore };
        temp.questionId = questionId;
        setCreateQuestionStore(temp);
        getOneQuestionData(questionId, 'editQuestion');
    }

    const approverQuestion = (qid) => {
        setIsCreatingQuestion(true);
        viewQuesiton(qid);
        setQidFromChild(qid)
        setIsApprovingQuestion(true);
    }

    const onCommentEntry = (comment) => {
        if (comment === "") {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                commentBool: true
            }))
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                commentBool: false
            }))
        }
        setComment(comment);
    }

    const onClickApproveOrReject = (selection) => {
        let data = {}
        data.statusDesc = selection;
        data.comments = comment;
        data.questionId = qidFromChild;
        if (comment !== "") {
            updateQuestionStatus(data);
        } else {
            setQuestionDataEntryCheck(prevState => ({
                ...prevState,
                commentBool: true
            }))
        }
    }


    const onSearchOkButton = (searchValue) => {
        setSearchValue(searchValue);
    }




    useEffect(() => {
        getData();
    }, [resultQuestion, searchValue])

    return (
        <div id='main-questionare-div'>

            <div id='questionare-search-create'>
                {loginContext.userRole.includes(QUESTION_CREATOR_ROLE) &&

                    <Button variant="contained" onClick={() => { onCreateQuestionButtonClick() }}>
                        Create Question
                    </Button>

                }
                <Button style={{marginLeft:'20px'}} onClick={() => { onCreateQuestionButtonClick() }}>
                    Total Questions : {questionData.length}
                </Button>

                <div id='questionare-search-bar'>
                    <QuestionSearch getSearchText={onSearchOkButton} buttonTitle={'Search'} />
                    {/* <TextField  id="outlined-basic" type="search" label="search disabled" variant="outlined" onChange={(e) => { requestSearch(e.target.value) }} /> */}
                </div>
            </div>

            <QuestionTable questions={questionData}
                viewQuestionOnClick={viewQuesiton}
                deleteQuestionOnclick={deleteQuesiton}
                approveQuestionOnClick={approverQuestion}
                editQuestionOnClick={onEditQuestionButtonOnTable}
            />

            <Dialog
                open={isCreatingQuestion}
                onClose={handleDialogClose}
                id='create-question-dialog-box'

            >
                <DialogTitle id="alert-dialog-title">
                    {'Question Data'}
                </DialogTitle>
                <DialogContent >
                    <br />
                    <TextField
                        disabled={isViewingQuestion}
                        error={questionDataEntryCheck.questionNameBool}
                        helperText={questionDataEntryCheck.questionNameBool ? questionDataEntryCheck.helperText : ""}
                        fullWidth
                        id="standard-basic"
                        label="Name"
                        variant="outlined"
                        value={createQuestionStore.questionName.toString()}
                        onChange={(e) => { onNewQuestionDataEntryChange(e.target.value, QUESTION_NAME) }}
                    />
                    <br />
                    <br />
                    <TextField
                        disabled={isViewingQuestion}
                        error={questionDataEntryCheck.questionDescBool}
                        helperText={questionDataEntryCheck.questionDescBool ? questionDataEntryCheck.helperText : ""}
                        fullWidth
                        id="standard-basic"
                        label="Description"
                        value={createQuestionStore.questionDesc.toString()}
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={(e) => { onNewQuestionDataEntryChange(e.target.value, QUESTION_DESC) }}
                    />
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Response Type</InputLabel>
                        <Select
                            disabled={isViewingQuestion}
                            error={questionDataEntryCheck.responseTypeBool}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={createQuestionStore.responseType.toString()}
                            label="Response Type"
                            onChange={handleTypeSelectChange}
                        >
                            <MenuItem value={QUESTION_TYPE_TEXT}>Text</MenuItem>
                            <MenuItem value={QUESTION_TYPE_RADIO}>Radio</MenuItem>
                            <MenuItem value={QUESTION_TYPE_DROPDOWN}>Dropdown</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    {
                        (createQuestionStore.responseType != 'text' && _.isEqual(createQuestionStore.responseType, '') == false) &&
                        <TableContainer component={Paper}>
                            <Table id='response-table' sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead id='response-table-head'>
                                    <TableRow id='response-table-row'>
                                        <TableCell id="response-table-header" >Response Name</TableCell>
                                        <TableCell id="response-table-header">Response Description</TableCell>
                                        {
                                            isViewingQuestion === false &&
                                            <TableCell id="response-table-header">Action</TableCell>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                    {createQuestionStore.response.map((row, i) => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <Input
                                                    disabled
                                                    value={row.responseName}
                                                    placeholder="name"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    disabled
                                                    value={row.responseDesc}
                                                    placeholder="description"
                                                />
                                            </TableCell>
                                            {
                                                isViewingQuestion === false &&
                                                <TableCell>
                                                    <Fab responseid={row.id} onClick={(e) => deleteResponse(e, i)} color="primary" aria-label="add">
                                                        <DeleteIcon />
                                                    </Fab>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    ))}

                                    {(_.size(createQuestionStore.response) < 4) && isViewingQuestion === false &&
                                        <TableRow

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <TextField
                                                    error={questionDataEntryCheck.responseNameBool}
                                                    helperText={questionDataEntryCheck.responseNameBool ? questionDataEntryCheck.helperText : ""}
                                                    placeholder="Name"
                                                    variant="standard"
                                                    value={responseDataName}
                                                    onChange={(e) => { onResponseUpdate(e, RESPONSE_NAME) }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    error={questionDataEntryCheck.responseDescBool}
                                                    helperText={questionDataEntryCheck.responseDescBool ? questionDataEntryCheck.helperText : ""}
                                                    placeholder="Description"
                                                    variant="standard"
                                                    value={responseDataDesc}
                                                    onChange={(e) => { onResponseUpdate(e, RESPONSE_DESC) }}
                                                />
                                            </TableCell>
                                            {
                                                isViewingQuestion === false &&
                                                <TableCell>
                                                    <Fab onClick={(e) => addNewResponse()} color="primary" aria-label="add">
                                                        <AddIcon />
                                                    </Fab>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                            {/* {
                                _.size(response) < 4 &&
                                <Button onClick={() => { addNewResponse() }} variant="contained">add response</Button>
                            } */}
                        </TableContainer>
                    }
                    <br />
                    {
                        isApprovingQuestion === true &&
                        <TextField
                            fullWidth
                            error={questionDataEntryCheck.commentBool}
                            helperText={questionDataEntryCheck.commentBool ? questionDataEntryCheck.helperText : ""}
                            id="standard-basic"
                            label="Comments"
                            value={comment}
                            multiline
                            rows={2}
                            variant="outlined"
                            onChange={(e) => { onCommentEntry(e.target.value) }}
                        />
                    }
                    {
                        questionDataEntryCheck.responseSizeBool &&
                        <Alert message="Add atleast 2 Response" type="error" showIcon />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} >
                        cancel
                    </Button>
                    {
                        isViewingQuestion === false && isEditQuestion === false &&
                        <Button variant="contained" onClick={handleDialogOnQuestionCreate} >
                            create
                        </Button>
                    }
                    {
                        isEditQuestion === true &&
                        <Button variant="contained" onClick={handleDialogOnQuestionEdit} >
                            Edit
                        </Button>
                    }
                    {
                        isApprovingQuestion === true &&
                        <div id="approve-deny-buttons">
                            <Button variant="contained" color="success" onClick={() => onClickApproveOrReject(APPROVE)} >
                                approve
                            </Button>
                            <Button variant="contained" color="error" onClick={() => onClickApproveOrReject(REJECT)} >
                                reject
                            </Button>
                        </div>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default QuestionSection;