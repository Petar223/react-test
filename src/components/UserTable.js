import React, { Component } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledThead = styled.thead`
  background-color: #f9f9f9;
`;

const StyledTr = styled.tr`
  &:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const StyledTh = styled.th`
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
  cursor: pointer;
  user-select: none;
`;

const StyledTd = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
  &[contenteditable] {
    background-color: transparent;
    outline: none;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff5c5c;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e04b4b;
  }
`;

class UserTable extends Component {
  handleEdit = (id, key, e) => {
    this.props.onEdit(id, key, e.target.innerText);
  };

  render() {
    return (
      <StyledTable>
        <StyledThead>
          <StyledTr>
            <StyledTh onClick={() => this.props.onSort('name')}>
              Name{' '}
              {this.props.sortKey === 'name'
                ? this.props.sortOrder === 'asc'
                  ? '▲'
                  : '▼'
                : '⇅'}
            </StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>City</StyledTh>
            <StyledTh>Actions</StyledTh>
          </StyledTr>
        </StyledThead>
        <tbody>
          {this.props.users.map((user) => (
            <StyledTr key={user.id} onClick={() => this.props.onSelect(user)}>
              <StyledTd
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => this.handleEdit(user.id, 'name', e)}
              >
                {user.name}
              </StyledTd>
              <StyledTd
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => this.handleEdit(user.id, 'email', e)}
              >
                {user.email}
              </StyledTd>
              <StyledTd>{user.address.city}</StyledTd>
              <StyledTd>
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    this.props.onDelete(user.id);
                  }}
                >
                  Delete
                </DeleteButton>
              </StyledTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    );
  }
}

export default UserTable;
