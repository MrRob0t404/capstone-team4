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

class AceEditor extends React.Component {
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
      <div>
        <h3>Response</h3>
        <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr
          adaptogen fingerstache, paleo bitters beard. Knausgaard bitters try-hard
          leggings, lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat
          truffaut distillery tacos. Ennui pop-up hell of, mustache skateboard vaporware
          tattooed chillwave actually etsy. Intelligentsia godard williamsburg quinoa.</p>
      </div>
    </div>
  )

  renderComments = () => {
    (function () {
      let s = document.createElement("script");
      s.src = "https://tyrodev.disqus.com/embed.js";
      s.setAttribute("data-timestamp", + new Date());
      (document.head || document.body).appendChild(s);
    })();

    return <div id="disqus_thread"></div>
  }

  togglePane = e => {
    e.target.innerText === "Description"
      ? this.setState({renderDescription: true})
      : this.setState({renderDescription: false})
  }

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
    console.log('PROPs', this.props.props.match.params.issuesID)

    this.state.description ? this.state.renderEditor ? this.renderAceEditor() : console.log('render', this.state.renderEditor) : console.log('WAITING')
    return (
      <div id="solution">
        <div id="file-tabs">
          {this.state.files.map((v,i) => <div className="tab" onClick={this.handleTabClick}>{v.filename}</div>)}
        </div>
        <div id="editor-container">
          <div className="solution-header">
            <h2>{this.state.title}</h2>
            <Link  to={`/issues/${this.props.props.match.params.issuesID}/solution/new`} id="submit-solution-button"><button>Submit Solution</button></Link>
          </div>
    	    <div className="acediff"></div>
          <div id="switch-solution-buttons">
            <button onClick={''}>Previous</button>
            <button onClick={''}>Next</button>
          </div>
        </div>
        <div id="right-pane">
          <div id="pane-nav">
            <p onClick={this.togglePane}>Description</p>
            <p onClick={this.togglePane}>Comments</p>
          </div>
          <div className="pane-section">
            {this.state.renderDescription
              ? this.renderDescription()
              : this.renderComments()
            }
          </div>
        </div>
      </div>
    )
  }
}

export default AceEditor;
