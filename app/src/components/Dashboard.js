import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from './layout/Spinner';
import { getCurrentProfile } from '../actions/profileAction';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  };

  render() {
    const { data } = this.props.userReducer;
    const { profile, loading } = this.props.profileReducer;

    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Dashboard</h1>
              {
                (loading) ? <Spinner />
                  : (!profile) ? (
                    <div>
                      <p className='lead text-muted'>Welcome {`${data.firstName} ${data.lastName}`}</p>
                      <p>You have not yet setup a profile, please add some info.</p>
                      <Link to='/create-profile' className='btn btn-lg btn-info'>
                        Create Profile
                      </Link>
                    </div>
                  )
                    : 'A profile was found'
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Dashboard.propTypes = {
  profileReducer: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReducer, profileReducer }) => ({ userReducer, profileReducer });

const mapDispatchToProps = { getCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
