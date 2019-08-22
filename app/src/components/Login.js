import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
                <div className='form-group'>
                  <input
                    type='email'
                    className={`form-control form-control-lg ${errors.hasOwnProperty('email') && 'is-invalid'}`}
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={this.onChange} />
                  {
                    errors.hasOwnProperty('email') && errors.email.map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>)
                  }
                  {/* {
                    errors.hasOwnProperty('message') &&
                    ((typeof errors.message === 'string' && <div className='invalid-feedback'>{errors.message}</div>)
                      || errors.message.map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>))
                  } */}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={`form-control form-control-lg ${errors.hasOwnProperty('password') && 'is-invalid'}`}
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={this.onChange} />
                  {
                    errors.hasOwnProperty('password') && errors.password.map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>)
                  }
                </div>
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
