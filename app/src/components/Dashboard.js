import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../actions/profileAction';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  };

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  };
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { getCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
