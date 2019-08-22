import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
  redirectIfAuthenticated = ({ isAuthenticated }) => (isAuthenticated) ? this.props.history.push('/dashboard') : null;

  componentDidMount() {
    const { userReducer: user } = this.props;

    this.redirectIfAuthenticated(user);
  };

  render() {
    return (
      <div className='landing'>
        <div className='dark-overlay landing-inner text-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <h1 className='display-3 mb-4'>Developer Connector
              </h1>
                <p className='lead'> Create a developer profile/portfolio, share posts and get help from other developers</p>
                <hr />
                <Link to='/register' className='btn btn-lg btn-info mr-2'>Sign Up</Link>
                <Link to='/login' className='btn btn-lg btn-light'>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Landing.propTypes = {
  userReducer: PropTypes.object.isRequired,
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
