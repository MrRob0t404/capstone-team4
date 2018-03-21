import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Auth from './components/Site/LoginPage/AuthUser';
import DataRouter from './components/Site/DataRouter';

const App = () => (
  <div>
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' component={DataRouter} />
    </Switch>
  </div>
)

export default App;
