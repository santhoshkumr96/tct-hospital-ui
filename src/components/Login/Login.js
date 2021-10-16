import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Context from './LoginAuthProvider/Context';
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { Button, LinearProgress, ButtonGroup, Box } from "@material-ui/core";
import './Login.scss'
import ajax from '../../Helpers/ajaxHelper';
import { LOGIN_URL } from '../../config';
import * as Yup from "yup";
import { Alert } from "@mui/material";
import { AlertTitle } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { errorHelper } from "../../Helpers/ajaxCatchBlockHelper";
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const loginContext = useContext(Context);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            // .email("please enter valid email")
            .required("enter username"),
        password: Yup.string().required("enter password")
    });

    let { from } = location.state || { from: { pathname: "/" } };
    let onSubmit = () => {
        // loginContext.setUserId('somethign');
        // history.replace(from);
        console.log(loginContext);
    };

    const login = async (values, { setSubmitting }) => {
        const requestBody = values;
        let { from } = location.state || { from: { pathname: "/" } };
        ajax
            .post(LOGIN_URL, requestBody)
            .then((res) => {
                loginContext.setUserId(res.data.username);
                loginContext.setUserRole(res.data.roles);
                loginContext.setAccessToken(res.data.accessToken);
                loginContext.setTokenExpired(false);
                history.replace(from);
            })
            .catch((e) => {
                setErrorMessage(errorHelper(e));
                setSubmitting(false);
                setError(true);
            })
    }

    return (
        <Row>
            <Col className='login-image-col' span={16}></Col>
            <Col className='login-from' span={5}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={login}
                    render={({ submitForm, isSubmitting, values }) => (
                        <Form noValidate>
                            <Field
                                type="text"
                                label="Username"
                                name="username"
                                variant="outlined"

                                fullWidth
                                component={TextField}
                            />

                            <br />
                            <br />

                            <Field
                                type="password"
                                label="Password"
                                name="password"
                                variant="outlined"
                                fullWidth
                                component={TextField}
                            />

                            <br />
                            <br />
                            <Box textAlign='center'>
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                    >
                                        Login
                                    </Button>
                                </ButtonGroup>
                            </Box>
                            <br />
                            <br />

                            {isSubmitting && <LinearProgress />}

                            {
                                isError &&
                                <Collapse in={isError}>
                                    <Alert
                                        severity="error"
                                        action={

                                            <Button
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    setError(false);
                                                }}
                                            >
                                                close
                                            </Button>
                                        }
                                        sx={{ mb: 2 }}
                                    >
                                        {errorMessage}
                                    </Alert>
                                </Collapse>
                            }


                        </Form>
                    )}
                />
            </Col>
            <Col span={3}></Col>
        </Row>
    );
}

export default Login;