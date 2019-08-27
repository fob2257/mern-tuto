import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addExperience } from '../actions/profileAction';

import TextFieldGroup from './common/TextFieldGroup';
import TextAreaFieldGroup from './common/TextAreaFieldGroup';

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
    };
  };

  checkForEmptyValues = (obj = {}) => Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: (value && value.length >= 1) ? value : undefined,
  }), {});

  onCheck = () => this.setState({ current: !this.state.current });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const { location, to, description } = this.state;

    const optionalValues = this.checkForEmptyValues({ location, to, description });

    if (this.state.current) {
      optionalValues.to = undefined;
    }

    this.props.addExperience({ ...this.state, ...optionalValues }, this.props.history)
  };

  componentWillReceiveProps(nextProps) {
    const {
      errorReducer: errors
    } = nextProps;

    if (errors) {
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div className='add-experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Add Experience</h1>
              <p className='lead text-center'>
                Add any job or position that you had in the past or current
              </p>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type='text'
                  placeholder='* Title'
                  name='title'
                  value={this.state.title}
                  onChange={this.onChange}
                  errors={this.state.errors}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='* Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={this.state.errors}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Location'
                  name='location'
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='City or city & state suggested (eg. Boston, MA)'
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  type='date'
                  name='from'
                  value={this.state.from}
                  onChange={this.onChange}
                  errors={this.state.errors}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type='date'
                  name='to'
                  value={this.state.to}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  disabled={this.state.current ? 'disabled' : ''}
                />
                <div className='form-check mb-4'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='current'
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id='current'
                  />
                  <label htmlFor='current' className='form-check-label'>
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder='Job Description'
                  name='description'
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='Some additional information about the position'
                />
                <input type='submit' value='Submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

AddExperience.propTypes = {
  profileReducer: PropTypes.object.isRequired,
  errorReducer: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
};

const mapStateToProps = ({ errorReducer, profileReducer }) => ({ errorReducer, profileReducer });

const mapDispatchToProps = { addExperience };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));
