import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from './common/TextFieldGroup';

import { registerUserAction } from '../actions/userAction';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      password2,
    } = this.state;

    this.props.registerUserAction({
      firstName,
      lastName,
      email,
      password,
      password2,
    }, this.props.history);
  };

  redirectIfAuthenticated = ({ isAuthenticated }) => (isAuthenticated) ? this.props.history.push('/dashboard') : null;

  componentDidMount() {
    const { userReducer: user } = this.props;

    this.redirectIfAuthenticated(user);
  };

  componentWillReceiveProps(nextProps) {
    const {
      userReducer: user,
      errorReducer: errors,
    } = nextProps;

    this.redirectIfAuthenticated(user);

    if (errors) {
      this.setState({ errors });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      password2,
      errors,
    } = this.state;

    return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Sign Up</h1>
              <p className='lead text-center'>Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type='text'
                  placeholder='First Name'
                  name='firstName'
                  value={firstName}
                  onChange={this.onChange}
                  errors={errors}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                  value={lastName}
                  onChange={this.onChange}
                  errors={errors}
                />
                <TextFieldGroup
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={this.onChange}
                  info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
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
                <TextFieldGroup
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
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

Register.propTypes = {
  userReducer: PropTypes.object.isRequired,
  errorReducer: PropTypes.object.isRequired,
  registerUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
  errorReducer: state.errorReducer,
});

const mapDispatchToProps = { registerUserAction };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
