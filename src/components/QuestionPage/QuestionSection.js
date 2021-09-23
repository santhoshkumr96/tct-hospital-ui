
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useContext, useState } from 'react';
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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';


import QuestionTable from './QuestionTable';

const QuestionSection = () => {



    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [questionData, setQuestionData] = useState([]);
    const [rows, setRows] = useState(questionData);
    const [searched, setSearched] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);


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
    }

    const handleTypeSelectChange = (event) => {
        setQuestionType(event.target.value);
    };



    useEffect(() => {
        getData();
    }, [])

    return (
        <div id='main-questionare-div'>
            {loginContext.userRole.includes(QUESTION_CREATOR_ROLE) &&
                <div id='questionare-search-create'>

                    <Button variant="contained" onClick={() => { createQuestion() }}>
                        Create Question
                    </Button>

                    <div id='questionare-search-bar'>
                        <TextField disabled id="outlined-basic"  type="search" label="search disabled" variant="outlined" onChange={(e) => { requestSearch(e.target.value) }} />
                    </div>
                </div>
            }
            <QuestionTable questions={questionData} />

            <Dialog
                open={isCreatingQuestion}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Create New Question'}
                </DialogTitle>
                <DialogContent>
                    <TextField id="standard-basic" label="Name" variant="filled" />
                    <br />
                    <br />
                    <TextField 
                        id="standard-basic" 
                        label="Description" 
                        multiline
                        rows={4}
                        variant="filled" />
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={questionType}
                            label="Select Type"
                            onChange={handleTypeSelectChange}
                        >
                            <MenuItem value={10}>text</MenuItem>
                            <MenuItem value={20}>radio</MenuItem>
                            <MenuItem value={30}>dropdown</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} autoFocus>
                        create
                    </Button>
                    <Button onClick={handleDialogClose} autoFocus>
                        cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default QuestionSection;