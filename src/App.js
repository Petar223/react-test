import React, { Component } from 'react';
import Filter from './components/Filter';
import UserTable from './components/UserTable';
import UserDetails from './components/UserDetails';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  font-family: sans-serif;
  padding: 2rem;
  background-color: #f2f2f2;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  text-align: start;
  margin-bottom: 2rem;
`;

const Loading = styled.div`
  font-size: 24px;
  text-align: center;
  margin-top: 100px;
  color: #666;
`;

class App extends Component {
  state = {
    users: [],
    filtered: [],
    selectedUser: null,
    filterText: '',
    loading: true,
    sortKey: null,
    sortOrder: 'asc',
  };

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        this.setState({ users: data, filtered: data, loading: false });
      }
    };
    xhr.send();
  }

  handleSort = (key) => {
    const { sortKey, sortOrder, users, filtered } = this.state;

    const isSameKey = sortKey === key;
    const isAsc = sortOrder === 'asc';
    const isDesc = sortOrder === 'desc';

    if (isSameKey && isDesc) {
      this.setState({
        filtered: [...users],
        sortKey: null,
        sortOrder: null,
      });
      return;
    }

    const nextOrder = isSameKey && isAsc ? 'desc' : 'asc';

    const sortedUsers = [...filtered].sort((a, b) => {
      const valA = (a[key] || '').toString().toLowerCase();
      const valB = (b[key] || '').toString().toLowerCase();

      if (valA < valB) return nextOrder === 'asc' ? -1 : 1;
      if (valA > valB) return nextOrder === 'asc' ? 1 : -1;
      return 0;
    });

    this.setState({
      filtered: sortedUsers,
      sortKey: key,
      sortOrder: nextOrder,
    });
  };

  handleFilter = (text) => {
    const filtered = this.state.users.filter(
      (user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ filterText: text, filtered });
  };

  deleteUser = (id) => {
    const users = this.state.users.filter((user) => user.id !== id);
    this.setState({ users, filtered: users });
  };

  editUser = (id, key, value) => {
    const users = this.state.users.map((user) => {
      if (user.id === id) user[key] = value;
      return user;
    });
    this.setState({ users, filtered: users });
  };

  selectUser = (user) => {
    this.setState({ selectedUser: user });
  };

  render() {
    return this.state.loading ? (
      <Wrapper>
        <Loading>Loading...</Loading>
      </Wrapper>
    ) : (
      <Wrapper>
        <Container>
          <Heading>User Management</Heading>
          <Filter onFilter={this.handleFilter} value={this.state.filterText} />
          <UserTable
            users={this.state.filtered}
            onDelete={this.deleteUser}
            onEdit={this.editUser}
            onSelect={this.selectUser}
            onSort={this.handleSort}
            sortKey={this.state.sortKey}
            sortOrder={this.state.sortOrder}
          />
          {this.state.selectedUser && (
            <UserDetails
              user={this.state.selectedUser}
              onClose={() => this.setState({ selectedUser: null })}
            />
          )}
        </Container>
      </Wrapper>
    );
  }
}

export default App;
