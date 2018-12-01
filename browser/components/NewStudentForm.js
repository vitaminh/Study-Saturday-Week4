import React, { Component } from 'react';

import axios from 'axios';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
};

export default class NewStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addStudent(this.state);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name </label>
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
