import React from "react";
import AceDiff from "ace-diff";
import "../../../CSS/AceEditor.css";
import code from './SeedCode'

import brace from 'brace';
import './Import/import'
import 'brace/theme/solarized_dark';

var disqus_config = function () {
  this.page.url = "https://test.tyrodev.com/issues";
  this.page.identifier = window.location.pathname;
}

const solutions = [
  {
    name: 'simon',
    code: `var aceDiffer = new AceDiff({
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
              copyLinkEnabled: true
          },
          right: {
              content: this.state.editedCode,
              mode: null,
              theme: null,
              editable: true,
              copyLinkEnabled: true
          },
          classes: {
              diff: 'acediff__diffLine',
              connector: 'acediff__connector',
              newCodeConnectorLinkContent: '&#8594;',
              deletedCodeConnectorLinkContent: '&#8592;'
          }
      });`
  }, {
    name: 'newton',
    code: 'No new code'
  }, {
    name: 'monique',
    code: 'I just wanna talk to my toaster :( '
  }
]

class AceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        'index.html', 'style.css', 'app.js'
      ],
      renderDescription: true,
      originalCode: code[0].code,
      editedCode: solutions[this.props.count].code,
      currentFile: '',
      solutionCodeArrObj: solutions,
      count: this.props.count
    }
  }

  componentDidMount() {
    // This object creates the split editor and imports it in the element with
    // className ".acediff"
    var aceDiffer = new AceDiff({
      mode: "javascript",
      theme: 'solarized_dark',
      element: ".acediff",
      diffGranularity: 'broad',
      showDiffs: true,
      showConnectors: true,
      maxDiffs: 5000,
      left: {
        content: this.state.originalCode,
        mode: 'javascript',
        theme: 'solarized_dark',
        editable: false,
        copyLinkEnabled: true
      },
      right: {
        content: this.state.editedCode,
        mode: 'javascript',
        theme: 'solarized_dark',
        editable: true,
        copyLinkEnabled: true
      },
      classes: {
        diff: 'acediff__diffLine',
        connector: 'acediff__connector',
        newCodeConnectorLinkContent: '&#8594;',
        deletedCodeConnectorLinkContent: '&#8592;'
      }
    });

    // This function tracks the changes made to the right side of the editor and
    // updates the state
    aceDiffer
      .getEditors()
      .right
      .on("change", () => {
        this.setState({
          rightEditor: aceDiffer
            .getEditors()
            .right
            .getValue()
        })
      })

    let x = {}
    code.forEach(v => x[v.name] = v.code)
    // console.log('X', x)
  }

  handleCycle = () => {
    const {count, editedCode, rightEditor} = this.state
    console.log('count:', count)
    console.log('edited code:', rightEditor)
    if (count < solutions.length) {
      this.setState({
        count: count + 1,
        rightEditor: solutions[count].code
      })
    } else {
      this.setState({count: 0})
    }
  }

  renderDescription = () => (
    <div>
      <div>
        <h3>Description</h3>
        <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr
          adaptogen fingerstache, paleo bitters beard. Knausgaard bitters try-hard
          leggings, lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat
          truffaut distillery tacos. Ennui pop-up hell of, mustache skateboard vaporware
          tattooed chillwave actually etsy. Intelligentsia godard williamsburg quinoa.</p>
      </div>
      <div>
        <h3>Response</h3>
        <p>Lorem ipsum dolor amet mixtape coloring book subway tile roof party yr
          adaptogen fingerstache, paleo bitters beard. Knausgaard bitters try-hard
          leggings, lumbersexual kogi +1 meggings pinterest pour-over fixie waistcoat
          truffaut distillery tacos. Ennui pop-up hell of, mustache skateboard vaporware
          tattooed chillwave actually etsy. Intelligentsia godard williamsburg quinoa.</p>
      </div>
    </div>
  )

  renderComments = () => {
    (function () {
      let s = document.createElement("script");
      s.src = "https://tyrodev.disqus.com/embed.js";
      s.setAttribute("data-timestamp", + new Date());
      (document.head || document.body).appendChild(s);
    })();

    return <div id="disqus_thread"></div>
  }

  togglePane = e => {
    e.target.innerText === "Description"
      ? this.setState({renderDescription: true})
      : this.setState({renderDescription: false})
  }

  render() {
    const {rightEditor} = this.state
    return (
      <div id="solution">
        <div id="file-tabs">
          {this
            .state
            .files
            .map(v => <div className="tab">{v}</div>)}
        </div>
        <div id="editor-container">
          <h2>Why doesn{"'"}t my for loop work?</h2>
          <div className="acediff"></div>
          <div id="cycle-solutions">
            <button onClick={this.handleCycle}>{'<'}</button>
            <button onClick={this.handleCycle}>{'>'}</button>
          </div>
        </div>
        <div id="right-pane">
          <div id="pane-nav">
            <p onClick={this.togglePane}>Description</p>
            <p onClick={this.togglePane}>Comments</p>
          </div>
          <div className="pane-section">
            {this.state.renderDescription
              ? this.renderDescription()
              : this.renderComments()
}
          </div>
        </div>
      </div>
    )
  }
}

export default AceEditor;
