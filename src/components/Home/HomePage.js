
import { useEffect, useState, useContext } from 'react';
import { CAMPAIGNS_SECTION, POPULATION_SECTION, QUESTIONNAIRE_SECTION, TOKEN_EXPIRED } from '../../config';
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


  

const HomePage = () => {

    const actions = [
        { icon: <FileCopyIcon />, name: CAMPAIGNS_SECTION },
        { icon: <QuestionAnswerIcon />, name: QUESTIONNAIRE_SECTION },
        { icon: <StorageIcon />, name: POPULATION_SECTION }
      ];

    const loginContext = useContext(Context);
    const errorContext = useContext(ErrorContext);
    const [data, setData] = useState('');
    const [open, setOpen] = useState(false);
    const [section , setSection] = useState(CAMPAIGNS_SECTION);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searched, setSearched] = useState('');




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
        <div>
            { section ==  QUESTIONNAIRE_SECTION && <QuestionSection/> }
            { section ==  CAMPAIGNS_SECTION && <CampainSection/> }
            { section ==  POPULATION_SECTION && <AssociatePopulationSection/> }
            <Box sx={{ position:'fixed' , height:'100%' , bottom : '0px' , right : '0px', transform: "translateZ(0px)", flexGrow: 1 }}>
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
                            onClick={(e)=> {selectPage(action.name)}}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </div>
    )
}

export default HomePage;