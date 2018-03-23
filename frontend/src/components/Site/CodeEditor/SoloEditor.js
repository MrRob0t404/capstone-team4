import React from "react";
import "../../../CSS/AceEditor.css";
import code from './SeedCode'

class SoloEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      rightEditor: this.githubCode,
      files: ['index.html', 'style.css', 'app.js'],
      renderDescription: true,
      originalCode: code,
      editedCode: code,
      lines: []
    }
    this.cells = [];
  }

  componentDidMount() {

  }

  renderDescription = () => (
    <div id="description">
      <h3>Description</h3>
      <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr adaptogen fingerstache,
      paleo bitters beard. Knausgaard bitters try-hard leggings,
      lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat truffaut distillery tacos.
      Ennui pop-up hell of, mustache skateboard vaporware tattooed chillwave actually etsy.
      Intelligentsia godard williamsburg quinoa.</p>
    </div>
  )

  renderComments = () => (
    <div id="comments">
      <h3>Comments</h3>
      <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr adaptogen fingerstache,
      paleo bitters beard. Knausgaard bitters try-hard leggings,
      lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat truffaut distillery tacos.
      Ennui pop-up hell of, mustache skateboard vaporware tattooed chillwave actually etsy.
      Intelligentsia godard williamsburg quinoa.</p>
      <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr adaptogen fingerstache,
      paleo bitters beard. Knausgaard bitters try-hard leggings,
      lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat truffaut distillery tacos.
      Ennui pop-up hell of, mustache skateboard vaporware tattooed chillwave actually etsy.
      Intelligentsia godard williamsburg quinoa.</p>
      <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr adaptogen fingerstache,
      paleo bitters beard. Knausgaard bitters try-hard leggings,
      lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat truffaut distillery tacos.
      Ennui pop-up hell of, mustache skateboard vaporware tattooed chillwave actually etsy.
      Intelligentsia godard williamsburg quinoa.</p>
    </div>
  )

  togglePane = e => {
    e.target.innerText === "Description" ?
      this.setState({renderDescription: true}):
      this.setState({renderDescription: false})
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
          <div id="pane-nav">
            <p onClick={this.togglePane}>Description</p>
            <p onClick={this.togglePane}>Comments</p>
          </div>
          <div className="pane-section">
            {this.state.renderDescription?
              this.renderDescription():
              this.renderComments()
            }
          </div>
        </div>
      </div>
    )
  }
}

export default SoloEditor;
