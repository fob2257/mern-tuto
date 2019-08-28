import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../actions/profileAction';
import { deleteUserAction } from '../actions/userAction';

import Spinner from './layout/Spinner';
import ProfileActions from './layout/ProfileActions';
import Experiences from './layout/Experiences';
import Educations from './layout/Educations';

class Dashboard extends Component {
  onDeleteMyAccount = () => this.props.deleteUserAction();

  componentDidMount() {
    this.props.getCurrentProfile();
  };

  render() {
    const { data } = this.props.userReducer;
    const { profile, loading } = this.props.profileReducer;

    const fullName = `${data.firstName} ${data.lastName}`;

    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Dashboard</h1>
              <div>
                <p className='lead text-muted'>Welcome {(profile) ?
                  (<Link to={`/profiles/${profile.handle}`}>{fullName}</Link>) : `${fullName}`}</p>
                {
                  (loading) ? <Spinner />
                    : (!profile) ? (
                      <div>
                        <p>You have not yet setup a profile, please add some info.</p>
                        <Link to='/create-profile' className='btn btn-lg btn-info'>
                          Create Profile
                        </Link>
                      </div>
                    )
                      : (
                        <div>
                          {/* <p>A profile was found</p> */}
                          <ProfileActions />
                          <Experiences data={(profile.experience) ? profile.experience : []} />
                          <Educations data={(profile.education) ? profile.education : []} />
                          <div style={{ marginBottom: '60px' }} />
                          <button onClick={this.onDeleteMyAccount} className='btn btn-danger'>Delete My Account</button>
                        </div>
                      )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Dashboard.propTypes = {
  userReducer: PropTypes.object.isRequired,
  profileReducer: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReducer, profileReducer }) => ({ userReducer, profileReducer });

const mapDispatchToProps = { getCurrentProfile, deleteUserAction };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
