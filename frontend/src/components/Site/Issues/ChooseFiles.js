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
      let path = [this.makePathObj('root', res.data)]
      console.log('!!!!!!!!!!!!!!!!!', path)
      res.data.forEach(v => v.type === 'file' ? files.push(v.path) : dirs.push(v.path))
      this.setState({
        githubLink: `https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/`,
        allFiles: files,
        allDirs: dirs,
        allPaths: path
      })
    })
  }

  select = e => {
    let path = e.target.dataset.path
    let selectedFileNames = this.state.selectedFileNames;
    if (selectedFileNames.indexOf(path) >= 0 || selectedFileNames.indexOf(e.target.innerText) >= 0) {
      selectedFileNames.splice(selectedFileNames.indexOf(path), 1)
      this.setState({selectedFileNames: selectedFileNames})
    } else {
        selectedFileNames.push(path)
        this.setState({selectedFileNames: selectedFileNames})
    }
  }

  selectDirs = e => {
    let paths = this.state.allPaths
    let path = e.target.dataset.path
    e.target.disabled = true
    console.log('fjdsls', path[e.target.dataset.index])
    axios(`https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/${path}`)
      .then(res => {
        paths.push(this.makePathObj(path, res.data))
        this.setState({allPaths: paths})
      })
  }

  makePathObj = (name, contentArr) => {
    let obj = {
      name: name,
      files: [],
      dirs: []
    }

    contentArr.forEach(v => {
      v.type === 'file'?
        obj.files.push(v):
        obj.dirs.push(v)
    })
    return obj
  }

  render() {
    console.log('state', this.state)

    return (
      <div id="choose-files">
        <h2>Choose up to 5 files that relate to your issue</h2>

        <div id="select-files-container">

          <div className="column">
            <h3>Directories</h3>
            {this.state.allPaths.map(v => {
               console.log(v.name)
                if(v.dirs[0]){
                  return (<div className="path-container">
                    <h3>{v.name}</h3>
                    {v.dirs.map((v,i) =>
                      <button data-path={v.path} data-index={i} onClick={this.selectDirs}>{v.name}</button>
                    )}
                  </div>)
              }})
            }
          </div>

          <div className="column">
            <h3>Files</h3>
            {this.state.allPaths.map(v => {
               console.log(v.name)
                if(v.files[0]){
                  return (<div className="path-container">
                    <h3>{v.name}</h3>
                    {v.files.map(v =>
                      <button data-path={v.path} onClick={this.select}>{v.name}</button>
                    )}
                  </div>)
              }})
            }
          </div>

          <div className="column" id="embed-list">
            <h3>Embedding</h3>
            <div id="file-names">
              {this
                .state
                .selectedFileNames
                .map(v => <p onClick={this.select}>{v}</p>)}
            </div>
          </div>
        </div>
        <div className="fullWidth">
          <Link to="/issues/new/edit"><button>Done</button></Link>
        </div>
      </div>
    )
  }
}

export default ChooseFiles
