import React from "react";
import { Link, Redirect } from "react-router-dom";
import AceDiff from "ace-diff";
import "../../../CSS/AceEditor.css";
import "../../../CSS/EditorPages.css";
import axios from 'axios';
import brace from 'brace';
import './Import/import'
import 'brace/theme/solarized_dark';
import { Base64 } from 'js-base64';
import { getModeForPath } from '../../../lib/modelist';


var disqus_config = function () {
  this.page.url = "https://test.tyrodev.com/issues";
  this.page.identifier = window.location.pathname;
}

class AddSolution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      title: '',
      description: '',
      response: '',
      originalCode: {},
      solutionCode: {},
      currentFile: '',
      date: '',
      renderDescription: true,
      renderEditor: true,
      message: '',
      submitted: false
    }
    this.aceDiffer = undefined;
  }

  componentDidMount() {
    console.log(this.props.props.match.params.issuesID)
    axios
      .get(`/users/getProblem/${this.props.props.match.params.issuesID}`)
      .then(res => {
        let title = res.data.data[0].title
        let description = res.data.data[0].problem_description
        let date = res.data.data[0].ticketdate
        let currentFile = res.data.data[0].filename
        let originalCode = {}
        const { solutionCode } = this.state;
        res.data.data.forEach((v, i) => {
          originalCode[v.filename] = Base64.decode(v.code)
          solutionCode[v.filename] = Base64.decode(v.code)
        })

        this.setState({
          files: res.data.data,
          originalCode,
          currentFile,
          date,
          description,
          solutionCode,
          title
        })
        console.log('RESPONSE', res.data.data)
      })
  }


  renderAceEditor = () => {

    const { rightEditor } = this.state

    this.setState({ renderEditor: false })
    console.log("render ace editor")
    // This object creates the split editor and imports it in the element with className ".acediff"
    var aceDiffer = this.aceDiffer = new AceDiff({
      mode: null,
      theme: null,
      element: ".acediff",
      diffGranularity: 'broad',
      showDiffs: true,
      showConnectors: true,
      maxDiffs: 5000,
      left: {
        content: this.state.originalCode[this.state.currentFile] || '',
        mode: 'null',
        theme: null,
        editable: false,
        copyLinkEnabled: true
      },
      right: {
        content: this.state.solutionCode[this.state.currentFile] || this.state.originalCode[this.state.currentFile] || '',
        mode: null,
        theme: null,
        editable: true,
        copyLinkEnabled: true
      },
      classes: {
        diff: 'acediff__diffLine',
        connector: 'acediff__connector',
        newCodeConnectorLinkContent: '&#8594;',
        deletedCodeConnectorLinkContent: '&#8592;'
      }
    });

    // const that = this;
    // This function tracks the changes made to the right side of the editor and
    // updates the state
    aceDiffer
      .getEditors()
      .right
      .on("change", () => {
        console.log("============\n\n")
        console.log("acediffer onChange - currentFile: ", this.state.currentFile)
        // console.log("current file: ", this.state.currentFile)
        // console.log("state solution: ", this.state.solutionCode);
        const newValue = aceDiffer.getEditors().right.getValue()
        // console.log("newvalue: ", newValue)
        // console.log("acediffer change. solutionCode: ", solutionCode)
        this.setState({
          solutionCode: {
            ...this.state.solutionCode,
            [this.state.currentFile]: newValue
          }
        })
      })
  }

  renderDescription = () => (
    <div>
      <div>
        <h3>Description</h3>
        <p>{this.state.description}</p>
      </div>
    </div>
  )


  handleSolutionButton = () => {
    let d = new Date();
    const { files, response, solutionCode } = this.state;

    let arrOfCodes = Object //Creates an array of objects
    .keys(solutionCode)
    .map((key) => {
      console.log('KEY', key)
      return {
        "code": Base64.encode(solutionCode[key]),
        "filename": key,
        "language": getModeForPath(key).name
      }
    })
    console.log(`arrofcodes`, arrOfCodes)
    if (!response) {
      this.setState({
        message: 'Please describe your issue'
      })
    } else {
      axios
        .post('/users/submitSolution', {
          "ticketid": this.props.props.match.params.issuesID,
          "files": JSON.stringify(arrOfCodes),
          "postDate": (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(),
          "solution_desc": response
        })
        .then(res => {
          this.setState({
            submitted: true
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  handleTextArea = (e) => {
    const { response } = this.state;
    this.setState({
      response: e.target.value
    })
  }


  handleTabClick = e => {

    this.setState({
      currentFile: e.target.innerText,
      newTab: e.target.innerText
    });
  }

  switchTabs = () => {
    const {newTab} = this.state;
    let { left, right } = this.aceDiffer.getEditors();
    left.setValue(this.state.originalCode[newTab], -1);
    left.clearSelection()
    right.setValue(this.state.solutionCode[newTab] || this.state.originalCode[newTab], -1);
    right.clearSelection()
    this.setState({
      newTab: null
    })
  }

  render() {
    const { rightEditor, response, message, submitted, solutionCode, originalCode, files, currentFile } = this.state
    console.log("render addsolution: ", this.state.solutionCode)
    if (this.state.description && this.state.renderEditor) {
      this.renderAceEditor()
    }

    if (this.state.newTab){
      this.switchTabs();
    }
    if (submitted) {
      return <Redirect to='/issues' />
    }
    return (
      <div id="solution">
        <div id="file-tabs">
          {this.state.files.map((v, i) => <div className="tab" onClick={this.handleTabClick} name={v.filename}>{v.filename}</div>)}
        </div>
        <div id="editor-container">
          <div className="solution-header">
            <h2>{this.state.title}</h2>
          </div>
          <div className="acediff"></div>

        </div>
        <div id="right-pane">
          <div className="pane-section">
            <div className="description">
              <h3>Description</h3>
              <p>{this.state.description}</p>
              <h3>Solution</h3>
              <textarea onChange={this.handleTextArea} value={response}></textarea>
            </div>
            <p>{message}</p>
            <button onClick={this.handleSolutionButton}>Add Solution</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddSolution;

// "files": JSON.stringify([{"code": Base64.encode(`server.jsCode`), "filename": "server.js", "language": "react.js"}, {"code": Base64.encode(`binding.jsCode`), "filename": "express.js", "language": "react.js"}]),

