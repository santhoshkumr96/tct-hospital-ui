
import { useEffect, useState, useContext } from 'react';
import { CAMPAIGNS_SECTION, POPULATION_SECTION, QUESTIONNAIRE_SECTION, ROLE_ADMIN, TOKEN_EXPIRED, ADD_USER_SECTION } from '../../config';
import Context from '../Login/LoginAuthProvider/Context';
import ajax from '../../Helpers/ajaxHelper';
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StorageIcon from '@mui/icons-material/Storage';
import QuestionSection from '../QuestionPage/QuestionSection';
import CampainSection from '../CampainPage/CampainSection';
import AssociatePopulationSection from '../AssociatePopulation/AssociatePopulationSection';
import ErrorContext from '../NetworkAuthProvider/ErrorContext';
import 'antd/dist/antd.css';
import './Home.scss'
import { Layout, Menu, Typography } from 'antd';
import Button from '@mui/material/Button';
import React from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import AddUserSeciton from '../AddUserPage/AddUserSection';
const { Header, Sider, Content } = Layout;
const { Paragraph } = Typography;




const HomePage = () => {

    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [data, setData] = useState('');
    const [open, setOpen] = useState(false);
    const [section, setSection] = useState(CAMPAIGNS_SECTION);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searched, setSearched] = useState('');
    const [collapsed, setCollapsed] = useState(true);


    const toggle = () => {
        setCollapsed(!collapsed);
    };


    const logout = () => {
        loginContext.setUserId('');
        loginContext.setUserRole([]);
        loginContext.setAccessToken('');
        loginContext.setTokenExpired(false);
    }

    const getData = () => {
        const config = {
            headers: { Authorization: `Bearer ${loginContext.accessToken}` }
        };
        ajax
            .post('http://localhost:8080/ap/admin', {}, config)
            .then((res) => {
                setData(res.data);
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

    const selectPage = (sectionName) => {
        handleClose();
        setSection(sectionName);
    }

    useEffect(() => {

    }, [])

    return (

        <Layout className="home-page-layout">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                {/* TCT</div> */}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item onClick={(e) => { selectPage(CAMPAIGNS_SECTION) }} key="1" icon={<FileCopyIcon />}>
                        Campaign
                    </Menu.Item>
                    <Menu.Item  onClick={(e) => { selectPage(QUESTIONNAIRE_SECTION) }} key="2" icon={<QuestionAnswerIcon />}>
                        Questionarre
                    </Menu.Item>
                    <Menu.Item  onClick={(e) => { selectPage(POPULATION_SECTION) }} key="3" icon={<StorageIcon />}>
                        Associate Population
                    </Menu.Item>
                    {loginContext.userRole.toString() === ROLE_ADMIN &&
                        <Menu.Item  onClick={(e) => { selectPage(ADD_USER_SECTION) }} key="4" icon={<StorageIcon />}>
                            Add User
                        </Menu.Item>
                    }
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                    <Button color="inherit"> {loginContext.userId}  | {loginContext.userRole.toString().toLowerCase()}</Button>
                    <Button className="logout" onClick={() => { logout() }} color="inherit">Logout</Button>
                </Header>
                <Content
                    className="site-layout-background-scroll"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        
                    }}
                >
                    <div>
                        {section == QUESTIONNAIRE_SECTION && <QuestionSection />}
                        {section == CAMPAIGNS_SECTION && <CampainSection />}
                        {section == POPULATION_SECTION && <AssociatePopulationSection />}
                        {section == ADD_USER_SECTION && <AddUserSeciton />}
                        {/* <Box sx={{ position: 'fixed', height: '100%', bottom: '0px', right: '0px', transform: "translateZ(0px)", flexGrow: 1 }}>
                            <Backdrop open={open} />
                            <SpeedDial
                                ariaLabel="Section Selection"
                                sx={{ position: "absolute", bottom: 16, right: 16 }}
                                icon={<MenuIcon />}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                open={open}
                            >
                                {actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        tooltipOpen
                                        onClick={(e) => { selectPage(action.name) }}
                                    />
                                ))}
                            </SpeedDial>
                        </Box> */}
                    </div>
                </Content>
            </Layout>
        </Layout>


    )
}

export default HomePage;