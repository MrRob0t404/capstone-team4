import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class ChooseFiles extends Component {
  constructor(){
    super();
    this.state = {
      allFiles: ['index.html', 'style.css', 'app.js'],
      selectedFileNames: []
    }
  }

  select = e => {
    let target = e.target
    let selectedFileNames = this.state.selectedFileNames;
    if(selectedFileNames.indexOf(target.innerText) >= 0) {
      selectedFileNames.splice(selectedFileNames.indexOf(target.innerText), 1)
      this.setState({selectedFileNames: selectedFileNames})
    }else {
      selectedFileNames.push(target.innerText)
      this.setState({selectedFileNames: selectedFileNames})
    }
  }


  render(){
    return(
      <div id="choose-files">
        <h2>Choose up to 5 files that relate to your issue</h2>
        <div id="select-files-container">
          <div id="files">
            {this.state.allFiles.map(v => <p onClick={this.select}>{v}</p>)}
          </div>
          <div id="embed-list">
            <h3>Files</h3>
            <div id="file-names">
              {this.state.selectedFileNames.map(v => <p>{v}</p>)}
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
