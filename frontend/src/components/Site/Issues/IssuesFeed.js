import React from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';
import '../../.././CSS/Issues.css';

class IssuesFeed extends React.Component {
  constructor() {
    super()
    this.state = {
      userdata: [],
      filter: 'open'
    }
  }

  componentDidMount(){
    this.openIssues()
  }


  renderIssues = () => {
    const { userdata } = this.state
    return userdata.map((v, i) =>
      <div class="issue" id={`${i}`}>
        <img src={v.profilepic} />{" "}
        <div>
          <Link to={`/profile/${v.username}`}>{v.username}</Link>
          <p>{v.ticketdate}</p>
        </div>
        <Link to={`/issues/${v.id}`}>
        <h3>{v.title}</h3></Link>
        <div>
          <p>{v.responses === '0' ? 'No Responses!, be the first!' : `${v.responses} Responses`}</p>
          <p>Status: <span className={v.problemstatus === '0' ? 'open' : 'closed'}>{v.problemstatus === '0' ? 'Open' : 'Closed'}</span></p>
        </div>
      </div>)
  }

  openIssues = () => {
    axios
      .get('/users/getTicketFeed')
      .then(res => {
        this.setState({
          userdata: res.data.data.filter(issue => issue.problemstatus === '0'),
          filter: 'open'
        })
      })
      .catch(err => {
        console.log(`err fetching feed`, err)
      })
  }

  solvedIssues = () => {
    axios
      .get('/users/getTicketFeed')
      .then(res => {
        this.setState({
          userdata: res.data.data.filter(issue => issue.problemstatus === '1'),
          filter: 'solved'
        })
      })
      .catch(err => {
        console.log(`err fetching feed`, err)
      })
  }

  allIssues = () => {
    axios
    .get('/users/getTicketFeed')
    .then(res => {
        this.setState({
          userdata: res.data.data,
          filter: 'all'
        })
    })
    .catch(err => {
      console.log(`err fetching feed`, err)
    })
  }

  render () {
    const { userdata } = this.state
    console.log(`userdata`,userdata)
      return (
        <div id="issues">
          <nav id="issues-filter">
            <div>
              <button className={this.state.filter==='open'? 'underline' : ''} onClick={this.openIssues}>Open</button>
              <button className={this.state.filter==='solved'? 'underline' : ''} onClick={this.solvedIssues}>Solved</button>
              <button className={this.state.filter==='all'? 'underline' : ''} onClick={this.allIssues}>All</button>
            </div>
            <Link to="/issues/new">New</Link>
          </nav>
          <div id="issues-container">
            {this.renderIssues()}
          </div>
        </div>
      )
    }
}

export default IssuesFeed;
