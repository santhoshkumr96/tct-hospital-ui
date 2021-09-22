import { useContext } from 'react';
import Context from '../Login/LoginAuthProvider/Context';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ajax from '../../Helpers/ajaxHelper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';
import { TOKEN_EXPIRED } from '../../config';
import HomePage from './HomePage';


const Home = () => {
    const loginContext = useContext(Context);
    const logout = () => {
        loginContext.setUserId('');
        loginContext.setUserRole([]);
        loginContext.setAccessToken('');
        loginContext.setTokenExpired(false);
    }

    const handleDialogClose = () => {
        logout();
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
                        <Button onClick={() => { logout() }} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <HomePage />
            <Dialog
                open={loginContext.tokenExpired}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Session Expired"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        please login in again to continue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} autoFocus>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Home;