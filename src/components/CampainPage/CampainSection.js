
import { useContext, useState } from 'react';
import Context from '../Login/LoginAuthProvider/Context';
import { QUESTION_CREATOR_ROLE } from '../../config';
import { Button } from '@mui/material';
import './Campain.css'
import CreateCampain from './CreateCampain';




const CampainSection = () => {

    const loginContext = useContext(Context);
    const [createCampainBool , setCreateCampainBool] = useState(false);

    const onCreateCampign = () =>{
       setCreateCampainBool(true);
    }

    const onCancelCampign = () =>{
        setCreateCampainBool(false);
     }

    return (
        <div id='campaign-main-div'>
            {loginContext.userRole.includes(QUESTION_CREATOR_ROLE)  &&
                createCampainBool === false && 
                <div id='campaign-search-create'>

                    <Button variant="contained" onClick={() => { onCreateCampign() }}>
                        Create Campain
                    </Button>
                    <Button id='campain-search-create-button' disabled variant="contained" onClick={() => { onCreateCampign() }}>
                        Create Campain from existing
                    </Button>
                </div>
            }
            {
                createCampainBool === true && 
                <CreateCampain onCancelCampain={onCancelCampign}/>
            }
        </div>
    )
}

export default CampainSection;