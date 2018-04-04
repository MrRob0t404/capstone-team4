import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
const fs = require('fs');


class NewIssue extends Component {
  constructor() {
    super();
  }

  handleUpload = e => {
    let file = e.target.files[0]
    let data = new FormData()
    // data.append
    console.log(`i asked for this`,file)
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
    
  }

  render() {
    const {inputHandler, clickHandler, message} = this.props;
    return (
      <form id="newIssue">
        <div className="input-container">
          <div className="helper">
            <h3>Title</h3>
            <p>ex. Whenever I rerender my routes dont work.</p>
          </div>
          <input name="title" onChange={inputHandler} autofocus="true"/>
        </div>
        <div className="input-container">
          <div className="helper">
            <h3>Repository</h3>
            <p>ex. https://github.com/username/project</p>
          </div>
          <input name="repositoryLink" onChange={inputHandler}/>
        </div>
        <div className="input-container">
          <div className="helper">
            <h3>File</h3>
          </div>
          <input type="file" name="repositoryLink" onChange={this.handleUpload}/>
        </div>
        <p className="message">{message}</p>
        <div className="fullWidth">
          <input type="submit" onClick={clickHandler} value="Next" />
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