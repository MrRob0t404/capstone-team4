import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

import AllIssues from './AllIssues'
import NewIssue from './NewIssue'
import SolvedIssues from './solvedIssues'
import OpenIssues from './openIssues'
import ChooseFiles from './ChooseFiles'
import CodeEditor from '../CodeEditor/CodeReview'
import SoloEditor from '../CodeEditor/SoloEditor'
import '../../.././CSS/OpenIssue.css';

const URL_COMPONENT_USER = Symbol("name");
const URL_COMPONENT_REPO = Symbol("repo");

function urlSplitHelper(url, component) {
  const [,,
    user,
    repo] = /^(https:\/\/)?github.com\/([A-Za-z_\-][A-Za-z_\-0-9]+)\/([A-Za-z_\-][A-Za-z_\-0-9]+)/.exec(url);
  // console.log(user, repo);
  switch (component) {
    case URL_COMPONENT_USER:
      return user;
      break;
    case URL_COMPONENT_REPO:
      return repo;
      break;
    default:
      throw new Error("Unreacheable");
  }
}

class IssueRouter extends Component {
  constructor() {
    super();
    this.state = {
      formComplete: false,
      name: '',
      title: '',
      repositoryLink: '',
      language: '',
      message: 'Please fill all input feilds',
      selectedFileNames: [],
      encodedContent: ''
    }
  }

  handleOpenIssues = () => {
    return (<OpenIssues/>)
  }

  handleAllIssues = () => {
    return (<AllIssues/>)
  }

  handleSolvedIssues = () => {
    return (<SolvedIssues/>)
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
      repositoryName: urlSplitHelper(this.state.repositoryLink, URL_COMPONENT_REPO),
      repoOwner: urlSplitHelper(this.state.repositoryLink, URL_COMPONENT_USER)
    })
    this.decode;
  }

  selectFile = e => {
    let target = e.target
    let selectedFileNames = this.state.selectedFileNames;
    if (selectedFileNames.indexOf(target.innerText) >= 0) {
      selectedFileNames.splice(selectedFileNames.indexOf(target.innerText), 1)
      this.setState({selectedFileNames: selectedFileNames})
    } else {
      selectedFileNames.push(target.innerText)
      this.setState({selectedFileNames: selectedFileNames})
    }
  }

  handleClick = () => {
    const {selectedFileNames} = this.state

    selectedFileNames.map(ele => {
      axios
        .get(`https://api.github.com/repos/simongaviria1/capstone-team4/contents/${ele}`)
        .then(res => {
          // console.log('encoded content', res.data.content)
          this.decode(res.data.content)
        })
    })

  }

  decode = (e) => {
    console.log(true)
    this.setState({
      decodedText: window.atob(e)
    })
  }

  openIssue = () => {
    const {user, loading} = this.props;
    const {selectedFileNames, repoOwner, repositoryLink, repositoryName} = this.state;
    // console.log("open issue") console.log("user, loading: ", user)
    if (loading) {
      return <div>Loading User...</div>
    } else if (!user) {
      return <Redirect to='/login'/>
    }
    if (this.state.formComplete) {
      // return (<SoloEditor decodedContent={this.state.decodedContent}/>)
      return (<ChooseFiles
        repositoryName={repositoryName}
        repoOwner={repoOwner}
        handleClick={this.handleClick}
        selectFile={this.selectFile}
        selectedFileNames={selectedFileNames}/>)
    } else {
      return (<NewIssue
        inputHandler={this.inputHandler}
        clickHandler={this.renderNextPage}
        message={this.state.message}/>)
    }
  }

  renderSolutions = () => {
    return (<CodeEditor/>)
  }

  renderSoloEditor = () => {
    return (<SoloEditor decodedContent={this.state.decodedText}/>)
  }

  render() {
    console.log('issuesRouter State decoded :', this.state.decodedContent)
    return (
      <div id="issue-router">
        <Switch>
          <Route path="/issues/all" component={this.handleAllIssues}/>
          <Route path="/issues/open" component={this.handleOpenIssues}/>
          <Route path="/issues/solved" component={this.handleSolvedIssues}/>
          <Route path="/issues/new/edit" render={this.renderSoloEditor}/>
          <Route path="/issues/new" render={this.openIssue}/>
          <Route path="/issues/:issuesID" render={this.renderSolutions}/>
        </Switch>
      </div>
    )
  }
}

export default IssueRouter
