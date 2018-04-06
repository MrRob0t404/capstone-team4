import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import '../../.././CSS/LandingPage.css';
import LaptopCode from './LaptopCode'

class Landing extends Component {
  constructor(){
    super();
    this.state = {
      doesCodeMatch: true,
      editedSnippit: 'var i = 0',
      selectedFileNames: ['index.html']
    }
  }

  onChange = e => {
    let value = e.target.value
    this.setState({editedSnippit: value})
    value !== 'var i = 0' ?
      this.setState({doesCodeMatch: false}) :
      this.setState({doesCodeMatch: true})
  }

  select = e => {
    let target = e.target
    let selectedFileNames = this.state.selectedFileNames;
    if(target.className) {
      target.className = ''
      selectedFileNames.splice(selectedFileNames.indexOf(target.innerText), 1)
      this.setState({selectedFileNames: selectedFileNames})
    }else {
      target.className = 'selected'
      selectedFileNames.push(target.innerText)
      this.setState({selectedFileNames: selectedFileNames})
    }
  }

  render(){
    console.log(LaptopCode)
    return(
      <div id="landing">

        <div id="header">
          <div className="laptop">
            {LaptopCode()}
          </div>
          <div className="text">
            <h2>Tyro
            <br/>[tahy-roh]
            <br/>noun, plural tyros
            <br/>1.  a beginner in learning anything; novice.
            </h2>
            <p>With our easy to use interface, get answers to your coding problems with our side by side editor feature.  </p>
          </div>
          <button id="mobile-button">Sign Up</button>
        </div>

        <div id="choose">
          <div className="text">
            <h1>Choosing Files</h1>
            <p>Upload your GitHub repo and select the files that you need help on. 
              <br/>
              <br/>
            You also have the option to upload individual code snippets. 
            </p>
          </div>
          <div className="interaction">
            <p className="selected" onClick={this.select}>index.html</p>
            <p onClick={this.select}>style.css</p>
            <p onClick={this.select}>app.js</p>
          </div>
          <div id="embed">
            <p>Emedding files</p>
            <ul>
              {this.state.selectedFileNames.map(v => <li>{v}</li>)}
            </ul>
          </div>
        </div>

        <div id="dual">
          <div className="text">
            <h1>Dual Editors</h1>
            <p>Side by Side editors easily show the difference, between your code and multiple solutions</p>
          </div>
          <div className="interaction">
            <div className="screen">
              {LaptopCode()}
            </div>
            <div className="screen">
              {LaptopCode()}
            </div>
          </div>
        </div>

        <div id="edit">
          <div className="text">
            <h1>Highlighting Differences</h1>
            <p>To select specific parts of your code, the text will be highlighted a different color from the solution code</p>
          </div>
          <div className="interaction">
            <input className={this.state.doesCodeMatch ? '' : 'green-focus'} id="immutable" value='var i = 0' disabled />
            <input className={this.state.doesCodeMatch ? '' : 'blue-focus'} id="mutable" value={this.state.editedSnippit} onChange={this.onChange} />
            <p>try to edit the code</p>
          </div>
        </div>

      </div>
    )
  }
}

export default Landing
