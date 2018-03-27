import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

class NewIssue extends Component {
  constructor() {
    super();
  }

  render() {
    const {inputHandler, clickHandler, message} = this.props;
    return (
      <div id="newIssue">
        <div className="input-container">
          <div className="helper">
            <h3>Title</h3>
            <p>ex. Whenever I rerender my routes dont work.</p>
          </div>
          <input name="title" onChange={inputHandler}/>
        </div>
        <div className="input-container">
          <div className="helper">
            <h3>Repository</h3>
            <p>ex. https://github.com/username/project</p>
          </div>
          <input name="repositoryLink" onChange={inputHandler}/>
        </div>
        <div className="fullWidth">
          <p className="message">{message}</p>
          <button onClick={clickHandler}>Next</button>
        </div>
      </div>
    )
  }
}

export default NewIssue
