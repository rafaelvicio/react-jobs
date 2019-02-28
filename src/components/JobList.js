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
    const { newJobName } = this.state;
    console.log('-------------> ', this.props)
    this.props.addJob({
      variables: { name: newJobName },
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
          value={this.state.newJobName}
          onChange={e => this.setState({ newJobName: e.target.value })}
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
  mutation ($name: String!) {
    createJob ( name: $name ) {
      _id
      name
    }
  }
`;

export default compose(
  graphql(JobsQuery, { name: 'jobs' }),
  graphql(JobsMutation, { name: 'addJob' }),
)(JobList);
