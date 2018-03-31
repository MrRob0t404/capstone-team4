import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

class NewIssue extends Component {
  constructor() {
    super();
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
        <div className="fullWidth">
          <p className="message">{message}</p>
          <input type="submit" onClick={clickHandler} value="Next" />
        </div>
      </form>
    )
  }
}

export default NewIssue
