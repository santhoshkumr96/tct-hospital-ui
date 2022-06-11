import { useContext, useState, React , useEffect} from 'react';
import { TextField, InputLabel, Select, MenuItem, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
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
import { Row, Col , message} from 'antd';

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
  const [popData, setPopData] = useState([]);
  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [paginationData, setPaginationData] = useState(paginationDefaultData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [popDataCount, setPopDataCount] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let temp = paginationData;
    paginationData.pageNumber = newPage;
    setPaginationData({ ...temp });
    // getData();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    let temp = paginationData;
    paginationData.pageNumber = 0;
    paginationData.numberOfRows = (+event.target.value);
    setPaginationData({ ...temp });
    // getData();
  };

  const getData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };

    const tempData = {...paginationData}
    tempData.surveyId = surveyId

    ajax
      .post(`${SERVICE_BASE_URL}v1/get-survey-people-list`, tempData, config)
      .then((res) => {
        setPopData(res.data);
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

  const getDataCount = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };

    const tempData = {...paginationData}
    tempData.surveyId = surveyId

    ajax
      .post(`${SERVICE_BASE_URL}v1/get-survey-people-list-count`, tempData, config)
      .then((res) => {
        setPopDataCount(res.data);
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
    getDataCount();
  }, [])

  useEffect(() => {
    getData();
  }, [paginationData])


  return (



    <div className="add-user-wrapper-wrapper">

    <Row>
      <Col>
        <Button style={{ marginBottom: 20 }}  onClick={() => { hideTable() }} variant="contained">
          <ArrowBackIcon />
        </Button>
      </Col>
      <Col>
          <TablePagination
                    className="pagnation-div"
                    rowsPerPageOptions={[10, 25, 100, 1000]}
                    component="div"
                    count={popDataCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Col>
    </Row>
      
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
              popData.map((row, index) => (
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