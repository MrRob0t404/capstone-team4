import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';

class ChooseFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      allFiles: [],
      allDirs: [],
      allPaths: [],
      selectedFileNames: []
    }
  }

  componentWillMount = (props) => {
    let files = []
    let dirs = []
    axios(`https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/`).then(res => {
      res
        .data
        .forEach(v => v.type === 'file'
          ? files.push(v.path)
          : dirs.push(v.path))
      this.setState({githubLink: `https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/`, allFiles: files, allDirs: dirs})
    })
  }

  select = e => {
    let target = e.target
    let selectedFileNames = this.state.selectedFileNames;
    if (selectedFileNames.indexOf(target.innerText) >= 0) {
      selectedFileNames.splice(selectedFileNames.indexOf(target.innerText), 1)
      this.setState({selectedFileNames: selectedFileNames})
    } else {
      selectedFileNames.push(target.innerText)
      this.setState({selectedFileNames: selectedFileNames})
    }
  }

  selectDirs = e => {
    let files = this.state.allFiles
    let dirs = this.state.allDirs
    let paths = this.state.allPaths
    dirs.splice(dirs.indexOf(e.target.innerText), 1)
    // console.log('dirs', dirs) this.setState({allDirs: dirs})
    paths.push(e.target.innerText)
    axios(`https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/${e.target.innerText}`).then(res => {
      console.log('res.data !!!!', res.data)
      res
        .data
        .forEach(v => {
          if (v.type === 'file') {
            files.push(v.path)
            this.setState({allFiles: files})
          } else {
            dirs.push(v.path)
            this.setState({allDirs: dirs, allPaths: paths})
          }
        })
    })
  }

  render() {
    console.log('state', this.state)

    return (
      <div id="choose-files">
        <h2>Choose up to 5 files that relate to your issue</h2>

        <div id="select-files-container">

          <div className="column">
            <h3>Directories</h3>
            {this
              .state
              .allDirs
              .map(v => <p onClick={this.selectDirs}>{v}</p>)}
          </div>

          <div className="column">
            <h3>Files</h3>
            {this
              .state
              .allFiles
              .map(v => <p onClick={this.select}>{v}</p>)}
          </div>

          <div id="embed-list">
            <h3>Embedding</h3>
            <div id="file-names">
              {this
                .state
                .selectedFileNames
                .map(v => <p>{v}</p>)}
            </div>
          </div>
        </div>
        <div className="fullWidth">
          <Link to="/issues/new/edit">
            <button>Done</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default ChooseFiles
