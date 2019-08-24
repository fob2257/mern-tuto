import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, userReducer, ...rest }) =>
  (
    <Route
      {...rest}
      render={props => userReducer.isAuthenticated ? (<Component {...props} />) : (<Redirect to='/login' />)}
    />
  );

PrivateRoute.propTypes = {
  userReducer: PropTypes.object.isRequired,
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
