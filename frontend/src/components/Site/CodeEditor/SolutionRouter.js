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
      solutionData: []
    }
  }

  componentDidMount(){
    axios
      .get(`/users/getProblem/${this.props.props.match.params.issuesID}`)
      .then(res => {
        this.setState({problemData: res.data})
      })

    axios
      .get(`/users/getSolutions/${this.props.props.match.params.issuesID}`)
      .then(res => {
        this.setState({solutionData: res.data})
      })
  }


  renderSolutions = (props) => {
    return (
      <CodeEditor
        props={props}
        problemData={this.state.problemData}
        solutionData={this.state.solutionData}
      />
    )
  }

  renderAddSolution = (props) => {
    return(
      <AddSolution />
    )
  }


  render() {
    console.log(this.state.data)
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
