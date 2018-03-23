import React from "react";
import AceDiff from "ace-diff";
import "../../../CSS/AceEditor.css";

class AceEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      rightEditor: this.githubCode,
      files: ['index.html', 'style.css', 'app.js']
    }
    this.githubCode = `{import githubCode}`
  }

  componentDidMount() {
    const {
      rightEditor
    } = this.state

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
        content: this.githubCode,
        mode: null,
        theme: null,
        editable: false,
        copyLinkEnabled: true
      },
      right: {
        content: this.githubCode,
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
  }

render() {
    const {rightEditor} = this.state
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
            <p>Description</p>
            <p>Comments</p>
          </div>
          <div className="pane-section">
            <h3>Description</h3>
            <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr adaptogen fingerstache,
            paleo bitters beard. Knausgaard bitters try-hard leggings,
            lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat truffaut distillery tacos.
            Ennui pop-up hell of, mustache skateboard vaporware tattooed chillwave actually etsy.
            Intelligentsia godard williamsburg quinoa.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default AceEditor;
