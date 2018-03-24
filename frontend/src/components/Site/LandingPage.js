import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import '../.././CSS/LandingPage.css';

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
    console.log(this.state)
    return(
      <div id="landing">

        <div id="header">
          <div className="laptop">
            <div className="line">
              <span className="keyword">const</span> greeting = <span className="string">'Hello World!'</span>;
            </div>
            <div className="line">
              <span className="keyword">const</span> devNames = [<span className="string">'Monique'</span>, <span className="string">'Simon'</span>, <span className="string">'Newton'</span>, <span className="string">'Elon'</span>, <span className="string">'Carlo'</span>];
            </div>
            <div className="line">
              <span className="keyword">const</span> numDevsOnTeam = devNames.length;
            </div>
          </div>
          <div className="text">
            <h2>Lorem ipsum dolor amet crucifix ennui poke succulents fixie asymmetrical. </h2>
            <p>Quinoa fanny pack tattooed retro man bun, yuccie schlitz hell of flannel waistcoat ugh
            glossier raclette readymade. Vhs literally health goth meditation meggings.</p>
          </div>
          <div id="background">
          </div>
        </div>

        <div id="choose">
          <div className="text">
            <h1>Choosing Files</h1>
            <p>Quinoa fanny pack tattooed retro man bun, yuccie schlitz hell of flannel waistcoat ugh
            glossier raclette readymade. Vhs literally health goth meditation meggings.</p>
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
          <h1>Dual Editors</h1>
          <p>Quinoa fanny pack tattooed retro man bun, yuccie schlitz hell of flannel waistcoat ugh
          glossier raclette readymade. Vhs literally health goth meditation meggings.</p>
          <div className="interaction">
            <div className="screen"></div>
            <div className="screen"></div>
          </div>
        </div>

        <div id="edit">
          <div className="text">
            <h1>Highlighting Differences</h1>
            <p>Quinoa fanny pack tattooed retro man bun, yuccie schlitz hell of flannel waistcoat ugh
            glossier raclette readymade. Vhs literally health goth meditation meggings.</p>
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
