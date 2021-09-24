
import { Button, Fab, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useContext, useState, React } from 'react';
import { QUESTION_CREATOR_ROLE, SERVICE_BASE_URL, TOKEN_EXPIRED } from '../../config';
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
import CancelIcon from '@mui/icons-material/Cancel';

import QuestionTable from './QuestionTable';

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
        comment: '',
        response: []
    }

    const createdResponseData = {
        responseName: '',
        responseDesc: ''
    }

    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [questionData, setQuestionData] = useState([]);
    const [createQuestionStore, setCreateQuestionStore] = useState(createdQuestionData);
    const [rows, setRows] = useState(questionData);
    const [searched, setSearched] = useState('');
    const [responseData, setResponseData] = useState(createdResponseData);
    const [responseDataName, setResponseDataName] = useState('');
    const [responseDataDesc, setResponseDataDesc] = useState('');
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
    const [isViewingQuestion, setIsViewingQuestion] = useState(false);
    const [isApprovingQuestion, setIsApprovingQuestion] = useState(false);
    const [resultQuestion, setResultQuestion] = useState({});
    const [qidFromChild , setQidFromChild] = useState(0);
    const [comment, setComment] = useState('')


    const getData = async () => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .get(`${SERVICE_BASE_URL}v1/getquestionlist`, config)
            .then((res) => {
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

    const getOneQuestionData = async (questionId) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/getquestion`, { questionId }, config)
            .then((res) => {
                setCreateQuestionStore({ ...res.data });
                setIsViewingQuestion(true);
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
        const filteredRows = questionData.filter((row) => {
            return _.toLower(row.questionName).includes(_.toLower(searchedVal));
        });
        setRows({ ...filteredRows });
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
        setResponseDataName('');
        setResponseDataDesc('');
        setCreateQuestionStore({ ...createdQuestionData });
        setResponseData({ ...createdResponseData });
    }

    const handleTypeSelectChange = (event) => {
        let val = { ...createQuestionStore }
        val.responseType = event.target.value;
        setCreateQuestionStore(val);
    };

    const onNewQuestionDataEntryChange = (e, what) => {
        let data = { ...createQuestionStore }
        if (what === QUESTION_NAME) {
            data.questionName = e;
            setCreateQuestionStore(data);
        }
        if (what === QUESTION_DESC) {
            data.questionDesc = e;
            setCreateQuestionStore(data);
        }



    }

    const addNewResponse = () => {
        let data = { ...createQuestionStore };
        data.response.push(responseData);
        setCreateQuestionStore(data);
        setResponseDataName('');
        setResponseDataDesc('');
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
        }
        if (what == RESPONSE_DESC) {
            setResponseDataDesc(e.target.value);
            val.responseDesc = e.target.value;
        }

        setResponseData(val);
    }

    const handleDialogOnQuestionCreate = () => {
        const result = {};
        result.responseType = createQuestionStore.responseType;
        result.questionName = createQuestionStore.questionName;
        result.questionDesc = createQuestionStore.questionDesc;
        result.response = createQuestionStore.response;
        createQuestionRequest(result);
        handleDialogClose();
    }

    const deleteQuesiton = (qid) => {
        deleteQuestionRequest(qid);

    }

    const viewQuesiton = (qid) => {
        setIsCreatingQuestion(true);
        getOneQuestionData(qid);
    }

    const approverQuestion = (qid) => {
        setIsCreatingQuestion(true);
        viewQuesiton(qid);
        setQidFromChild(qid)
        setIsApprovingQuestion(true);
    }

    const onCommentEntry = (comment) => {
        setComment(comment);
    }

    const onClickApproveOrReject = (selection) => {
        let data = {  }
        data.statusDesc = selection;
        data.comments = comment;
        data.questionId = qidFromChild;
        updateQuestionStatus(data);
        console.log(data);
    }


    useEffect(() => {
        getData();
    }, [resultQuestion])

    return (
        <div id='main-questionare-div'>
            {loginContext.userRole.includes(QUESTION_CREATOR_ROLE) &&
                <div id='questionare-search-create'>

                    <Button variant="contained" onClick={() => { onCreateQuestionButtonClick() }}>
                        Create Question
                    </Button>

                    <div id='questionare-search-bar'>
                        <TextField disabled id="outlined-basic" type="search" label="search disabled" variant="outlined" onChange={(e) => { requestSearch(e.target.value) }} />
                    </div>
                </div>
            }
            <QuestionTable questions={questionData}
                viewQuestionOnClick={viewQuesiton}
                deleteQuestionOnclick={deleteQuesiton}
                approveQuestionOnClick={approverQuestion}
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
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={createQuestionStore.responseType.toString()}
                            label="Response Type"
                            onChange={handleTypeSelectChange}
                        >
                            <MenuItem value={'text'}>text</MenuItem>
                            <MenuItem value={'radio'}>radio</MenuItem>
                            <MenuItem value={'dropdown'}>dropdown</MenuItem>
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
                                                <Input disabled value={row.responseName} placeholder="name" />
                                            </TableCell>
                                            <TableCell>
                                                <Input disabled value={row.responseDesc} placeholder="description" />
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
                                                <Input placeholder="name" value={responseDataName} onChange={(e) => { onResponseUpdate(e, RESPONSE_NAME) }} />
                                            </TableCell>
                                            <TableCell>
                                                <Input placeholder="description" value={responseDataDesc} onChange={(e) => { onResponseUpdate(e, RESPONSE_DESC) }} />
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
                            id="standard-basic"
                            label="Comments"
                            value={comment}
                            multiline
                            rows={2}
                            variant="outlined"
                            onChange={(e) => { onCommentEntry(e.target.value) }}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} >
                        cancel
                    </Button>
                    {
                        isViewingQuestion === false &&
                        <Button variant="contained" onClick={handleDialogOnQuestionCreate} >
                            create
                        </Button>
                    }
                    {
                        isApprovingQuestion === true &&
                        <div id="approve-deny-buttons">
                            <Button variant="contained" color="success" onClick={()=>onClickApproveOrReject(APPROVE)} >
                                approve
                            </Button>
                            <Button variant="contained" color="error" onClick={()=>onClickApproveOrReject(REJECT)} >
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