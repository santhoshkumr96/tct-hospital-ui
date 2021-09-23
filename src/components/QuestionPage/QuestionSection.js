
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

import QuestionTable from './QuestionTable';

const QuestionSection = () => {

    const QUESTION_NAME = 'questionName';
    const QUESTION_DESC = 'questionDesc';
    const RESPONSE_NAME = 'responseName';
    const RESPONSE_DESC = 'responseDesc';
    const QUESTION_TYPE = 'questionType';

    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [questionData, setQuestionData] = useState([]);
    const [rows, setRows] = useState(questionData);
    const [searched, setSearched] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [response, setResponse] = useState([]);
    const [responseData, setResponseData] = useState({});
    const [responseDataName, setResponseDataName] = useState('');
    const [responseDataDesc, setResponseDataDesc] = useState('');
    const [numberOfResponse, setnumberOfResponse] = useState(0);
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
    const [newQuestionData, setNewQuestionData] = useState({});
    const [resultQuestion, setResultQuestion] = useState({});



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

    const createQuestionRequest = async (question) => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post(`${SERVICE_BASE_URL}v1/createQuestion`,question, config)
            .then((res) => {
                console.log('done');
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
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };


    const createQuestion = () => {
        setIsCreatingQuestion(true);
    }

    const handleDialogClose = () => {
        setIsCreatingQuestion(false);
        setResponseData({...{}});
        setNewQuestionData({...{}})
        setResponse([...[]])
        
    }

    const handleTypeSelectChange = (event) => {
        let val = newQuestionData;
        val.questionType = event.target.value;
        setNewQuestionData(val);
        setQuestionType(event.target.value);
    };

    const onNewQuestionDataEntryChange = (e, what) => {
        let val = newQuestionData;
        if (what === QUESTION_NAME) {
            val.questionName = e;
        }
        if (what === QUESTION_DESC) {
            val.questionDesc = e;
        }
        setNewQuestionData(val);
    }

    const addNewResponse = () => {
        let data = response;
        data.push(responseData);
        setResponseData({ ...{} });
        setResponseDataName('');
        setResponseDataDesc('');
        setResponse([...data]);
    }

    const deleteResponse = (event, i) => {
        response.splice(i, 1);
        setResponse([...response]);
    }

    const onResponseUpdate = (e, what) => {
        let val = responseData;
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
        result.responseType = questionType;
        result.questionName = newQuestionData.questionName;
        result.questionDesc = newQuestionData.questionDesc;
        result.response = response;
        setResultQuestion({...result});
        createQuestionRequest(result);
        console.log(result);
    }


    useEffect(() => {
        getData();
    }, [resultQuestion])

    return (
        <div id='main-questionare-div'>
            {loginContext.userRole.includes(QUESTION_CREATOR_ROLE) &&
                <div id='questionare-search-create'>

                    <Button variant="contained" onClick={() => { createQuestion() }}>
                        Create Question
                    </Button>

                    <div id='questionare-search-bar'>
                        <TextField disabled id="outlined-basic" type="search" label="search disabled" variant="outlined" onChange={(e) => { requestSearch(e.target.value) }} />
                    </div>
                </div>
            }
            <QuestionTable questions={questionData} />

            <Dialog
                open={isCreatingQuestion}
                onClose={handleDialogClose}
                id='create-question-dialog-box'

            >
                <DialogTitle id="alert-dialog-title">
                    {'Create New Question'}
                </DialogTitle>
                <DialogContent >
                    <br />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Name"
                        variant="outlined"
                        onChange={(e) => { onNewQuestionDataEntryChange(e.target.value, QUESTION_NAME) }}
                    />
                    <br />
                    <br />
                    <TextField
                        fullWidth
                        id="standard-basic"
                        label="Description"
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
                            value={questionType}
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
                        (questionType != 'text' && _.isEqual(questionType, '') == false) &&
                        <TableContainer component={Paper}>
                            <Table id='response-table' sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead id='response-table-head'>
                                    <TableRow id='response-table-row'>
                                        <TableCell id="response-table-header" >Response Name</TableCell>
                                        <TableCell id="response-table-header">Response Description</TableCell>
                                        <TableCell id="response-table-header">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                    {response.map((row, i) => (
                                        <TableRow

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <Input disabled value={row.responseName} placeholder="name" />
                                            </TableCell>
                                            <TableCell>
                                                <Input disabled value={row.responseDesc} placeholder="description" />
                                            </TableCell>
                                            <TableCell>
                                                <Fab responseid={row.id} onClick={(e) => deleteResponse(e, i)} color="primary" aria-label="add">
                                                    <DeleteIcon />
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {(_.size(response) < 4) &&
                                        <TableRow

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <Input placeholder="name"  value={responseDataName} onChange={(e) => { onResponseUpdate(e, RESPONSE_NAME) }} />
                                            </TableCell>
                                            <TableCell>
                                                <Input placeholder="description" value={responseDataDesc} onChange={(e) => { onResponseUpdate(e, RESPONSE_DESC) }} />
                                            </TableCell>
                                            <TableCell>
                                                <Fab onClick={(e) => addNewResponse()} color="primary" aria-label="add">
                                                    <AddIcon />
                                                </Fab>
                                            </TableCell>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} autoFocus>
                        cancel
                    </Button>
                    <Button onClick={handleDialogOnQuestionCreate} autoFocus>
                        create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default QuestionSection;