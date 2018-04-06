import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import CodeEditor from '../CodeEditor/CodeReview'
import AddSolution from '../CodeEditor/AddSolution'

class SolutionRouter extends Component {
  constructor() {
    super();
    this.state = {
      problemData: [],
      solutionData: [],
      user: null,
    }
  }

  renderSolutions = (props) => {
    const { user, loading } = this.props;
    return (
      <CodeEditor
        props={props}
        user={user}
        loading={loading}
      />
    )
  }

  renderAddSolution = (props) => {
    const { user } = this.props;
    if(!user) {
      return <Redirect to='/login' />
    } 
    return(
      <AddSolution
        props={props}
       />
    )
  }


  render() {
    return (
      <div id="solution-router">
        <Switch>
          <Route path="/issues/:issuesID/solution/new" render={this.renderAddSolution}/>
          <Route path="/issues/:issuesID" render={this.renderSolutions}/>
        </Switch>
      </div>
    )
  }
}

export default SolutionRouter
