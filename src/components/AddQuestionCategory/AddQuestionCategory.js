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

const AddQuestionCategory = () => {

  const loginContext = useContext(Context);
  const errorContext = useContext(ErrorContext);
  const toggleContext = useContext(ToggleContext);
  const [questionCategorys, setQuestionCategorys] = useState([])
  const [questionCategory, setQuestionCategory] = useState('')

  const onQuestionCategoryEntry = (textInput) => {
    setQuestionCategory(textInput)
  }

  const onUserCreateQuesCategoryPress = () => {
    if(questionCategory === ''){
      message.warn('please fill question category')
      return 
    }
    createQuestionCategory(questionCategory,loginContext.userId)
  }

  const getQuestionCategory = async () => {
    const config = {
        headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    ajax
        .get(`${SERVICE_BASE_URL}v1/getAllQuestionCategoryList`,config)
        .then((res) => {
          setQuestionCategorys(res.data)
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

  const createQuestionCategory = async (questionCategory, user) => {
      const config = {
          headers: { Authorization: `Bearer ${loginContext.accessToken}` }
      };
      ajax
          .post(`${SERVICE_BASE_URL}v1/insertQuestionCategory`, { questionCategory, user }, config)
          .then((res) => {
            message.success('Question Category Inserted')
            setQuestionCategory('')
            getQuestionCategory();
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

  useEffect(() => {
    getQuestionCategory();
  }, [])

  return (

    <div className="add-user-wrapper-wrapper">

      <TextField
        disabled={false}
        error={false}
        helperText={""}
        fullWidth
        id="standard-basic"
        label="Enter Question Category"
        variant="outlined"
        value={questionCategory}
        onChange={(e) => { onQuestionCategoryEntry(e.target.value) }}
      />

      <br />
      <br />
        <Button style={{ float: "right" }} variant="contained"  onClick={() => onUserCreateQuesCategoryPress()} >
          submit
        </Button>
      <br />
      <br />
      <br />

      <TableContainer >
        <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
          <TableHead id='question-table-head'>
            <TableRow>
                  <TableCell id='question-table-header' align="left">S No</TableCell>
                  <TableCell id='question-table-header' align="left">Question Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                questionCategorys.map((row, index) => (
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">{index+1}</TableCell>
                      <TableCell align="left">{row.categoryDesc}</TableCell>
                    </TableRow>
                ))
              }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    // <div className="add-user-wrapper-wrapper">
    // <TextField
    //   disabled={false}
    //   error={isUserNameExist}
    //   helperText={isUserNameExist?"user name taken": ""}
    //   fullWidth
    //   id="standard-basic"
    //   label="Enter Usernsame"
    //   variant="outlined"
    //   value={userName}
    //   onChange={(e) => { onUserNameEntry(e.target.value) }}
    // />
    // <br />
    // <br />
    // <TextField
    //   disabled={false}
    //   error={!isPasswordValid}
    //   helperText={!isPasswordValid?"atlease 8 character": ""}
    //   fullWidth
    //   id="standard-basic"
    //   label="Enter Password"
    //   variant="outlined"
    //   value={password}
    //   onChange={(e) => { onPasswordEntry(e.target.value) }}
    // />
    // <br />
    // <br />
    // <FormControl fullWidth>
    //     <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
    //     <Select
    //         disabled={false}
    //         error={false}
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={selectedRole}
    //         label="Response Type"
    //         onChange={onRoleSelection}
    //     >
    //         {roles.map((e)=>(
    //               <MenuItem value={e}>{e.name}</MenuItem>
    //         ))}
    //     </Select>
    // </FormControl>

    // <br />
    // <br />
    // <Button style={{ float: "right" }} variant="contained"  onClick={() => onUserCreateButtonPress()} >
    //   submit
    // </Button>
    // <br />
    // <br />
    // <br />

    // <TableContainer >
    //   <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
    //     <TableHead id='question-table-head'>
    //       <TableRow>
    //             <TableCell id='question-table-header' align="left">S No</TableCell>
    //             <TableCell id='question-table-header' align="left">UserName</TableCell>
    //             <TableCell id='question-table-header' align="left">Role</TableCell>
    //             <TableCell id='question-table-header' align="left">Password</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //         {
    //           userList.map((row, index) => (
    //               <TableRow
    //               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //               >
    //                 <TableCell align="left">{index+1}</TableCell>
    //                 <TableCell align="left">{row.username}</TableCell>
    //                 <TableCell align="left">{row.role}</TableCell>
    //                 <TableCell align="left">{row.password}</TableCell>
    //               </TableRow>
    //           ))
    //         }
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    //
    // </div>

  )
}

export default AddQuestionCategory;