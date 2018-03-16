import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';

import DataRouting from './components/DataRouting';

const App = () => (
  <div>
    <nav>
      <Link to='/issues'>Home</Link>
      {" "}
      <Link to='/profile'>Profile</Link>
      {" "}
      <Link to='/help'>Help</Link>
      {" "}
    </nav>

    <Switch>
      <Route exact path='/' component={DataRouting}/>
      <Route exact path='/issues' component={DataRouting}/>
      <Route exact path='/profile ' component={DataRouting}/>
      <Route exact path='/help' component={DataRouting}/>
    </Switch>
  </div>
)

export default App;