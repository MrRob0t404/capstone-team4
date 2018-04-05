import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

import IssuesFeed from './IssuesFeed'
import NewIssue from './NewIssue'
import ChooseFiles from './ChooseFiles'
import CodeEditor from '../CodeEditor/CodeReview'
import SoloEditor from '../CodeEditor/SoloEditor'
import SolutionRouter from '../CodeEditor/SolutionRouter'

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
      decodedCodeArr: [],
      count: 1, 
      formCompleteFile: false
    }
  }

  renderIssuesFeed = () => {
    return (<IssuesFeed/>)
  }

  inputHandler = e => this.setState({
    [e.target.name]: e.target.value
  })

  renderNextPage = () => {
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

  //tied to onFormSubmit in NewIssue.js
  renderNextPageFileUpload = (file, fileNames) => {
    let {title, language} = this.state
    if (!title) {
      this.setState({message: 'Please fill all input feilds'})
      return
    }
    this.setState({
      formCompleteFile: true,
      selectedFileNames: fileNames,
      decodedCodeObj: file
    })
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
      console.log("this.getDecodedData(filePath)", this.getDecodedData(filePath))
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
    const {user, loading, renderNextPageFileUpload } = this.props;
    const {selectedFileNames, repoOwner, repositoryLink, repositoryName, count, formCompleteFile} = this.state;
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
    } else if (formCompleteFile) {
        return this.renderSoloEditor()
    } else {
      return (<NewIssue
        inputHandler={this.inputHandler}
        clickHandler={this.renderNextPage}
        message={this.state.message}
        renderNextPageFileUpload={this.renderNextPageFileUpload}/>)
    }
  }

  // Need to pass to soloEditor to fix bug (when user presses the back buttton and
  // then goes forward in history)
  setFormBoolean = () => {
    this.setState({formComplete: false})
  }

  renderSolutions = () => {
    return (<CodeEditor count ={this.state.count}/>)
  }

  renderSoloEditor = () => {
    if (this.state.selectedFileNames.length === 0) {
      this.setState({formComplete: false})
      return <Redirect to='/home'/>
    } else {
      return (<SoloEditor
        title={this.state.title}
        selectedFilesNames={this.state.selectedFileNames}
        decodedContentObj={this.state.decodedCodeObj}
        formCompleteToFalse={this.setFormBoolean}/>)
    }
  }

  renderSolutionsRouter = (props) => {

    const {user} = this.props;
    console.log(`user`, this.props)
    return (<SolutionRouter props={props} user={user}/>)
  }

  render() {
    return (
      <div id="issue-router">
        <Switch>
          <Route exact path="/issues" component={this.renderIssuesFeed}/>
          <Route path="/issues/new/edit" render={this.renderSoloEditor}/>
          <Route path="/issues/new" render={this.openIssue}/>
          <Route path="/issues/:issuesID" render={this.renderSolutionsRouter}/>
        </Switch>
      </div>
    )
  }
}

export default IssueRouter
