import React, {Component} from "react";
import "../../../CSS/AceEditor.css";
import code from './SeedCode'
import ReactAce from 'react-ace-editor';

class SoloEditor extends Component {
  constructor() {
    super();
    this.state = {
      language: "javascript",
      rightEditor: this.githubCode,
      files: [
        'index.html', 'style.css', 'app.js'
      ],
      renderDescription: true,
      originalCode: code,
      editedCode: code,
      lines: []
    }
    this.cells = [];
  }

  componentDidMount() {} //Make API call for

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

  handleTabClick = () => {
    console.log('tab clicked')
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
            console.log(lines)
            this.setState({lines: lines})
          } else {
            e.target.className = e.target.className + 'selected-cell'
            lines.push(e.target.innerText)
            console.log(lines)
            this.setState({lines: lines})
          }
        })
    }
  }

  render() {
    const {rightEditor} = this.state
    if (this.cells[0]) {
      console.log(`!!!!!`)
      this.addOnClick()
    }
    console.log(this.state)
    return (
      <div id="solution">
        <div id="file-tabs">
          {this
            .state
            .files
            .map(v => <div className='tab' onClick={this.handleTabClick} >{v}</div>)}
        </div>
        <div id="editor-container">
          <h2>Whenever I rerender my routes dont work.</h2>
          <div className="acediff">
            <ReactAce mode={this.state.language} theme="eclipse" setReadOnly={false} onChange={this.onChange} style={{
              height: '400px',
              width: '100px'
            }} ref={instance => {
              this.ace = instance;
            }} // Let's put things into scope
            />
          </div>
        </div>
        <div id="right-pane">
          <div className="pane-section">
            {this.renderDescription()}
          </div>
        </div>
        {/* Solo code editor */}
        <div></div>
      </div>
    )
  }
}

export default SoloEditor;
