import React, {Component} from "react";
import "../../../CSS/AceEditor.css";
import code from './SeedCode'
import brace from 'brace';
import AceEditor from 'react-ace';
import {getModeForPath} from '../../../lib/modelist'

import './Import/import';
import 'brace/theme/solarized_dark';

class SoloEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "javascript",
      rightEditor: this.githubCode,
      files: this.props.selectedFiles,
      renderDescription: true,
      originalCode: code,
      editedCode: code,
      lines: [],
      selectedFile: ''
    }
    this.cells = [];
  }

  renderDescription = () => (
    <div id="description">
      <h3>Description</h3>
      <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr
        adaptogen fingerstache, paleo bitters beard. Knausgaard bitters try-hard
        leggings, lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat
        truffaut distillery tacos. Ennui pop-up hell of, mustache skateboard vaporware
        tattooed chillwave actually etsy. Intelligentsia godard williamsburg quinoa.</p>
    </div>
  )

  handleTabClick = e => {
    console.log('tab:', e.target)
    console.log('tab props: ', Object.keys(e.target))
    console.log('tab name:', e.target.name)

    this.setState({selectedFile: e.target.name})

    // console.log('STTE', this.state)
  }

  addOnClick = () => {
    let lines = this.state.lines
    for (var i = 0; i < this.cells.length; i++) {
      this
        .cells[i]
        .addEventListener('click', function (e) {
          if (e.target.className.includes('selected-cell')) {
            lines.splice(lines.indexOf(e.target.innerText), 1)
            e.target.className = e
              .target
              .className
              .replace('selected-cell', '')
            // console.log(lines)
            this.setState({lines: lines})
          } else {
            e.target.className = e.target.className + 'selected-cell'
            lines.push(e.target.innerText)
            // console.log(lines)
            this.setState({lines: lines})
          }
        })
    }
  }

  render() {
    const {rightEditor, selectedFile} = this.state
    const {decodedContentObj} = this.props
    console.log("soloeditor props: ", this.props)
    if (!decodedContentObj) {
      return <div>
        no content selected
      </div>
    }
    if (this.cells[0]) {
      // console.log(`Solo Editor State`, this.state)
      this.addOnClick()
    }
    var mode = getModeForPath(this.state.selectedFile);
    // console.log('mode: ', mode.name)

   var highlight = new Range(1, 1, 10, 10)

    return (
      <div id="solution">
        <div id="file-tabs">
          {this
            .props
            .selectedFilesNames
            .map(v => <button className='tab' name={v} onClick={this.handleTabClick}>{v}</button>)}
        </div>
        <div id="editor-container">
          <h2>Whenever I rerender my routes dont work.</h2>
          <div className="ace-container">
            <AceEditor
              mode={mode.name}
              theme="solarized_dark"
              highlightActiveLine={true}
              value={decodedContentObj[selectedFile]}
              setOptions={{
              enableBasicAutoCompletion: true,
              enableLiveAutoCompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2
            }}/>
          </div>
        </div>
        <div id="right-pane">
          <div className="pane-section">
            {this.renderDescription()}
          </div>
        </div>
        {/* Solo code editor */}
      </div>
    )
  }
}

export default SoloEditor;
