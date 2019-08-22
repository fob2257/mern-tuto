import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextFieldGroup from './common/TextFieldGroup';

import { logInUserAction } from '../actions/userAction';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    this.props.logInUserAction({ ...this.state });
  };

  redirectIfAuthenticated = ({ isAuthenticated }) => (isAuthenticated) ? this.props.history.push('/dashboard') : null;

  componentDidMount() {
    const { userReducer: user } = this.props;

    this.redirectIfAuthenticated(user);
  };

  componentWillReceiveProps(nextProps) {
    const {
      userReducer: user,
      errorReducer: errors
    } = nextProps;

    this.redirectIfAuthenticated(user);

    if (errors) {
      this.setState({ errors });
    }
  }

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Log In</h1>
              <p className='lead text-center'>Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={this.onChange}
                  errors={errors}
                />
                <TextFieldGroup
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={this.onChange}
                  errors={errors}
                />
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Login.propTypes = {
  userReducer: PropTypes.object.isRequired,
  errorReducer: PropTypes.object.isRequired,
  logInUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReducer, errorReducer }) => ({ userReducer, errorReducer });

const mapDispatchToProps = { logInUserAction };

export default connect(mapStateToProps, mapDispatchToProps)(Login)
