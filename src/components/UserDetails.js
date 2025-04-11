import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  margin-top: 2rem;
  background: #fafafa;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const DetailRow = styled.div`
  margin-bottom: 0.8rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #444;
  display: inline-block;
  min-width: 90px;
`;

const Value = styled.span`
  color: #333;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: #e04b4b;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  margin-top: 1rem;

  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #c0392b;
  }
`;

class UserDetails extends Component {
  render() {
    const { name, email, phone, website, address } = this.props.user;
    return (
      <Box>
        <Title>{name}</Title>
        <DetailRow>
          <Label>Email:</Label>
          <Value>{email}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Phone:</Label>
          <Value>{phone}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Website:</Label>
          <Value>{website}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Address:</Label>
          <Value>
            {address.street}, {address.city}
          </Value>
        </DetailRow>
        <CloseButton onClick={this.props.onClose}>Close</CloseButton>
      </Box>
    );
  }
}

export default UserDetails;
