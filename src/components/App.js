import { hot } from 'react-hot-loader/root';
import './App.css';
import LoginContextProvider from './Login/LoginAuthProvider/Provider'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './Login/Login';
import { BASE_PATH, HOME_PATH, LOGIN_PATH, SURVEY_PATH } from '../config';
import PrivateRoute from './Login/PrivateRoute/PrivateRoute';
import NetworkContextProvider from './NetworkAuthProvider/Provider'
import ToggleContextProvider from './PreTogglesProvider/Provider' 
import Home from './Home/Home';
import SurveyTakeSeciton from './SurveyPage/TakeSurveyForPerson/SurveyTakeSection';

function App() {
  return (
    <NetworkContextProvider>
      <LoginContextProvider>
        <Router>
          <Switch>
            <Route path={SURVEY_PATH} render={(props) => <SurveyTakeSeciton {...props} />} />
            <Route path={LOGIN_PATH} component={Login} />
            <PrivateRoute path={HOME_PATH}>
              <ToggleContextProvider>
                <Home />
              </ToggleContextProvider>
            </PrivateRoute>
          </Switch>
        </Router>
      </LoginContextProvider>
    </NetworkContextProvider>
  );
}

export default hot(App);
