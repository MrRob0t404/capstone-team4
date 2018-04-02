import React from "react";
import {Link} from "react-router-dom";
import AceDiff from "ace-diff";
import "../../../CSS/AceEditor.css";
import "../../../CSS/EditorPages.css";

import axios from 'axios';
import brace from 'brace';
import './Import/import'
import 'brace/theme/solarized_dark';
import { Base64 } from 'js-base64';

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
      originalCode: {},
      solutionCode: {},
      currentFile: '',
      date: '',
      renderDescription: true,
      renderEditor: true,
    }
    this.aceDiffer = undefined;
  }

  componentDidMount(){
    console.log(this.props.props.match.params.issuesID)
    axios
      .get(`/users/getProblem/${this.props.props.match.params.issuesID}`)
      .then(res => {
        let title = res.data.data[0].title
        let description = res.data.data[0].problem_description
        let date = res.data.data[0].ticketdate
        let currentFile = res.data.data[0].filename
        let originalCode = {}

        res.data.data.forEach((v,i) => {
          originalCode[v.filename] = Base64.decode(v.code)
        })

        this.setState({
          files: res.data.data,
          originalCode,
          currentFile,
          date,
          description,
          title
        })
        console.log('RESPONSE', res.data.data)
      })
  }


  renderAceEditor = () => {

    const { rightEditor } = this.state

    this.setState({renderEditor: false})

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
        content: this.state.originalCode[this.state.currentFile] || '' ,
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

    // This function tracks the changes made to the right side of the editor and
    // updates the state
    aceDiffer
      .getEditors()
      .right
      .on("change", () => {
        this.setState({
          rightEditor: aceDiffer
            .getEditors()
            .right
            .getValue()
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

  handleTabClick = e => {
	  let { left, right } = this.aceDiffer.getEditors();
	  left.setValue(this.state.originalCode[e.target.innerText], -1);
    left.clearSelection()
	  right.setValue(this.state.solutionCode[e.target.innerText] || this.state.originalCode[e.target.innerText], -1);
    right.clearSelection()
	  this.setState( { currentFile: e.target.innerText } );
 }

  render() {
    const {rightEditor} = this.state
    console.log('Add Solution', this.props, this.state)

    this.state.description ? this.state.renderEditor ? this.renderAceEditor() : '' : ''
    return (
      <div id="solution">
        <div id="file-tabs">
          {this.state.files.map((v,i) => <div className="tab" onClick={this.handleTabClick}>{v.filename}</div>)}
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
              <textarea></textarea>
            </div>
            <button>Add Solution</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddSolution;
