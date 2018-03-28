import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Issues extends React.Component {
  constructor() {
    super();
    this.state = {
      userdata: []
    }
  }


  componentDidMount(){
    axios
    .get(`/users/getUserTicketFeed/${this.props.username}`)
    .then(res => {
      this.setState({
        userdata: res.data.data
      })
      this.props.setUser(this.props.username)
    })
    .catch(err => {
      console.log(`err fetching userTicketFeed`, err)
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
            <p>{v.responses === '0' ? 'No Responses!, be the first!' : `${v.responses} Response(s)`}</p>
            <p>Status: <span className={v.problemstatus === '0' ? 'open' : 'closed'}>{v.problemstatus === '0' ? 'Open' : 'Closed'}</span></p>
        </div>)
}


  render () {
    const { userdata } = this.state;
    console.log(`userData`, userdata)
    return (
      <div id="issues-container">
            {this.renderIssues()}
          </div>
    )
  }
}

export default Issues;
