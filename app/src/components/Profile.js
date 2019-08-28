import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfileByHandle } from '../actions/profileAction';

import ProfileHeader from './layout/ProfileHeader';
import ProfileAbout from './layout/ProfileAbout';
import ProfileCreds from './layout/ProfileCreds';
import ProfileGithub from './layout/ProfileGithub';
import Spinner from './layout/Spinner';

class Profile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.handle) {
      this.props.getProfileByHandle(match.params.handle);
    }
  };

  render() {
    const { profile, loading } = this.props.profileReducer;

    return (
      <div className='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              {
                (loading) ? <Spinner />
                  : (!profile) ? (
                    this.props.history.push('/not-found')
                  )
                    : (
                      <div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <Link to='/profiles' className='btn btn-light mb-3 float-left'>Back To Profiles</Link>
                          </div>
                          <div className='col-md-6' />
                        </div>
                        <ProfileHeader data={profile} />
                        <ProfileAbout data={profile} />
                        <ProfileCreds data={profile} />
                        {profile.githubUsername && <ProfileGithub data={profile} />}
                      </div>
                    )
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Profile.propTypes = {
  profileReducer: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profileReducer }) => ({ profileReducer });

const mapDispatchToProps = { getProfileByHandle };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
