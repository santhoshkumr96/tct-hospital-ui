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
import SurveyPersonList from './SurveyPersonList';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const SurveyTable = () => {

  const loginContext = useContext(Context);
  const errorContext = useContext(ErrorContext);
  const toggleContext = useContext(ToggleContext);
  const [surveyCampaignList, setSurveyCampaignList] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')
  const [userList, setUserList] = useState([])
  const [isUserNameExist, setIsUserNameExist] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [viewSurveyId, setViewSurveyId] = useState(0);
  const [viewCampaignId, setViewCampaignId] = useState(0);
  const [viewSurveyPeopleBool, setViewSurveyPeopleBool] = useState(false);

  const getData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    ajax
      .get(`${SERVICE_BASE_URL}v1/get-survey-campaign-list`, {}, config)
      .then((res) => {
        setSurveyCampaignList(res.data)
        console.log(res.data);
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

  const getDownLoadData = async (surveyId) => {
    const config = {
    };
    ajax
      .post(`${SERVICE_BASE_URL}v1/get-survey-answers`, {surveyId}, config)
      .then((res) => {
        console.log(res.data);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'surveydata.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
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


  const viewSurveyPeopleTable = (surveyData) => {
    setViewSurveyId(surveyData.surveyId)
    setViewCampaignId(surveyData.campaignId)
    setViewSurveyPeopleBool(true);
  }

  const viewSurveyTable = (surveyData) => {
    setViewSurveyPeopleBool(false);
  }

  const downloadSurveyData = (row) => {
    getDownLoadData(row.surveyId);
  }

  useEffect(() => { 
    getData();
  }, [])

  return (

    <div className="add-user-wrapper-wrapper">
    {
      !viewSurveyPeopleBool && 
    <TableContainer >
      <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
        <TableHead id='question-table-head'>
          <TableRow>
                <TableCell id='question-table-header' align="left">S No</TableCell>
                <TableCell id='question-table-header' align="left">Survey Id</TableCell>
                <TableCell id='question-table-header' align="left">Survey Name</TableCell>
                <TableCell id='question-table-header' align="left">Campaign Id</TableCell>
                <TableCell id='question-table-header' align="left">Campaign Name</TableCell>
                <TableCell id='question-table-header' align="left">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
              surveyCampaignList.map((row, index) => (
                  <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{index+1}</TableCell>
                    <TableCell align="left">{row.surveyId}</TableCell>
                    <TableCell align="left">{row.surveyName}</TableCell>
                    <TableCell align="left">{row.campaignId}</TableCell>
                    <TableCell align="left">{row.campaignName}</TableCell>
                    <TableCell align="left">
                        <Button onClick={() => { viewSurveyPeopleTable(row) }}>
                                  <VisibilityIcon />
                        </Button>
                        <Button onClick={() => {downloadSurveyData(row) }}>
                                  <ArrowCircleDownIcon />
                        </Button>
                    </TableCell>
                  </TableRow>
              ))
            }
        </TableBody>
      </Table>
    </TableContainer>
    }  
    {
      
      viewSurveyPeopleBool && 
      <SurveyPersonList hideTable={viewSurveyTable} surveyId={viewSurveyId} campaignId={viewCampaignId}/>
    }
    
    </div>

  )
}

export default SurveyTable;