import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';

class ChooseFiles extends Component {
  constructor() {
    super();
    this.state = {
      placeholder: '',
      allFiles: [],
      allDirs: [],
      allPaths: []
    }
  }

  componentWillMount = (props) => {
    axios(`https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/`).then(res => {
      this.setState({
        githubLink: `https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/`,
        allPaths: [this.makeObjForDir('root', res.data)]
      })
    })
  }

  selectDirs = e => {
    e.target.style.display = 'none';
    let paths = this.state.allPaths
    let path = e.target.dataset.path
    axios(`https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/${path}`).then(res => {
      paths.push(this.makeObjForDir(path, res.data))
      this.setState({allPaths: paths})
    })
  }

  makeObjForDir = (name, contentsArr) => {
    let obj = {
      name,
      files: [],
      dirs: []
    }
    contentsArr.forEach(v => v.type==="file"?
      obj.files.push(v):
      obj.dirs.push(v))
    return obj
  }

  render() {
    return (
      <div id="choose-files">
        <h2>Choose up to 5 files that relate to your issue</h2>

        <div class="container">
          <div class="panel-group" id="accordion">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Directories</a>
                </h4>
              </div>
              <div id="collapse1" class="panel-collapse collapse in">
                <div class="panel-body">
                {this
                  .state
                  .allPaths
                  .map(v => {if(v.dirs[0]){
                    return(
                      <div className="mobile-path-container">
                        <h3>{v.name}</h3>
                        {v.dirs.map((v, i) => <button data-path={v.path} onClick={this.selectDirs}>{v.name}</button>)}
                      </div>
                    )
                  }})}</div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Files</a>
                </h4>
              </div>
              <div id="collapse2" class="panel-collapse collapse">
                <div class="panel-body">
                {this
                  .state
                  .allPaths
                  .map(v => {if(v.files[0]){
                    return(
                      <div className="mobile-path-container">
                        <h3>{v.name}</h3>
                        {v.files.map((v, i) => <p data-path={v.path} onClick={this.props.selectFile}>{v.name}</p>)}
                      </div>
                    )
                  }})}</div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Embedding</a>
                </h4>
              </div>
              <div id="collapse3" class="panel-collapse collapse">
                <div class="panel-body">
                  {this
                    .props
                    .selectedFileNames
                    .map(v => <p data-path={v} onClick={this.props.selectFile}>{v}</p>)}</div>
              </div>
            </div>
          </div>
        </div>

        <div id="select-files-container">

          <div className="column">
            <h3>Directories</h3>
            {this
              .state
              .allPaths
              .map(v => {if(v.dirs[0]){
                return(
                  <div className="path-container">
                    <h3>{v.name}</h3>
                    {v.dirs.map((v, i) => <button data-path={v.path} onClick={this.selectDirs}>{v.name}</button>)}
                  </div>
                )
              }})}
          </div>

          <div className="column">
            <h3>Files</h3>
            {this
              .state
              .allPaths
              .map(v => {if(v.files[0]){
                return(
                  <div className="path-container">
                    <h3>{v.name}</h3>
                    {v.files.map((v, i) => <p data-path={v.path} onClick={this.props.selectFile}>{v.name}</p>)}
                  </div>
                )
              }})}
          </div>

          <div className="column">
            <h3>Embedding</h3>
            <div id="file-names">
              {this
                .props
                .selectedFileNames
                .map(v => <p data-path={v} onClick={this.props.selectFile}>{v}</p>)}
            </div>
          </div>
        </div>
        <div className="fullWidth">
          <Link to="/issues/new/edit">
            <button onClick={this.props.handleClick}>Next</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default ChooseFiles
