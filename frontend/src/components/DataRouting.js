import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';

import LandingPage from './LandingPage';
import Profile from './Profile';
import Issues from './Issues';
import CodeReview from './CodeReview';

class DataRouting extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={LandingPage}/>
                    <Route exact path='/issues' component={Issues}/>
                    <Route exact path='/profile ' component={Profile}/>
                    <Route exact path='/help' component={CodeReview}/>
                </Switch>
            </div>
        )
    }
}

export default DataRouting;