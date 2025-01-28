import React, { Component } from 'react';
import axios from 'axios';
import './usersform.css'

class UserForm extends Component {
  state = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({id: '',
      firstName: '',
      lastName: '',
      email: '',
      department: '',})
    try {
      await axios.post('https://jsonplaceholder.typicode.com/users', {
        id: this.state.id,
        name: `${this.state.firstName} ${this.state.lastName}`,
        email: this.state.email,
      });
      alert('User added successfully');
    } catch (error) {
      alert('Failed to add user');
    }
  };

  render() {
    const { firstName, lastName, email, department } = this.state;

    return (
      <div>
        <h2>Add New User</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="firstName" value={firstName} onChange={this.handleChange} placeholder="First Name" required />
          <input type="text" name="lastName" value={lastName} onChange={this.handleChange} placeholder="Last Name" required />
          <input type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email" required />
          <input type="text" name="department" value={department} onChange={this.handleChange} placeholder="Department" required />
          <div>
          <button className='add-user-button' type="submit">Add User</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserForm;
