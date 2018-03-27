import React, {Component} from "react";
import "../../../CSS/AceEditor.css";
import code from './SeedCode'
import brace from 'brace';
import AceEditor from 'react-ace-editor';

import 'brace/mode/jsx';
import 'brace/theme/github';

class SoloEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: ['index.html', 'style.css', 'app.js'],
      currentFile: 'index.html',
      lines: [],
      currentIssue: 0,
      issueDescription: '',
      allProblems: [],

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

  componentDidMount() {}

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

  addProblem = () => {
    let issueObj = {
      description: this.state.issueDescription
    }
    this.setState({})
  }

  handleProblemDescription = e => {
    this.setState({issueDescription: e.target.value})
  }

  submitTicket = () => {

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
      console.log(`Solo Editor State`, this.state)
      this.addOnClick()
    }
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
          <div className="acediff">
            <AceEditor
              mode="jsx"
              theme="github"
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
            <div className="description">
              <h3>Description</h3>
              <textarea onChange={this.handleProblemDescription} value={this.state.issueDescription}></textarea>
            </div>
            <div className="description">
              <h3>Issues<button onClick={this.addProblem}>+</button></h3>
              <ul>
                {this.state.allProblems.map((v, i) => <li>{`Issue ${i+1}`}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="pane-buttons">
          <button onClick={this.submitTicket}>Done</button>
        </div>
      </div>
    )
  }
}

export default SoloEditor;
