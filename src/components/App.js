import { hot } from 'react-hot-loader/root';
import './App.css';
import LoginContextProvider from './Login/LoginAuthProvider/Provider'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './Login/Login';
import { BASE_PATH, HOME_PATH, LOGIN_PATH } from '../config';
import PrivateRoute from './Login/PrivateRoute/PrivateRoute';
import NetworkContextProvider from './NetworkAuthProvider/Provider'
import ToggleContextProvider from './PreTogglesProvider/Provider' 
import Home from './Home/Home';

function App() {
  return (
    <NetworkContextProvider>
      <LoginContextProvider>
        <ToggleContextProvider>
        <Router>
          <Switch>
            <Route path={LOGIN_PATH} component={Login} />
            <PrivateRoute path={HOME_PATH}>
              <Home />
            </PrivateRoute>
          </Switch>
        </Router>
        </ToggleContextProvider>
      </LoginContextProvider>
    </NetworkContextProvider>
  );
}

export default hot(App);
