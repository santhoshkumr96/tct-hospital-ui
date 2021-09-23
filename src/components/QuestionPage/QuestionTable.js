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
import { QUESTION_APPROVER_ROLE } from '../../config';


const QuestionTable = ({ questions }) => {

    const loginContext = useContext(Context);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),

    ];

    return (
        <TableContainer id='question-table' component={Paper}>
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {questions.length > 0 &&
                            Object.keys(questions[1]).map((e, i) => (
                                <TableCell id='question-table-header' key={i} align="left">{_.startCase(e)}</TableCell>
                            ))
                        }
                        {
                            questions.length > 0 && loginContext.userRole.includes(QUESTION_APPROVER_ROLE) &&
                            <TableCell id='question-table-header' align="left">{_.startCase('Action')}</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.length > 0 &&
                        questions.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {questions.length > 0 &&
                                    Object.values(row).map((e, i) => (
                                        <TableCell key={i} align="left">{_.startCase(e)}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default QuestionTable;