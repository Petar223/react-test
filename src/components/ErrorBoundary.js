import React from 'react';
import styled from 'styled-components';

const ErrorContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 42px;
  height: 100%;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0069d9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  resetError() {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContentContainer>
          <ErrorWrapper>
            <h2>Something went wrong. Please try again later.</h2>
            <Button onClick={this.resetError} variant='contained'>
              Reload
            </Button>
          </ErrorWrapper>
        </ErrorContentContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
