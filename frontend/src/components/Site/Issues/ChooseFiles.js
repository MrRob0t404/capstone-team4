import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';

class ChooseFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      allFiles: [],
      allDir: [],
      selectedFileNames: []
    }
  }

  componentWillMount = (props) => {
    axios(`https://api.github.com/repos/simongaviria1/${this.props.repositoryName}/contents/`).then(response => {
      this.setState({
        githubLink: `https://api.github.com/repos/simongaviria1/${this.props.repositoryName}/contents/`,
        allFiles: response
          .data
          .filter(ele => {
            if (ele.type === 'file') {
              return ele
            }
          }),
        allDir: response
          .data
          .filter(ele => {
            if (ele.type === 'dir') {
              return ele
            }
          })
      })
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

  navUrl = () => {}

  selectDir = (e, props) => {
    const {allDir, repositoryLink} = this.state
    let target = e.target.innerText

    console.log('target', target)
    axios(`${repositoryLink}` + `/contents` + `${target}`).then(response => {
      this.setState({
        repositoryLink: repositoryLink + target,
        allFiles: response
          .data
          .filter(ele => {
            if (ele.type === 'file') {
              return ele
            }
          }),
        allDir: response
          .data
          .filter(ele => {
            if (ele.type === 'dir' && this.state.allDir.indexOf(ele) === -1) {
              return ele
            }
          })
      })
    })
    this.navUrl();
  }

  render() {
    console.log('props:', this.props.repositoryName)
    console.log('Choose Files state:', this.state)

    return (
      <div id="choose-dir">
        <h2>Choose up to 5 files that relate to your issue</h2>

        <div id="select-files-container">

          <div className="column">
            {this
              .state
              .allDir
              .map(v => <p onClick={this.selectDir}>{v.name}</p>)}
          </div>

          <div className="column">
            {this
              .state
              .allFiles
              .map(v => <p onClick={this.select}>{v.name}</p>)}
          </div>

          <div id="embed-list">
            <h3>Files</h3>
            <div id="file-names">
              {this
                .state
                .selectedFileNames
                .map(v => <p>{v}</p>)}
            </div>
          </div>
        </div>
        <div className="fullWidth">
          <button>Done</button>
        </div>
      </div>
    )
  }
}

export default ChooseFiles
