import React, { Component } from 'react';
import axios from 'axios';
import UserList from './components/UsersList/userslist';
import UserForm from './components/UsersForm/usersform';
import ErrorBoundary from './components/ErrorBoundary/errorboundary';
import './App.css'

class App extends Component {
  state = {
    users: [],
    error: null,
    currentUser: null,
  };

  // Fetch users from API
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      this.setState({ users: response.data });
    } catch (error) {
      this.setState({ error: 'Failed to load users' });
    }
  };

  handleEdit = (user) => {
    this.setState({ currentUser: user });
    alert('User updated successfully');
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState({ users: this.state.users.filter((user) => user.id !== id) });
      alert('User deleted successfully');
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  handleSave = async (updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      this.setState({
        users: this.state.users.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        ),
        currentUser: null, // Clear edit state
      });
      alert('User updated successfully');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  render() {
    const { users, error,currentUser } = this.state;

    return (
      <ErrorBoundary>
        <div className="App">
          <h1 class="title">User Management</h1>
          {error && <p>{error}</p>}
          <UserForm currentUser={currentUser} onSave={this.handleSave} />
          <UserList users={users} onEdit={this.handleEdit} onDelete={this.handleDelete} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
