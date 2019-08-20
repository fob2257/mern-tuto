import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
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
      errors,
    } = this.state;

    if (password !== password2) {
      return this.setState({
        errors: {
          password2: 'Password did not matched'
        },
      });
    }

    axios.post('/api/users/register/', {
      firstName,
      lastName,
      email,
      password,
    })
      .then(res => console.log(res))
      .catch((error) => {
        const { response: { data } } = error;

        this.setState({
          errors: { ...data },
        });
      });
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
                <div className='form-group'>
                  <input
                    type='text'
                    className={`form-control form-control-lg ${errors.hasOwnProperty('firstName') && 'is-invalid'}`}
                    placeholder='First Name'
                    name='firstName'
                    value={firstName}
                    onChange={this.onChange} />
                  {
                    errors.hasOwnProperty('firstName') && <div className='invalid-feedback'>{errors.firstName}</div>
                  }
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className={`form-control form-control-lg ${errors.hasOwnProperty('lastName') && 'is-invalid'}`}
                    placeholder='Last Name'
                    name='lastName'
                    value={lastName}
                    onChange={this.onChange} />
                  {
                    errors.hasOwnProperty('lastName') && <div className='invalid-feedback'>{errors.lastName}</div>
                  }
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className={`form-control form-control-lg ${errors.hasOwnProperty('email') && 'is-invalid'}`}
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={this.onChange} />
                  <small className='form-text text-muted'>This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  {
                    errors.hasOwnProperty('email') && <div className='invalid-feedback'>{errors.email}</div>
                  }
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={`form-control form-control-lg ${(errors.hasOwnProperty('password') || errors.hasOwnProperty('password2')) && 'is-invalid'}`}
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={this.onChange} />
                  {
                    errors.hasOwnProperty('password') && <div className='invalid-feedback'>{errors.password}</div>
                  }
                  {
                    errors.hasOwnProperty('password2') && <div className='invalid-feedback'>{errors.password2}</div>
                  }
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={`form-control form-control-lg ${(errors.hasOwnProperty('password') || errors.hasOwnProperty('password2')) && 'is-invalid'}`}
                    placeholder='Confirm Password'
                    name='password2'
                    value={password2}
                    onChange={this.onChange} />
                  {
                    errors.hasOwnProperty('password') && <div className='invalid-feedback'>{errors.password}</div>
                  }
                  {
                    errors.hasOwnProperty('password2') && <div className='invalid-feedback'>{errors.password2}</div>
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
