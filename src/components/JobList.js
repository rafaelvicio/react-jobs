import React, { Component, Fragment } from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class JobList extends Component {
  
  state = {
    newJobText: '',
  }

  renderJobList = () => (
    <ul>
      {this.props.jobs.jobs.map(job =>
        <li key={job._id}>{job.name}</li>
      )}
    </ul>
  )

  addJob = () => {
    const { newJobText } = this.state;
    console.log('-------------> ', this.props)
    this.props.addJob({
      variables: { name: newJobText },
      update: (proxy, { data: { createJob } }) => {
        this.props.jobs.refetch();

      }
    })
  }

  render() {
    const { jobs } = this.props;

    return (
      <Fragment>
        { jobs.loading
          ? <p>Carregando...</p>
          : this.renderJobList() }

        <input
          type="text"
          value={this.state.newJobText}
          onChange={e => this.setState({ newJobText: e.target.value })}
        />
        <input type="submit" value="Criar" onClick={this.addJob} />
      </Fragment>
    );
  }
}

const JobsQuery = gql`
  query {
    jobs {
      _id
      name
    }
  }
`;

const JobsMutation = gql`
  mutation ($text: String!) {
    createJob ( name: $text ) {
      _id
      name
    }
  }
`;

export default compose(
  graphql(JobsQuery, { name: 'jobs' }),
  graphql(JobsMutation, { name: 'addJob' }),
)(JobList);
