import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addEducation } from '../actions/profileAction';

import TextFieldGroup from './common/TextFieldGroup';
import TextAreaFieldGroup from './common/TextAreaFieldGroup';

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
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

    const { to, description } = this.state;

    const optionalValues = this.checkForEmptyValues({ to, description });

    if (this.state.current) {
      optionalValues.to = undefined;
    }

    this.props.addEducation({ ...this.state, ...optionalValues }, this.props.history)
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
      <div className='add-education'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Add Education</h1>
              <p className='lead text-center'>
                Add any school, bootcamp, course, etc that you have attended
              </p>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type='text'
                  placeholder='* School'
                  name='school'
                  value={this.state.school}
                  onChange={this.onChange}
                  errors={this.state.errors}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='* Degree Or Certification'
                  name='degree'
                  value={this.state.degree}
                  onChange={this.onChange}
                  errors={this.state.errors}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='* Field Of Study'
                  name='fieldOfStudy'
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  errors={this.state.errors}
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
                    Current Education
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder='Education Description'
                  name='description'
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='Some additional information about your education'
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

AddEducation.propTypes = {
  profileReducer: PropTypes.object.isRequired,
  errorReducer: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = ({ errorReducer, profileReducer }) => ({ errorReducer, profileReducer });

const mapDispatchToProps = { addEducation };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));
