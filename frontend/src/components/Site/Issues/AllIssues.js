import React from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';
import '../../.././CSS/Issues.css';

class AllIssues extends React.Component {
  constructor() {
    super()
    this.state = {
      userdata: []
    }
  }

  componentDidMount(){
    axios
    .get('/users/getTicketFeed')
    .then(res => {
        this.setState({
          userdata: res.data.data
        })
    })
    .catch(err => {
      console.log(`err fetching feed`, err)
    })
  }


  renderIssues = () => {
    const { userdata } = this.state
    return userdata.map((v, i) =>
      <div class="issue" id={`${i}`}>
        <img src={v.profilepic} />{" "}
        <Link to={`/profile/${v.username}`}> <p>{v.username}</p></Link>
        <p>{v.ticketdate}</p>
        <Link to={`/issues/${v.id}`}>
        <h3>{v.title}</h3></Link>
        <p>{v.responses === '0' ? 'No Responses!, be the first!' : `${v.responses} Responses`}</p>
        <p>Status: <span className={v.problemstatus === '0' ? 'open' : 'closed'}>{v.problemstatus === '0' ? 'Open' : 'Closed'}</span></p>
      </div>)
  }

  render () {
    const { userdata } = this.state
    console.log(`userdata`,userdata)
      return (
        <div id="issues">
          <nav id="issues-filter">
            <div>
              <Link to='/issues/open'><button>Open</button></Link>
              <Link to='/issues/solved'><button>Solved</button></Link>
              <Link to='/issues/all'><button>All</button></Link>
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

export default AllIssues;
