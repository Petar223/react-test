import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 25%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 16px;
`;

class Filter extends Component {
  handleChange = (e) => {
    this.props.onFilter(e.target.value);
  };

  render() {
    return (
      <Input
        type='text'
        placeholder='Search by name or email'
        value={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default Filter;
