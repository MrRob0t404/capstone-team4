import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import AllIssues from './AllIssues'
import NewIssue from './NewIssue'
import ChooseFiles from './ChooseFiles'
import CodeEditor from '../CodeEditor/CodeReview'
import '../../.././CSS/OpenIssue.css';

class IssueRouter extends Component {
  constructor() {
    super();
    this.state = {
      formComplete: false,
      name: '',
      title: '',
      repositoryLink: '',
      language: '',
      message: 'Please fill all input feilds'
    }
  }

  inputHandler = e => this.setState({
    [e.target.name]: e.target.value
  })

  renderNextPage = e => {
    let {title, repositoryLink, language} = this.state
    if (!title || !repositoryLink) {
      this.setState({message: 'Please fill all input feilds'})
      return
    }
    this.setState({
      formComplete: true,
      repositoryName: this
        .state
        .repositoryLink
        .split('/')[4],
    })
  }

  openIssue = () => {
    if (this.state.formComplete) {
      return (<ChooseFiles
        repositoryLink={this.state.repositoryLink}
        repositoryName={this.state.repositoryName}/>)
    } else {
      return (<NewIssue
        inputHandler={this.inputHandler}
        clickHandler={this.renderNextPage}
        message={this.state.message}/>)
    }
  }

  render() {
    console.log('issuesRouter State :', this.state)
    return (
      <div id="issue-router">
        <Switch>
          <Route exact path="/issues" component={AllIssues}/>
          <Route path="/issues/solution" component={CodeEditor}/>
          <Route path="/issues/issue" render={this.openIssue}/>
        </Switch>
      </div>
    )
  }
}

export default IssueRouter
