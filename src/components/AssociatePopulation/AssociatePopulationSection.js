
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';
import { useContext, useState } from 'react';
import Login from '../Login/Login';
import Context from '../Login/LoginAuthProvider/Context';
import ErrorContext from '../NetworkAuthProvider/ErrorContext';
import { SERVICE_BASE_URL, TOKEN_EXPIRED } from '../../config';
import { useEffect } from 'react';
import ajax from '../../Helpers/ajaxHelper';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';
import './AssociatePopulation.scss'
import { Row, Col , message} from 'antd';
import { Button, Fab } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


import { Query, Builder, Utils as QbUtils } from "react-awesome-query-builder";
// types
import {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps
} from "react-awesome-query-builder";

// For AntDesign widgets only:
import AntdConfig from "react-awesome-query-builder/lib/config/antd";
import "antd/dist/antd.css"; // or import "react-awesome-query-builder/css/antd.less";
// For Material-UI widgets only:
//import MaterialConfig from "react-awesome-query-builder/lib/config/material";

import "react-awesome-query-builder/lib/css/styles.css";
import "react-awesome-query-builder/lib/css/compact_styles.css"; //optional, for more compact styles
import { TextField } from '@material-ui/core';

// Choose your skin (ant/material/vanilla):
const InitialConfig = AntdConfig;


// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  fields: {
     
    formNo: {
      label: "formNo",
      type: "number",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    projectCode: {
      label: "projectCode",
      type: "number",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    locationDetails: {
      label: "locationDetails",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    villageCode: {
      label: "villageCode",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    panchayatNo: {
      label: "panchayatNo",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    panchayatCode: {
      label: "panchayatCode",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    villageName: {
      label: "villageName",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    zone: {
      label: "zone",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    streetName: {
      label: "streetName",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    doorNo: {
      label: "doorNo",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    contactPerson: {
      label: "contactPerson",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    numberOfFamilyMembers: {
      label: "numberOfFamilyMembers",
      type: "number",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    statusOfHouse: {
      label: "statusOfHouse",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    typeOfHouse: {
      label: "typeOfHouse",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    toiletFacilityAtHome: {
      label: "toiletFacilityAtHome",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    ownsAnyLand: {
      label: "ownsAnyLand",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    wetLandInAcres: {
      label: "wetLandInAcres",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    dryLandInAcres: {
      label: "dryLandInAcres",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    ownsAnyVechicles: {
      label: "ownsAnyVechicles",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    noOfVechiclesOwned: {
      label: "noOfVechiclesOwned",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    twoWheeler: {
      label: "twoWheeler",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    threeWheeler: {
      label: "threeWheeler",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    fourWheeler: {
      label: "fourWheeler",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    others: {
      label: "others",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    ownsAnyLiveStocks: {
      label: "ownsAnyLiveStocks",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    hen: {
      label: "hen",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    cow: {
      label: "cow",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    pig: {
      label: "pig",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    buffalo: {
      label: "buffalo",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    goat: {
      label: "goat",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    othersLiveStocks: {
      label: "othersLiveStocks",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    livestockCount: {
      label: "livestockCount",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    isCompleted: {
      label: "isCompleted",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    actualMemberCount: {
      label: "actualMemberCount",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    familyHeadName: {
      label: "familyHeadName",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    id: {
      label: "id",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    name: {
      label: "name",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    aadhaarNumber: {
      label: "aadhaarNumber",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    relationShip: {
      label: "relationShip",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    gender: {
      label: "gender",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    dateOfBirth: {
      label: "dateOfBirth",
      type: "date",
      fieldSettings: {
        dateFormat: "MM/DD/yyyy"
      },
      preferWidgets: ["date"]
    },
    memberAge: {
      label: "memberAge",
      type: "number",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    bloodGroup: {
      label: "bloodGroup",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    physicallyChallenged: {
      label: "physicallyChallenged",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    physicallyChallengedReason: {
      label: "physicallyChallengedReason",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    maritalStatus: {
      label: "maritalStatus",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    educationQualification: {
      label: "educationQualification",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    occupation: {
      label: "occupation",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    annualIncome: {
      label: "annualIncome",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    mobileNumber: {
      label: "mobileNumber",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    email: {
      label: "email",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    smartPhone: {
      label: "smartPhone",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    communtiy: {
      label: "communtiy",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    caste: {
      label: "caste",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    govtInsurance: {
      label: "govtInsurance",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    healthInsurance: {
      label: "healthInsurance",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    oldAgePension: {
      label: "oldAgePension",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    widowedPension: {
      label: "widowedPension",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    retirementPension: {
      label: "retirementPension",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    smoking: {
      label: "smoking",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    drinking: {
      label: "drinking",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    tobacco: {
      label: "tobacco",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    vacinattionDone: {
      label: "vacinattionDone",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    firstDose: {
      label: "firstDose",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    secondDose: {
      label: "secondDose",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
    patientId: {
      label: "patientId",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["text"]
    },
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: "group" };



const AssociatePopulationSection = () => {

  const paginationDefaultData = {
    numberOfRows: 10,
    pageNumber: 0,
    sqlCondition : '',
    campaginId : undefined
  }

  const loginContext = useContext(Context);
  const errorContext = useContext(ErrorContext);
  const [popData, setPopData] = useState([]);
  const [paginationData, setPaginationData] = useState(paginationDefaultData);
  const [campaginId , setCampaignId] = useState('');
  const [surveyName , setSurveyName] = useState('');
  const [popDataCount, setPopDataCount] = useState(0);
  const [updatePage, setUpdatePage] = useState(1);


  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config
  });

  const onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    setState({ tree: immutableTree, config: config });

    const jsonTree = QbUtils.getTree(immutableTree);

    let temp = paginationData;
    temp.sqlCondition = QbUtils.sqlFormat(immutableTree, config);
    setPaginationData({...temp});
    // console.log(JSON.stringify(QbUtils.sqlFormat(immutableTree, config)));
   
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };

  const renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );


  const getData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    ajax
      .post(`${SERVICE_BASE_URL}v1/survey-data-pagination`, paginationData, config)
      .then((res) => {
        // console.log(res.data);
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
    ajax
      .post(`${SERVICE_BASE_URL}v1/get-survey-count`, paginationData, config)
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

  const downloadCsv = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    ajax
      .post(`${SERVICE_BASE_URL}v1/survey-download`, paginationData, config)
      .then((res) => {
          console.log(res.data)
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'tct_population_assocaiton.csv'); //or any other extension
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

  const setCampaignIdToPopulationCall = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    const tempData = {...paginationData}
    tempData.campaignId = campaginId
    tempData.surveyName = surveyName
    ajax
      .post(`${SERVICE_BASE_URL}v1/set-survey-population-campaign`, tempData, config)
      .then((res) => {
        setUpdatePage(updatePage+1)
        message.success('survey opened')
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const checkNullOrUndefined = (data) => {
    return (data[0]) ? data[0] : [];
  }

  const downloadFile = () => {
    downloadCsv();
  }

  const setCampaignIdToPopulation = () =>{
    if(paginationData.sqlCondition == '' || paginationData.sqlCondition == undefined){
      message.warn('filter something')
      return
    }
    if(campaginId == '' || campaginId == undefined){
      message.warn('add campaign id')
      return
    }
    if(surveyName == '' || surveyName == undefined){
      message.warn('add survey name')
      return
    }
    setCampaignIdToPopulationCall()

  }

  useEffect(() => {
    getData();
    getDataCount();
  }, [paginationData])

  useEffect(() => {
    setCampaignId('')
    setSurveyName('')
    getData();
    getDataCount();
  }, [updatePage])

  return (

    <div className="query-builder-parent-wrapper">

      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-builder-result">
        {/* <div>
          Query string:{" "}
          <pre>
            {JSON.stringify(QbUtils.queryString(state.tree, state.config))}
          </pre>
        </div> */}
        {/* <div>
          MongoDb query:{" "}
          <pre>
            {JSON.stringify(QbUtils.mongodbFormat(state.tree, state.config))}
          </pre>
        </div> */}
        {/* <div>
          SQL where:{" "}
          <pre>
            {JSON.stringify(QbUtils.sqlFormat(state.tree, state.config))}
          </pre>
        </div> */}
        {/* <div>
          JsonLogic:{" "}
          <pre>
            {JSON.stringify(QbUtils.jsonLogicFormat(state.tree, state.config))}
          </pre>
        </div> */}
      </div>

        <br/>
      <Row>
        <Col span={20}>
        <TextField
                    style={{ marginRight: '20px' }}
                    error={false}
                    id="standard-basic"
                    label="Enter Survey Name"
                    value={surveyName}
                    variant="outlined"
                    onChange={(e) => {setSurveyName(e.target.value)}}
          />

        
        <TextField
                    error={false}
                    id="standard-basic"
                    label="Enter Campagin Id"
                    value={campaginId}
                    variant="outlined"
                    onChange={(e) => {setCampaignId(e.target.value)}}
          />

          <Button style={{ marginLeft: '20px' }} variant="contained" onClick={() => { setCampaignIdToPopulation() }}>
                SUBMIT
          </Button>
        </Col>
       
      </Row>

      <br/>
      <Paper>
        <Row>
        <Col span={14}>
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
          <Col span={10}>
        
            <Button   
            className="download-csv" 
            style={{ marginRight: '20px' , float :'right' }} 
            variant="contained" 
            onClick = {()=> {downloadFile()}}
            >
              <CloudDownloadIcon/>
            </Button>
          </Col>


        </Row>
        <TableContainer >
          <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
            <TableHead id='question-table-head'>
              <TableRow>
                {((popData) !== null) && ((popData) !== undefined) && (popData).length > 0 &&
                  Object.keys(checkNullOrUndefined((popData))).map((e, i) => (
                    <TableCell id='question-table-header' key={i} align="left">{_.startCase(e)}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>

            <TableBody>
              {((popData) !== null) && ((popData) !== undefined) && (popData).length > 0 &&
                (popData).map((row, index) => (
                  <TableRow

                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {popData.length > 0 &&
                      Object.values(row).map((e, i) => (
                        <TableCell key={i} align="left">{e}</TableCell>
                      ))
                    }

                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </div>

  )
}

export default AssociatePopulationSection;