import React from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      visiting: [],
      message: '',
      submitted: false,
      fullname: '',
      username: '',
      email: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
      return(
          <div>
              random shit so I know it works
          </div>
      )
  }

}

export default EditProfile;
