import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AllIssues from './AllIssues'
import NewIssue from './NewIssue'
import SolvedIssues from './solvedIssues'
import OpenIssues from './openIssues'
import ChooseFiles from './ChooseFiles'
import CodeEditor from '../CodeEditor/CodeReview'
import '../../.././CSS/OpenIssue.css';

class IssueRouter extends Component {
  constructor(){
    super();
    this.state = {
      formComplete: false,
      name: '',
      title: '',
      repository: '',
      language: '',
      message: 'Please fill all input feilds'
    }
  }

  handleOpenIssues = () => {
    return (
      <OpenIssues />
    )
  }


  handleAllIssues = () => {
    return (
      <AllIssues />
    )
  }


  handleSolvedIssues = () => {
    return (
      <SolvedIssues />
    )
  }

  inputHandler = e => this.setState({[e.target.name]: e.target.value})

  renderNextPage = e => {
    let {title, repository, language} = this.state
    // if(!title || !repository || !language){
    //   this.setState({message: 'Please fill all input feilds'})
    //   return
    // }
    this.setState({formComplete: true})
  }


  openIssue = () => {
  const { user, loading } = this.props;
  console.log("open issue")
  console.log("user, loading: ", user)
  if(loading) {
    return <div>Loading User...</div>
  } else if (!user) {
    return <Redirect to='/login' />
  }
    if(this.state.formComplete) {
      return (
        <ChooseFiles />
      )
    }else{
      return(
        <NewIssue
          inputHandler={this.inputHandler}
          clickHandler={this.renderNextPage}
          message={this.state.message}
        />
      )
    }
  }

  render(){
    return(
      <div id="issue-router">
        <Switch>
          <Route exact path="/issues/all" component={this.handleAllIssues}/>
          <Route exact path="/issues/open" component={this.handleOpenIssues}/>
          <Route exact path="/issues/solved" component={this.handleSolvedIssues}/>
          <Route exact path="/issues/new" render={this.openIssue}/>
          <Route path="/issues/:issuesID" component={CodeEditor}/>
        </Switch>
      </div>
    )
  }
}

export default IssueRouter
