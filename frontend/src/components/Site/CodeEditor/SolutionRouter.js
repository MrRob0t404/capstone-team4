import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import CodeEditor from '../CodeEditor/CodeReview'
import AddSolution from '../CodeEditor/AddSolution'

class SolutionRouter extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    axios
      .get(`/users/getProblem/${this.props.props.match.params.issuesID}`)
      .then(res => {
        console.log('res.data', res.data)
      })
  }


  renderSolutions = (props) => {
    return (
      <CodeEditor
        props={props}
      />
    )
  }

  renderAddSolution = (props) => {
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
