import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProfiles } from '../actions/profileAction';

import Spinner from './layout/Spinner';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  };

  render() {
    const { profiles, loading } = this.props.profileReducer;

    return (
      <div className='profiles'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>Developer Profiles</h1>
              <div>
                {
                  (loading) ? <Spinner />
                    : (!profiles || profiles.length === 0) ? (
                      <div>
                        <h4>No profiles found...</h4>
                      </div>
                    )
                      : profiles.map((obj, i) => <ProfileItem key={i} data={obj} />)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profileReducer }) => ({ profileReducer });

const mapDispatchToProps = { getProfiles };

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
