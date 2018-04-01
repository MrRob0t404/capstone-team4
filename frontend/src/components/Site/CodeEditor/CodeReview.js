import React from "react";
import {Link} from "react-router-dom";
import AceDiff from "ace-diff";
import "../../../CSS/AceEditor.css";
import "../../../CSS/EditorPages.css";

import brace from 'brace';
import './Import/import'
import 'brace/theme/solarized_dark';

var disqus_config = function () {
  this.page.url = "https://test.tyrodev.com/issues";
  this.page.identifier = window.location.pathname;
}

const solutions = [
  {
    name: 'simon',
    code: `var aceDiffer = new AceDiff({
          mode: null,
          theme: null,
          element: ".acediff",
          diffGranularity: 'broad',
          showDiffs: true,
          showConnectors: true,
          maxDiffs: 5000,
          left: {
              content: this.state.originalCode,
              mode: 'null',
              theme: null,
              editable: false,
              copyLinkEnabled: true
          },
          right: {
              content: this.state.editedCode,
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
      });`
  }, {
    name: 'newton',
    code: 'No new code'
  }, {
    name: 'monique',
    code: 'I just wanna talk to my toaster :( '
  }
]

class AceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      files: [],
      title: '',
      description: '',
      originalCode: {},
      solutionCode: {},
      currentFile: '',
      date: '',
=======
      files: [
        code[0], code[1], code[2]
      ],
>>>>>>> 047bd92153c8c5e8c22e1b14a72387216e999b96
      renderDescription: true,
      renderEditor: true,
    }
    this.aceDiffer = undefined;
  }

<<<<<<< HEAD
  componentWillReceiveProps(nextProps){

    if(nextProps.problemData.data){
      let title = nextProps.problemData.data[0].title
      let description = nextProps.problemData.data[0].problem_description
      let date = nextProps.problemData.data[0].ticketdate
      let currentFile = nextProps.problemData.data[0].filename
      let originalCode = {}

      nextProps.problemData.data.forEach((v,i) => {
        originalCode[v.filename] = (v.code)
      })

      this.setState({
        files: nextProps.problemData.data,
        originalCode,
        currentFile,
        date,
        description,
        title
      })

    }
  }

  renderAceEditor = () => {

    const { rightEditor } = this.state

    this.setState({renderEditor: false})

    // This object creates the split editor and imports it in the element with className ".acediff"
=======
  componentDidMount() {
    const {rightEditor} = this.state

    // This object creates the split editor and imports it in the element with
    // className ".acediff"
>>>>>>> 047bd92153c8c5e8c22e1b14a72387216e999b96
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
<<<<<<< HEAD
    })
=======

    let x = {}
    code.forEach(v => x[v.name] = v.code)
    // console.log('X', x)
  }

  handleCycle = () => {
    const {count, editedCode, rightEditor} = this.state
    console.log('count:', count)
    console.log('edited code:', rightEditor)
    if (count < solutions.length) {
      this.setState({
        count: count + 1,
        rightEditor: solutions[count].code
      })
    } else {
      this.setState({count: 0})
    }
>>>>>>> 047bd92153c8c5e8c22e1b14a72387216e999b96
  }

  renderDescription = () => (
    <div>
      <div>
        <h3>Description</h3>
<<<<<<< HEAD
        <p>{this.state.description}</p>
=======
        <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr
          adaptogen fingerstache, paleo bitters beard. Knausgaard bitters try-hard
          leggings, lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat
          truffaut distillery tacos. Ennui pop-up hell of, mustache skateboard vaporware
          tattooed chillwave actually etsy. Intelligentsia godard williamsburg quinoa.</p>
>>>>>>> 047bd92153c8c5e8c22e1b14a72387216e999b96
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
<<<<<<< HEAD
	  let { left, right } = this.aceDiffer.getEditors();
	  left.setValue(this.state.originalCode[e.target.innerText]);
	  right.setValue(this.state.solutionCode[e.target.innerText] || this.state.originalCode[e.target.innerText]);
	  this.setState( { currentFile: e.target.innerText } );
 }

  render() {
    const { rightEditor } = this.state

    this.state.description ? this.state.renderEditor ? this.renderAceEditor() : '' : ''
    return (
      <div id="solution">
        <div id="file-tabs">
          {this.state.files.map((v,i) => <div className="tab" onClick={this.handleTabClick}>{v.filename}</div>)}
        </div>
        <div id="editor-container">
          <div className="solution-header">
            <h2>{this.state.title}</h2>
            <Link  to="/issues/:issuesID/solution/new" id="submit-solution-button"><button>Submit Solution</button></Link>
          </div>
    	    <div className="acediff"></div>
=======

    let {left, right} = this
      .aceDiffer
      .getEditors();
    left.setValue(this.state.files[Number(e.target.id)].code);
    right.setValue(this.state.files[Number(e.target.id)].code);
    this.setState({
      currentFile: Number(e.target.id)
    });
  }

  render() {
    const {rightEditor} = this.state

    return (
      <div id="solution">
        <div id="file-tabs">
          {this
            .state
            .files
            .map((v, idx) => <div className="tab" id={idx} onClick={this.handleTabClick}>{v.name}</div>)}
        </div>
        <div id="editor-container">
          <h2>Why doesn{"'"}t my for loop work?</h2>
          <div className="acediff"></div>
          <button
            id="submit-solution-btn"
            style={{
            float: "right",
            margin: ".25em 0",
            fontSize: "2rem",
            fontWeight: "900",
            width: "20rem",
            height: "4rem",
            backgroundColor: "green",
            color: "orange",
            disabled: false
          }}>Submit Solution</button>

>>>>>>> 047bd92153c8c5e8c22e1b14a72387216e999b96
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
        <div className="solutions-list"></div>

      </div>
    )
  }
}

export default AceEditor;
