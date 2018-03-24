import React from 'react';
import {Link, Route} from 'react-router-dom';
import '../../.././CSS/Issues.css';

class Issues extends React.Component {
  constructor() {
    super()
    this.state = {
      userdata: {
        name: 'Jane Doe',
        date: '3/11/18',
        status: 'Open',
        responses: 3,
        title: "Why doesn't my for loop work?.",
        profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        ticketID: 3
      }
    }
  }

  renderIssues = () => {
    let allIssues = [this.state.userdata, this.state.userdata, this.state.userdata]
    return allIssues.map((v, i) =>
      <div class="issue" id={`${i}`}>
        <img src={v.profilePic} />
        <p>{v.name}</p>
        <p>{v.date}</p>
        <Link to={`/issues/${i+1}`}>
        <h3>{v.title}</h3></Link>
        <p>{`${v.responses} Responses`}</p>
        <p>Status: <span className={v.status.toLowerCase()}>{v.status}</span></p>
      </div>)
  }

  render () {
    console.log(this.renderIssues())
      return (
        <div id="issues">
          <nav id="issues-filter">
            <div>
              <button>Open</button>
              <button>Solved</button>
              <button>All</button>
            </div>
            <Link to="issues/new">New</Link>
          </nav>
          <div id="issues-container">
            {this.renderIssues()}
          </div>
        </div>
      )
    }
}

export default Issues;
