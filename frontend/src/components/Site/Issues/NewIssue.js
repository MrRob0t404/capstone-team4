import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios, { post } from 'axios';

class NewIssue extends Component {
  constructor() {
    super();
    this.state = {
      fileObj: null,
      fileNames: []
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  //here send to backend as post request
  onFormSubmit = (e) => {
    const { clickHandler, renderNextPageFileUpload } = this.props
    const { fileObj, fileNames } = this.state
    e.preventDefault() // Stop form submit
    if (fileObj) {
      renderNextPageFileUpload(fileObj, fileNames)

    } else {
      clickHandler()
    }
    console.log("this.state.file onFormSubmit", this.state.file)
    var size = Object.keys(fileObj).length;
    console.log("size", size)
    // } else if (this.state.fileNames.length >= 5) {
    //   return console.log("exceeded file amount")
    // (Object.keys(fileObj).length <= 5)
  }

  onChange(e) {
    const { fileObj } = this.state
    const file = e.target.files[0]
    console.log("e.target.files onChange", e.target.files)

    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        fileObj: { ...this.state.fileObj, [file.name]: e.target.result },
        fileNames: [...this.state.fileNames, file.name]
      })
    }
    reader.readAsText(file)
    console.log("this.state.file onChange", this.state.file)
  }

  render() {
    console.log("this.state NewIssue.js", this.state)
    const { inputHandler, clickHandler, message } = this.props;
    const { fileObj, fileNames } = this.state;
    return (
      <form id="newIssue">
        <div className="input-container">
          <div className="helper">
            <h3>Title</h3>
            <p>ex. Whenever I rerender my routes dont work.</p>
          </div>
          <input name="title" onChange={inputHandler} autofocus="true" />
        </div>
        <div className="input-container">
          <div className="helper">
            <h3>Repository</h3>
            <p>ex. https://github.com/username/project</p>
          </div>
          <input name="repositoryLink" onChange={inputHandler} />
        </div>
        <div className="input-container">
          <div className="helper">
            <h3>File Upload</h3>
          </div>
          <input type="file" onChange={this.onChange} />
          <p>{fileNames.map(fileName => <div key={fileName}> {fileName}</div>)}</p>
          <p>{fileNames.length >= 5 ? <div>You have exceeded the max file upload amount</div> : ''}</p>
        </div>

        <p className="message">{message}</p>
        <div className="fullWidth">
          <p className="message">{message}</p>
          <input type="submit" onClick={this.onFormSubmit} value="Next" />
        </div>
      </form>
    )
  }
}

export default NewIssue


// fs = require('fs');

// fs.readFile(req.files.path, function (err, data) {
//   if (err) throw err;
//   // data will contain your file contents
//   console.log(data)

//   // delete file
//   fs.unlink(req.files.path, function (err) {
//     if (err) throw err;
//     console.log('successfully deleted ' + req.files.path);
//   });      
// });

// if (fileName.length <= 5) {
//   return (<div key={fileName}> {fileName}</div>)
// } else {
//   return (<div>You have exceeded the max file upload amount</div>)
// }
