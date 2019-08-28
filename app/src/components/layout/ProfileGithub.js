import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileGithub extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: '9fb6f4add4725aaf0a20',
      clientSecret: '7d3600e86c636ddd7b024299f1ec2e84ab15c400',
      count: 5,
      sort: 'created: asc',
      repos: [],
    };
  };

  componentDidMount() {
    const { githubUsername } = this.props.data;
    const {
      clientId,
      clientSecret,
      count,
      sort,
    } = this.state;

    fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(res => {
        if (this.ref.myRef) {
          this.setState({ repos: res });
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const { repos } = this.state;

    return (
      <div ref='myRef'>
        <hr />
        <h3 className='mb-4'>Latest Github Repos</h3>
        {
          repos && repos.map((repo, i) =>
            <div key={i} className='card card-body mb-2'>
              <div className='row'>
                <div className='col-md-6'>
                  <h4>
                    <Link to={repo.html_url} className='text-info' target='_blank'>
                      {repo.name}
                    </Link>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div className='col-md-6'>
                  <span className='badge badge-info mr-1'>
                    Stars: {repo.stargazers_count}
                  </span>
                  <span className='badge badge-secondary mr-1'>
                    Watchers: {repo.watchers_count}
                  </span>
                  <span className='badge badge-success'>
                    Forks: {repo.forks_count}
                  </span>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  };
};

ProfileGithub.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfileGithub;
