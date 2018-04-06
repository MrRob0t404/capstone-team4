import React from "react";
import { Link } from "react-router-dom";
import AceDiff from "ace-diff";
import "../../../CSS/AceEditor.css";
import "../../../CSS/EditorPages.css";

import axios from 'axios';
import brace from 'brace';
import './Import/import'
import 'brace/theme/solarized_dark';
import { Base64 } from 'js-base64';


var disqus_config = function () {
  this.page.url = "https://test.tyrodev.com/issues";
  this.page.identifier = window.location.pathname;
}

class AceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      title: '',
      description: '',
      solutionData: [],
      originalCode: {},
      solutionCode: [],
      currentFile: '',
      currentSolver: 0,
      date: '',
      renderDescription: true,
      renderEditor: false,
      problemPosterID: null,
      problemStatus: null
    }
    this.aceDiffer = undefined;
  }

  componentDidMount() {
    axios
      .get(`/users/getProblem/${this.props.props.match.params.issuesID}`)
      .then(res => {
        this.setState({
          problemPosterID: res.data.data[0].ticket_userid,
          problemStatus: res.data.data[0].problemstatus
        })
        let title = res.data.data[0].title
        let description = res.data.data[0].problem_description
        let date = res.data.data[0].ticketdate
        let currentFile = res.data.data[0].filename
        let originalCode = {}
        res.data.data.forEach((v, i) => {
          originalCode[v.filename] = Base64.decode(v.code)
        })

        this.setState({
          files: res.data.data,
          originalCode,
          currentFile,
          date,
          description,
          title
        })
      })

    axios
      .get(`/users/getSolutions/${this.props.props.match.params.issuesID}`)
      .then(res => {

        let obj = {}
        let data = {}
        res.data.data.forEach(v => {
          if (obj[v.username]) {
            let userFiles = obj[v.username]
            userFiles[v.filename] = Base64.decode(v.code)
            obj[v.username] = userFiles
          } else {
            obj[v.username] = {
              [v.filename]: Base64.decode(v.code),
            }
            data[v.username] = {
              description: v.solution_description,
              pic: v.profile_pic,
              username: v.username,
              date: v.postdate
            }
          }
        })
        let keys = Object.keys(obj)
        console.log('KEYS', keys)
        this.setState({
          solutionCode: keys.map(v => obj[v]),
          solutionData: keys.map(v => data[v]),
          renderEditor: true
        })
      })

  }


  renderAceEditor = () => {

    const { rightEditor } = this.state

    this.setState({ renderEditor: false })


    // This object creates the split editor and imports it in the element with className ".acediff"
    var aceDiffer = this.aceDiffer = new AceDiff({
      mode: null,
      theme: null,
      element: ".acediff",
      diffGranularity: 'broad',
      showDiffs: true,
      showConnectors: true,
      maxDiffs: 5000,
      left: {
        content: this.state.originalCode[this.state.currentFile],
        mode: 'null',
        theme: null,
        editable: false,
        copyLinkEnabled: true
      },
      right: {
        content: this.state.solutionCode[this.state.currentSolver] ? this.state.solutionCode[this.state.currentSolver][this.state.currentFile] || this.state.originalCode[this.state.currentFile] : this.state.originalCode[this.state.currentFile],
        mode: null,
        theme: null,
        editable: false,
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
  }

  renderDescription = () => (
    <div>
      <div className="description">
        <h3>Description</h3>
        {this.state.files[0] ?
          <div className="user-info">
            <div>
              <img src={this.state.files[0].profile_pic} />
              <p>{this.state.files[0].username}</p>
            </div>
            <p>{this.state.files[0].ticketdate}</p>
          </div> :
          ''}
        <p>{this.state.description}</p>
      </div>
      <div className="description">
        <h3>Response</h3>
        {this.state.solutionData[0] ?
          <div className="user-info">
            <div>
              <img src={this.state.solutionData[this.state.currentSolver].pic} />
              <p>{this.state.solutionData[this.state.currentSolver].username}</p>
            </div>
            <p>{this.state.solutionData[this.state.currentSolver].date}</p>
          </div> :
          ''}
        <p>
          {this.state.solutionData[this.state.currentSolver] ? this.state.solutionData[this.state.currentSolver].description ||
            `There's no solution for this ticket. Be the first!` : `There's no solution for this ticket. Be the first!`}
        </p>
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
      ? this.setState({ renderDescription: true })
      : this.setState({ renderDescription: false })
  }

  handleTabClick = e => {
    let { left, right } = this.aceDiffer.getEditors();
    let path = e.target.title
    console.log(path)
    left.setValue(this.state.originalCode[path], -1);
    left.clearSelection()
    right.setValue(this.state.solutionCode[this.state.currentSolver] ? this.state.solutionCode[this.state.currentSolver][path] || this.state.originalCode[path] : this.state.originalCode[path], -1);
    right.clearSelection()
    this.setState({ currentFile: path});
  }

  changeSolution = e => {
    let { right } = this.aceDiffer.getEditors();
    let currentSolver = this.state.currentSolver
    console.log('direction', e.target.dataset.direction)
    if (e.target.dataset.direction === "Next") {
      currentSolver += 1
    } else {
      currentSolver -= 1
    }
    this.setState({ currentSolver })
    right.setValue(this.state.solutionCode[currentSolver][this.state.currentFile] || this.state.originalCode[this.state.currentFile], -1);
    right.clearSelection()
  }

  handleProblemStatus = () => {
    const { problemStatus } = this.state;
    if(problemStatus === '0') {
      axios
      .patch(`/users/updateTicketProblemStatus/${this.props.props.match.params.issuesID}/1`)
      .then(res => {
        this.setState({
          problemStatus: '1'
        })
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      axios
      .patch(`/users/updateTicketProblemStatus/${this.props.props.match.params.issuesID}/0`)
      .then(res => {
        this.setState({
          problemStatus: '0'
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  render() {
    const { rightEditor, problemPosterID, problemStatus } = this.state;
    this.state.description && this.state.renderEditor ? this.renderAceEditor() : ''
    let submitSolutionButton;
    console.log(`state`, this.state)
      if(this.props.user) {
        if(this.props.user.id !== problemPosterID) {
          submitSolutionButton = <Link to={`/issues/${this.props.props.match.params.issuesID}/solution/new`} id="submit-solution-button"><button>Submit Solution</button></Link>
        } else if(this.props.user.id === problemPosterID) {
          if(this.state.solutionData.length === 0) {
            submitSolutionButton = <div>
            Looks like you posted this problem, let{"'"}s let someone else solve it!
            </div>
          }
          if(problemStatus === '0') {
            submitSolutionButton = <div>Did you find these solution(s) helpful?<button id="submit-solution-button" onClick={this.handleProblemStatus}>UNSOLVED</button></div>
          } else {
            submitSolutionButton = <div>We{"'"}re glad you found these solutons helpful!<button onClick={this.handleProblemStatus}>SOLVED</button></div>
          }
        }
      } else {
        submitSolutionButton = <Link to='/login'>Sign in here! to submit a solution</Link>
      }

    return (
      <div id="solution">
        <div id="file-tabs">
          {this.state.files.map((v, i) => <div data-toggle="tooltip" data-placement="right" title={v.filename} className="tab" onClick={this.handleTabClick}>{v.filename.match(/(\w*\b\.\w*)/g)[0]}</div>)}
        </div>
        <div id="editor-container">
          <div className="solution-header">
            <h2>{this.state.title}</h2>
             {submitSolutionButton}
          </div>
          <div className="acediff"></div>
          <div id="switch-solution-buttons">
            <button data-direction="Previous" onClick={this.changeSolution} disabled={this.state.currentSolver <= 0}><i data-direction="Previous" class="fas fa-angle-left"></i></button>
            <button data-direction="Next" onClick={this.changeSolution} disabled={this.state.currentSolver >= this.state.solutionCode.length - 1}><i data-direction="Next" class="fas fa-angle-right"></i></button>
          </div>
        </div>
        <div id="right-pane">
          <div id="pane-nav">
            <p onClick={this.togglePane}>Description</p>
            <p onClick={this.togglePane}>Comments</p>
          </div>
          <div className="pane-section">
            <div className={this.state.renderDescription ? '' : 'hidden'} >{this.renderDescription()}</div>
            <div className={this.state.renderDescription ? 'hidden' : ''} >{this.renderComments()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AceEditor;


// if (loading) {
//   return <div>Loading User...</div>
// } else if (!user) {
//   return <Redirect to='/login'/>
// }
