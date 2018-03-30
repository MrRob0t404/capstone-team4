import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import CodeEditor from '../CodeEditor/CodeReview'
import AddSolution from '../CodeEditor/AddSolution'

class SolutionRouter extends Component {
  constructor() {
    super();
    this.state = {
    }
  }


  renderSolutions = () => {
    return (<CodeEditor/>)
  }

  renderAddSolution = (props) => {
    console.log('renderSolutionsProps', props)
    return(
      <AddSolution />
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
