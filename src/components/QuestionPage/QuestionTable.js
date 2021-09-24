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
import { QUESTION_APPROVER_ROLE, QUESTION_CREATOR_ROLE } from '../../config';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const QuestionTable = ({ questions, deleteQuestionOnclick }) => {

    const loginContext = useContext(Context);

    const checkNullOrUndefined = (data) => {
        return (data[0]) ? data[0] : [];
    }

    const deleteQuestion = (qid) => {
        deleteQuestionOnclick(qid);
    }

    return (
        <TableContainer id='question-table' component={Paper}>
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {(questions !== null) && (questions !== undefined) && questions.length > 0 &&
                            Object.keys(checkNullOrUndefined(questions)).map((e, i) => (
                                <TableCell id='question-table-header' key={i} align="left">{_.startCase(e)}</TableCell>
                            ))
                        }
                        {
                            // questions.length > 0 && loginContext.userRole.includes(QUESTION_APPROVER_ROLE) &&
                            <TableCell id='question-table-header' align="left">{_.startCase('Action')}</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(questions !== null) && (questions !== undefined) && questions.length > 0 &&
                        questions.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {questions.length > 0 &&
                                    Object.values(row).map((e, i) => (
                                        <TableCell key={i} align="left">{e}</TableCell>
                                    ))
                                }
                                <TableCell align="left">

                                    <Button onClick={() => { deleteQuestion(row.questionId) }}>
                                        <VisibilityIcon />
                                    </Button>
                                    {
                                        loginContext.userRole.includes(QUESTION_CREATOR_ROLE) &&
                                        <Button onClick={() => { deleteQuestion(row.questionId) }}>
                                            <DeleteForeverIcon />
                                        </Button>
                                    }

                                    {
                                        loginContext.userRole.includes(QUESTION_APPROVER_ROLE) &&
                                        <Button onClick={() => { deleteQuestion(row.questionId) }}>
                                            <CheckCircleIcon />
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default QuestionTable;