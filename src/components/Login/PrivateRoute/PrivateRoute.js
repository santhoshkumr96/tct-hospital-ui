import { useContext } from 'react';
import Context from '../LoginAuthProvider/Context';
import { Route ,Redirect} from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const loginContext = useContext(Context);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          loginContext.userId ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;
  