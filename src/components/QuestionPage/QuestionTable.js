import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from 'lodash';
import './Questionpage.css'
import { useContext } from 'react';
import Context from '../Login/LoginAuthProvider/Context';
import { CAMPAIGNS_SECTION, PENDING,APPROVE , QUESTION_APPROVER_ROLE, QUESTION_CREATOR_ROLE } from '../../config';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PublishIcon from '@mui/icons-material/Publish';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';


const QuestionTable = ({ questions, editQuestionOnClick, createNewFromExistingOnClick, deleteQuestionOnclick, viewQuestionOnClick, approveQuestionOnClick, typeOfTable }) => {

    const loginContext = useContext(Context);

    const checkNullOrUndefined = (data) => {
        return (data[0]) ? data[0] : [];
    }

    const editQuestion = (obj) => {
        if (typeOfTable === CAMPAIGNS_SECTION) {
            editQuestionOnClick(obj.campaignId);
        } else {
            editQuestionOnClick(obj.questionId);
        }
    }

    const deleteQuestion = (obj) => {
        if (typeOfTable === CAMPAIGNS_SECTION) {
            deleteQuestionOnclick(obj.campaignId);
        } else {
            deleteQuestionOnclick(obj.questionId);
        }

    }

    const viewQuestion = (obj) => {
        if (typeOfTable === CAMPAIGNS_SECTION) {
            viewQuestionOnClick(obj.campaignId);
        } else {
            viewQuestionOnClick(obj.questionId);
        }

    }

    const approveQuestion = (obj) => {
        if (typeOfTable === CAMPAIGNS_SECTION) {
            approveQuestionOnClick(obj.campaignId);
        } else {
            approveQuestionOnClick(obj.questionId);
        }

    }

    const createNewFromExisting = (obj) => {
        if (typeOfTable === CAMPAIGNS_SECTION) {
            createNewFromExistingOnClick(obj.campaignId);
        } else {
            createNewFromExistingOnClick(obj.questionId);
        }

    }


    return (
        <TableContainer id='question-table' component={Paper}>
            <Table sx={{ minWidth: 800 }} stickyHeader aria-label="simple table">
                <TableHead id='question-table-head'>
                    <TableRow>
                        {((questions) !== null) && ((questions) !== undefined) && (questions).length > 0 &&
                            Object.keys(checkNullOrUndefined((questions))).filter(e => e !== 'response').map((e, i) => (
                                <TableCell id='question-table-header' key={i} align="left">{_.startCase(e)}</TableCell>
                            ))
                        }
                        {
                            // questions.length > 0 && loginContext.userRole.includes(QUESTION_APPROVER_ROLE) &&
                            <TableCell id='question-table-header-action' align="left">{_.startCase('Action')}</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {((questions) !== null) && ((questions) !== undefined) && (questions).length > 0 &&
                        (questions).map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {questions.length > 0 &&
                                    Object.values(row).filter(e => !(e instanceof Array)).map((e, i) => (
                                        <TableCell key={i} align="left">{e}</TableCell>
                                    ))
                                }
                                <TableCell align="left" id='question-table-action-icons'>

                                    <div className="action-icon-div">
                                        <Button onClick={() => { viewQuestion(row) }}>
                                            <VisibilityIcon />
                                        </Button>

                                        {
                                            row.statusDesc === APPROVE && loginContext.userRole.includes(QUESTION_CREATOR_ROLE) && typeOfTable === CAMPAIGNS_SECTION &&
                                            <Button onClick={() => { createNewFromExisting(row) }}>
                                                <AddCircleIcon />
                                            </Button>

                                        }

                                        {
                                            row.statusDesc !== APPROVE && loginContext.userId === row.createdBy &&
                                            loginContext.userRole.includes(QUESTION_CREATOR_ROLE) &&
                                            <Button onClick={() => { editQuestion(row) }}>
                                                <EditIcon />
                                            </Button>

                                        }

                                        {
                                            row.statusDesc !== APPROVE && loginContext.userId === row.createdBy &&
                                            loginContext.userRole.includes(QUESTION_CREATOR_ROLE) &&
                                            <Button style={{color:'red'}} onClick={() => { deleteQuestion(row) }}>
                                                <DeleteForeverIcon />
                                            </Button>

                                        }


                                        {
                                            row.statusDesc === PENDING && loginContext.userRole.includes(QUESTION_APPROVER_ROLE) &&
                                            <Button style={{color:'green'}} onClick={() => { approveQuestion(row) }}>
                                                <CheckCircleIcon />
                                            </Button>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default QuestionTable;