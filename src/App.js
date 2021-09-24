import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { PrivateRoute, PublicRoute } from './helpers/PrivateRoute';
import BoostrapComponent from './helpers/BoostrapComponent';

import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PublicRoute path="/login" component={BoostrapComponent(Login)} />
          <PublicRoute path="/signup" component={BoostrapComponent(Signup)} />
          <PublicRoute
            path="/forgot-password"
            component={BoostrapComponent(ForgotPassword)}
          />

          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
