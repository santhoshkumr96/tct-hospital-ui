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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SurveyPersonList = ({hideTable,surveyId,campaignId}) => {

  const paginationDefaultData = {
    numberOfRows: 10,
    pageNumber: 0,
    sqlCondition : '',
    campaginId : undefined,
    surveyId : undefined
  }

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
  const [paginationData, setPagniationData] = useState(paginationDefaultData);


  const getData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };

    const tempData = {...paginationData}
    tempData.surveyId = surveyId

    ajax
      .post(`${SERVICE_BASE_URL}v1/get-survey-people-list`, tempData, config)
      .then((res) => {
        setUserList(res.data);
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


  const takeToSurveyPage = (data) => {
    let personId = String(data.personId);
    let survey = String(surveyId);
    let url = "http://localhost:3000/api/survey?surveyId=";
    url = url.concat(survey+"&personId=");
    url = url.concat(personId+"&user=");
    url = url.concat(loginContext.userId+"&campaignId=");
    url = url.concat(campaignId)
    window.open(url, "_blank")
  }

  useEffect(() => {
    getData();
  }, [])

  return (

    <div className="add-user-wrapper-wrapper">

    <Button style={{ marginBottom: 20 }}  onClick={() => { hideTable() }} variant="contained">
          <ArrowBackIcon />
    </Button>
      
    <TableContainer >
      <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
        <TableHead id='question-table-head'>
          <TableRow>
                <TableCell id='question-table-header' align="left">S No</TableCell>
                <TableCell id='question-table-header' align="left">Person Id</TableCell>
                <TableCell id='question-table-header' align="left">Name</TableCell>
                <TableCell id='question-table-header' align="left">Mobile Number</TableCell>
                <TableCell id='question-table-header' align="left">District</TableCell>
                <TableCell id='question-table-header' align="left">Block</TableCell>
                <TableCell id='question-table-header' align="left">Status</TableCell>
                <TableCell id='question-table-header' align="left">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {
              userList.map((row, index) => (
                  <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{index+1}</TableCell>
                    <TableCell align="left">{row.personId}</TableCell>
                    <TableCell align="left">{row.memberName}</TableCell>
                    <TableCell align="left">{row.mobileNo}</TableCell>
                    <TableCell align="left">{row.district}</TableCell>
                    <TableCell align="left">{row.block}</TableCell>
                    <TableCell align="left">{row.statusDesc}</TableCell>
                    <TableCell align="left">
                        <Button onClick={() => { takeToSurveyPage(row) }}>
                                  <VisibilityIcon />
                        </Button>
                    </TableCell>
                  </TableRow>
              ))
            }
        </TableBody>
      </Table>
    </TableContainer>

    </div>

  )
}

export default SurveyPersonList;