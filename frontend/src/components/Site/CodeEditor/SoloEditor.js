import React, {Component} from "react";
import "../../../CSS/AceEditor.css";
import "../../../CSS/EditorPages.css";
import code from './SeedCode'
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/theme/github';

class SoloEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "javascript",
      rightEditor: this.githubCode,
      renderDescription: true,
      originalCode: code,
      editedCode: code,
      lines: [],
      testing: [],
      selectedFile: this.props.selectedFilesNames[0],
      allDescriptions: {}
    }
    this.cells = [];
  }

  componentDidMount(){
    let obj = {}
    this.props.selectedFilesNames.forEach(v => obj[v] = '')
    this.setState({
      allDescriptions: obj
    })
  }

  handleTabClick = e => {
    console.log('tab:', e.target)
    console.log('tab props: ', Object.keys(e.target))
    console.log('tab name:', e.target.name)

    this.setState({selectedFile: e.target.name})
  }

  handleDescription = e => {
    let descArr = this.state.allDescriptions
    descArr[this.state.selectedFile] = e.target.value
    this.setState({allDescriptions: descArr})
  }

  render() {
    const {rightEditor, selectedFile} = this.state
    const {decodedContentObj} = this.props
    console.log("soloeditor props: again", this.props)

    console.log('STATE', this.state)

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
          <div className="ace-container">
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
              <textarea onChange={this.handleDescription} value={this.state.allDescriptions[this.state.selectedFile]}></textarea>
            </div>
            <button>Done</button>
          </div>
        </div>
      </div>
    )
  }
}

export default SoloEditor;
