import React from "react";
import "../../../CSS/AceEditor.css";
import code from './SeedCode'

class SoloEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      files: ['index.html', 'style.css', 'app.js'],
      currentFile: 'index.html',
      lines: [],
      currentIssue: 0,
      issueDescription: '',
      allProblems: []
    }
    this.cells = [];
  }

  componentDidMount() {

  }

  addOnClick = () => {
    let lines = this.state.lines
    for(var i=0; i<this.cells.length; i++){
      this.cells[i].addEventListener('click', function(e){
        if(e.target.className.includes('selected-cell')) {
          lines.splice(lines.indexOf(e.target.innerText), 1)
          e.target.className = e.target.className.replace('selected-cell', '')
          console.log(lines)
          this.setState({lines: lines})
        }else{
          e.target.className = e.target.className + 'selected-cell'
          lines.push(e.target.innerText)
          console.log(lines)
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
    const {rightEditor} = this.state
    if(this.cells[0]){
      console.log(`!!!!!`)
      this.addOnClick()
    }
    console.log(this.state)
    return (
      <div id="solution">
        <div id="file-tabs">
          {this.state.files.map(v => <div className="tab">{v}</div>)}
        </div>
        <div id="editor-container">
          <h2>Whenever I rerender my routes dont work.</h2>
          <div className = "acediff"></div>
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
