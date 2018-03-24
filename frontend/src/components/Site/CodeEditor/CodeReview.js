import React from "react";
import AceDiff from "ace-diff";
import "../../../CSS/AceEditor.css";
import code from './SeedCode'

class AceEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      files: ['index.html', 'style.css', 'app.js'],
      renderDescription: true,
<<<<<<< HEAD
      originalCode: code,
      editedCode: code,
=======
      originalCode: `for (var i = 0; i < 10 ; i--){ 
        console.log(i)
      }`,
      editedCode: `for (var i = 0; i < 10 ; i--){ 
        console.log(i)
      }`,
>>>>>>> 8361bf74725f38fb88b31c9242e66207126f504e
      lines: []
    }
    this.cells = [];
  }

  componentDidMount() {
    const { rightEditor } = this.state

    // This object creates the split editor and imports it in the element with className ".acediff"
    var aceDiffer = new AceDiff({
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
        copyLinkEnabled: true,
      },
      right: {
        content: this.state.editedCode,
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

    this.cells = aceDiffer.getEditors().left.container.children[1].children[0].children

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
          // this.setState({lines: lines})
        }else{
          e.target.className = e.target.className + 'selected-cell'
          lines.push(e.target.innerText)
          // this.setState({lines: lines})
        }
        console.log(lines)
      })
    }
  }

  render() {
    const {rightEditor} = this.state
    if(this.cells[0]){
      console.log(this.cells)
      this.addOnClick()
    }
    return (
      <div id="solution">
        <div id="file-tabs">
          {this.state.files.map(v => <div className="tab">{v}</div>)}
        </div>
        <div id="editor-container">
          <h2>Why doesn't my for loop work?</h2>
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

export default AceEditor;
