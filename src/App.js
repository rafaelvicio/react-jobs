import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './services/apollo';

import JobList from './components/JobList';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <JobList />
      </ApolloProvider>
    );
  }
}

export default App;
