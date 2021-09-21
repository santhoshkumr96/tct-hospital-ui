import { useContext } from 'react';
import Context from '../Login/LoginAuthProvider/Context';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';


const Home = () => {
    const loginContext = useContext(Context);
    const logout = () => {
        loginContext.setUserId('');
        loginContext.setUserRole([]);
        loginContext.setAccessToken('');
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            UserName : {loginContext.userId}  | Roles : {loginContext.userRole.toString().toLowerCase()}
                        </Typography>
                        <Button onClick={()=>{logout()}} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <p>home page</p>

        </div>
    )
}

export default Home;