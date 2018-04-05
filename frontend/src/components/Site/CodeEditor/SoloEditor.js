import React, {Component} from "react";
import "../../../CSS/AceEditor.css";
import "../../../CSS/EditorPages.css";
import code from './SeedCode'
import brace from 'brace';
import AceEditor from 'react-ace';
import {getModeForPath} from '../../../lib/modelist'
import axios from 'axios';
import {Base64} from 'js-base64';
import {Redirect} from 'react-router'

import './Import/import';
import 'brace/theme/textmate';

class SoloEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      renderDescription: true,
      originalCode: code,
      lines: [],
      selectedFile: this.props.selectedFilesNames[0],
      allDescriptions: {},
      decodedContentObj: this.props.decodedContentObj,
      submitted: false,
      mode: null
    }
    this.cells = [];
  }

  componentDidMount() {
    // let obj = {} this   .props   .selectedFilesNames   .forEach(v => obj[v] = '')
    // this.setState({allDescriptions: obj}) this.setState({newtonAskedForThis:
    // this.props.decodedContentObj})
    this.setState({
      mode: getModeForPath(this.state.selectedFile)
    })
  }

  handleTabClick = e => {
    // console.log('tab:', e.target) console.log('tab props: ',
    // Object.keys(e.target)) console.log('tab name:', e.target.name)

    // this.setState({selectedFile: e.target.name})
    this.setState({
      selectedFile: e.target.name,
      mode: getModeForPath(e.target.name)
    })
  }

  handleDescription = e => {
    // console.log('description', e.target.value)
    this.setState({description: e.target.value})
    // Every file has it's own description let descArr = this.state.allDescriptions
    // descArr[this.state.selectedFile] = e.target.value
    // this.setState({allDescriptions: descArr})
  }

  // getDate = () => {   var d = new Date();   this.setState({     dateCreated: })
  // } things to do getDate fucntion make a fucntion that takes code and turns it
  // into an object
  submit = () => {
    var d = new Date();
    // let obj = {1: 2, 3: 4} let arr = Object.keys(obj).map((key) => {   return
    // {key: obj[key]} })
    let obj = this.props.decodedContentObj
    let arrOfCodes = Object //Creates an array of objects
      .keys(obj)
      .map((key) => {
        console.log('KEY', key)
        return {
          "code": Base64.encode(obj[key]),
          "filename": key,
          "language": getModeForPath(key).name
        }
      })
    // console.log('arrOfCodes', JSON.stringify(arrOfCodes))
    axios.post(`/users/submitProblem`, {
      "ticketDate": (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(),
      "title": `${this.state.title}`,
      "problemStatus": "0",
      "lines": "",
      "problem_desc": `${this.state.description}`,
      "files": JSON.stringify(arrOfCodes)
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log("problem sending to backend: ", err)
    });
    this.setState({submitted: true})
  }

  render() {
    console.log('SOLO EDITOR STATE', this.state)
    console.log('props soloEditor', this.props)
    const {rightEditor, selectedFile, mode} = this.state
    const {decodedContentObj, title, formCompleteToFalse} = this.props
    console.log('MODE', this.state.mode ? this.state.mode.name : '')

    if (!decodedContentObj) {
      return <div>
        no content selected
      </div>
    }
    if (this.cells[0]) {
      this.addOnClick()
    }

    // console.log('mode: ', mode.name)
    if (!this.state.mode) {
      return <div>Loading</div>
    }
    var highlight = new Range(1, 1, 10, 10)
    if (this.state.submitted) {
      return <Redirect to='/issues/'/>
    } else if (mode === null) {
      formCompleteToFalse();
      return <Redirect to='/issues'/>
    } else {
      return (
        <div class="problem" id="solution">
          <div id="file-tabs">
            {this
              .props
              .selectedFilesNames
              .map(v => <button className='tab' key={v} name={v} onClick={this.handleTabClick}>{v}</button>)}
          </div>
          <div id="editor-container">
            <h2>{title}</h2>
            <div className="ace-container">
              <AceEditor
                mode={this.state.mode.name}
                theme="textmate"
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
                <p>
                  ex. My issue is on lines 20-27. I{"'"}ve tried to log all my values but they seem correct.
                  I get the error 'cannot read value of undefined' but all my values are defined.
                </p>
                <textarea onChange={this.handleDescription} value={this.state.description}></textarea>
              </div>
              <button onClick={this.submit}>Done</button>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default SoloEditor;
{/* value={this.state.allDescriptions[this.state.selectedFile]}></textarea> */
}
