import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import { PrivateRoute, PublicRoute } from './helpers/PrivateRoute';
import BoostrapComponent from './helpers/BoostrapComponent';

import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import LandingPage from './landing-page';
import About from './landing-page/aboutus';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/about-us" component={About} />

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
