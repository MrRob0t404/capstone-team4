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
      encodedContent: '',
      decodedCodeArr: []
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
    let path = e.target.dataset.path
    let selectedFileNames = this.state.selectedFileNames;
    if (selectedFileNames.indexOf(path) >= 0) {
      selectedFileNames.splice(selectedFileNames.indexOf(path), 1)
      this.setState({selectedFileNames: selectedFileNames})
    } else {
      selectedFileNames.push(path)
      this.setState({selectedFileNames: selectedFileNames})
    }
  }

  getDecodedData = (filePath) => {
    const {repoOwner, repositoryName} = this.state
    return axios.get(`https://api.github.com/repos/${repoOwner}/${repositoryName}/contents/${filePath}`)
  }

  // Iterates through file paths, decodes them, and adds decoded text to an
  // decodedCodeArr
  handleClick = () => {
    const {selectedFileNames} = this.state //an arr of file paths

    const getEncodedContent = selectedFileNames.map(filePath => {
      return (this.getDecodedData(filePath))
    })

    Promise
      .all(getEncodedContent)
      .then(responses => {
        const decodedCodeObj = {}
        responses.forEach(responseObj => {
          decodedCodeObj[responseObj.data.path] = this.decode(responseObj.data.content)
        }) //An array of axios calls (obj)

        this.setState({decodedCodeObj: decodedCodeObj}) //sets state with array of responses
      })
      .catch(err => {
        console.log('error getting encoded content: ', err)
      })
  }

  //Decodes 64bit encoded response from github
  decode = (e) => {
    return window.atob(e)
  }

  openIssue = () => {
    const {user, loading} = this.props;
    const {selectedFileNames, repoOwner, repositoryLink, repositoryName} = this.state;
    if (loading) {
      return <div>Loading User...</div>
    } else if (!user) {
      return <Redirect to='/login'/>
    }
    if (this.state.formComplete) {
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
    return (<SoloEditor
      selectedFilesNames={this.state.selectedFileNames}
      decodedContentObj={this.state.decodedCodeObj}/>)
  }

  render() {
    console.log('issuesRouter State decoded name:', this.state.repoOwner)
    // console.log('selectedFiles:', this.state.selectedFileNames)
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
