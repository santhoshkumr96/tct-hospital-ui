
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
import { Row, Col } from 'antd';
import { Button, Fab } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CSVLink, CSVDownload } from "react-csv";

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

// Choose your skin (ant/material/vanilla):
const InitialConfig = AntdConfig;


// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  fields: {
    block: {
      label: "block",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    form_no: {
      label: "Form No",
      type: "number",
      valueSources: ["value"],
      // fieldSettings: {
      //   min: 10,
      //   max: 100
      // },
      // preferWidgets: ["slider", "rangeslider"]
    },
    contact_person: {
      label: "Contact Person",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    // color: {
    //   label: "Color",
    //   type: "select",
    //   valueSources: ["value"],
    //   fieldSettings: {
    //     listValues: [
    //       { value: "yellow", title: "Yellow" },
    //       { value: "green", title: "Green" },
    //       { value: "orange", title: "Orange" }
    //     ]
    //   }
    // }
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: "group" };



const AssociatePopulationSection = () => {

  const paginationDefaultData = {
    numberOfRows: 10,
    pageNumber: 0,
    sqlCondition : ''
  }

  const loginContext = useContext(Context);
  const errorContext = useContext(ErrorContext);
  const [popData, setPopData] = useState([]);
  const [paginationData, setPaginationData] = useState(paginationDefaultData);
  const [popDataCount, setPopDataCount] = useState(0);


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
      .post(`${SERVICE_BASE_URL}v1/population-data-pagination`, paginationData, config)
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
      .post(`${SERVICE_BASE_URL}v1/get-population-count`, paginationData, config)
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
      .post(`${SERVICE_BASE_URL}v1/download`, paginationData, config)
      .then((res) => {
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

  useEffect(() => {
    getData();
    getDataCount();
  }, [paginationData])

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

      <Paper>
        <Row>
        <Col span={14}>
            <TablePagination
              className="pagnation-div"
              rowsPerPageOptions={[10, 25, 100]}
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