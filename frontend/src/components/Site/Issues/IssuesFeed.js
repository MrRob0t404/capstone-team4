import React from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import '../../.././CSS/Issues.css';

class IssuesFeed extends React.Component {
  constructor() {
    super()
    this.state = {
      userdata: [],
      filter: 'open',
      filterInput: ''
    }
  }

  componentDidMount() {
    this.openIssues()
  }


  renderIssues = () => {
    const { userdata, filterInput } = this.state;
    return userdata.filter(data => data.title.toLowerCase().includes(filterInput.toLowerCase()) ||
      data.problem_description.toLowerCase().slice(0,100).includes(filterInput.toLowerCase())).map((v, i) =>
        <div class="issue" id={`${i}`}>
          <img src={v.profile_pic} />{" "}
          <div>
            <Link to={`/profile/${v.username}`}>{v.username}</Link>
            <p>{v.ticketdate}</p>
          </div>
          <Link to={`/issues/${v.id}`}>
            <h3>{v.title}</h3></Link>
          <p>{v.problem_description}</p>
          <div>
            <p>{v.responses === '0' ? 'No responses, be the first!' : `${v.responses} Responses`}</p>
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

  filterInput = (e) => {
    this.setState({
      filterInput: e.target.value,
    })
  }

  render() {
    const { userdata } = this.state
    console.log(`userdata`, userdata)
    return (
      <div id="issues">
        <nav id="issues-filter">
          <div>
            <button className={this.state.filter === 'open' ? 'underline' : ''} onClick={this.openIssues}>Open</button>
            <button className={this.state.filter === 'solved' ? 'underline' : ''} onClick={this.solvedIssues}>Solved</button>
            <button className={this.state.filter === 'all' ? 'underline' : ''} onClick={this.allIssues}>All</button>
          </div>
          <Link to="/issues/new">New</Link>
        </nav>
        <div id="issues-container">
          <input type="text" placeholder="enter an issue or description" onChange={this.filterInput} />
          {this.renderIssues()}
        </div>
      </div>
    )
  }
}

export default IssuesFeed;
