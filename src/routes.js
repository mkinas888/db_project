import React, { PureComponent } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import history from './history';
import MainPage from './components/MainPage/MainPage';
import Login from './components/LoginPage/Login';
import Steps from './components/Steps/Steps';
import UserProfile from './components/UserProfile/UserProfile';

class DBRouter extends PureComponent {

  constructor(props) {
    super(props);
    this.props = props;
}

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/profile' component={UserProfile} />
          <Route path='/steps' component={Steps} />
          <Route path='/main' component={MainPage} />
          <Route path='/login' component={Login} />
          <Route exact path='/' component={Login} />
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    );
  }
};

export default DBRouter;
