import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';

class ChooseFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      allData: [],
      allFiles: [],
      allDir: [],
      selectedFileNames: []
    }
  }

  componentWillMount = (props) => {
    axios(`https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/`).then(response => {
      this.setState({
        githubLink: `https://api.github.com/repos/${this.props.repoOwner}/${this.props.repositoryName}/contents/`,
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

  goBackHelper = () => {
    const {placeholder} = this.state
    this.setState({
      copyPlaceholder: placeholder.split('/')
    })
    this.setState(prevState => {
      const copyPlaceholder2 = placeholder.splice((placeholder.indexOf('src') + 1), (placeholder.length) - placeholder.indexOf('src'))
      return copyPlaceholder2;
    })
    this.setState({placeholder: placeholder})
  }

  selectDir = (e, props) => {
    const {allDir, githubLink, placeholder} = this.state
    let selectedDir = e.target.innerText
    console.log('target', selectedDir)
    placeholder.includes(selectedDir)
      ? this.goBackHelper()
      : axios(`${githubLink}` + `${selectedDir}`).then(response => {
        this.setState({
          placeholder: placeholder + `${selectedDir}/`,
          githubLink: githubLink + `${selectedDir}/`,
          allFiles: response
            .data
            .filter(ele => {
              if (ele.type === 'file') {
                return ele
              }
            }),
          allDir: allDir.concat(response.data.filter(ele => {
            if (ele.type === 'dir' && this.state.allDir.indexOf(ele) === -1) {
              return ele
            }
          }))
        })
      })
  }

  render() {
    console.log('Choose Files state:', this.state.placeholder)

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
          <button onClick={this.handleBackButton}>Back</button>
          <button>Done</button>
        </div>
      </div>
    )
  }
}

export default ChooseFiles
