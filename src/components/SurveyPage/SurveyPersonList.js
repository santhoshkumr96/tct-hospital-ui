import { useContext, useState, React , useEffect} from 'react';
import { TextField, InputLabel, Select, MenuItem, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Alert, message } from 'antd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Context from '../Login/LoginAuthProvider/Context';
import ajax from '../../Helpers/ajaxHelper';
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';
import ErrorContext from '../NetworkAuthProvider/ErrorContext';
import ToggleContext from '../PreTogglesProvider/ErrorContext';
import { SERVICE_BASE_URL, TOKEN_EXPIRED } from '../../config';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SurveyPersonList = () => {

  const loginContext = useContext(Context);
  const errorContext = useContext(ErrorContext);
  const toggleContext = useContext(ToggleContext);
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')
  const [userList, setUserList] = useState([])
  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const takeToSurveyPage = () => {
    window.open("http://localhost:3000/api/survey?surveyId=1&personId=145&userId=4", "_blank")
  }

  useEffect(() => {
  }, [])

  return (

    <div className="add-user-wrapper-wrapper">
      
    <TableContainer >
      <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
        <TableHead id='question-table-head'>
          <TableRow>
                <TableCell id='question-table-header' align="left">S No</TableCell>
                <TableCell id='question-table-header' align="left">Person Id</TableCell>
                <TableCell id='question-table-header' align="left">Name</TableCell>
                <TableCell id='question-table-header' align="left">Mobile Number</TableCell>
                <TableCell id='question-table-header' align="left">Area</TableCell>
                <TableCell id='question-table-header' align="left">Status</TableCell>
                <TableCell id='question-table-header' align="left">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* {
              userList.map((row, index) => (
                  <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{index+1}</TableCell>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="left">{row.password}</TableCell>
                  </TableRow>
              ))
            } */}
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="left">{'1'}</TableCell>
                    <TableCell align="left">{'test'}</TableCell>
                    <TableCell align="left">{'test'}</TableCell>
                    <TableCell align="left">{'test'}</TableCell>
                    <TableCell align="left">{'test'}</TableCell>
                    <TableCell align="left">{'done'}</TableCell>
                    <TableCell align="left">
                        <Button onClick={() => { takeToSurveyPage() }}>
                                  <VisibilityIcon />
                        </Button>
                    </TableCell>
                  </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    </div>

  )
}

export default SurveyPersonList;