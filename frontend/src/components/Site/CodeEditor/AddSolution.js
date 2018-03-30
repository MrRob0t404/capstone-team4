import React from "react";
import {Link, Route} from "react-router-dom";
import AceDiff from "ace-diff";
import "../../../CSS/AceEditor.css";
import "../../../CSS/EditorPages.css";
import code from './SeedCode'

class AddSolution extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [code[0], code[1], code[2]],
      renderDescription: true,
      currentFile: 0
    }
    this.aceDiffer = undefined;
  }

  componentDidMount() {
    const { rightEditor } = this.state

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
        content: this.state.files[this.state.currentFile].code,
        mode: 'null',
        theme: null,
        editable: false,
        copyLinkEnabled: true,
      },
      right: {
        content: this.state.files[this.state.currentFile].code,
        mode: null,
        theme: null,
        editable: true,
        copyLinkEnabled: true,
      },
      classes: {
        diff: 'acediff__diffLine',
        connector: 'acediff__connector',
        newCodeConnectorLinkContent: '&#8594;',
        deletedCodeConnectorLinkContent: '&#8592;',
      },
    });

    // This function tracks the changes made to the right side of the editor and updates the state
    aceDiffer.getEditors().right.on("change", () => {
      this.setState({
        rightEditor: aceDiffer.getEditors().right.getValue()
      })
    })

    let x = {}
    code.forEach(v => x[v.name] = v.code)
    console.log('X', x)

  }

  handleTabClick = e => {
	let { left, right } = this.aceDiffer.getEditors();
	  left.setValue(this.state.files[Number(e.target.id)].code);
	  right.setValue(this.state.files[Number(e.target.id)].code);
	  this.setState( { currentFile: Number(e.target.id) } );
 }


  render() {
    const { rightEditor } = this.state
    return (
      <div id="solution">
        <div id="file-tabs">
          {this.state.files.map((v,idx) => <div className="tab" id={idx} onClick={this.handleTabClick}>{v.name}</div>)}
        </div>
        <div id="editor-container">
          <div className="solution-header">
            <h2>Why doesn{"'"}t my for loop work?</h2></div>
    	    <div className="acediff"></div>
        </div>
        <div id="right-pane">
          <div className="pane-section">
            <div className="description">
              <h3>Description</h3>
              <textarea></textarea>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddSolution;
