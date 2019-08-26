import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextFieldGroup from './common/TextFieldGroup';
import TextAreaFieldGroup from './common/TextAreaFieldGroup';
import SelectListGroup from './common/SelectListGroup';
import InputGroup from './common/InputGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: '',
      status: '',
      company: '',
      website: '',
      location: '',
      skills: '',
      githubUsername: '',
      bio: '',
      social: {
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
      },
      errors: {},
    };
  };

  changeDisplaySocialInputs = () => this.setState({ displaySocialInputs: !this.state.displaySocialInputs });

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const options = [
      '* Select Professional Status',
      'Developer',
      'Junior Developer',
      'Senior Developer',
      'Manager',
      'Student or Learning',
      'Instructor or Teacher',
      'Intern',
      'Other',
    ].map((o, i) => ({ label: o, value: (i === 0) ? i : o }));

    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Create Your Profile</h1>
              <p className='lead text-center'>
                Let's get some information to make your profile stand out
              </p>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type='text'
                  placeholder='* Profile Handle'
                  name='handle'
                  value={this.state.handle}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='A unique handle for your profile URL.'
                />
                <SelectListGroup
                  name='status'
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  info='Give us an idea of where you at in your career'
                  errors={this.state.errors}
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='Could be your own company or one you work for'
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Website'
                  name='website'
                  value={this.state.website}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='Could be your own website or a company one'
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
                <TextFieldGroup
                  type='text'
                  placeholder='* Skills'
                  name='skills'
                  value={this.state.skills}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='Please use comma separated values (eg. HTML5, CSS3, JavaScript, ES6)'
                />
                <TextFieldGroup
                  type='text'
                  placeholder='Github Username'
                  name='githubUsername'
                  value={this.state.githubUsername}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='If you want your latest repos and a Github link, include your username'
                />
                <TextAreaFieldGroup
                  placeholder='Short Bio'
                  name='bio'
                  value={this.state.bio}
                  onChange={this.onChange}
                  errors={this.state.errors}
                  info='Tell us a litte abou yourself'
                />
                <div className='mb-3'>
                  <button
                    className='btn btn-light'
                    onClick={this.changeDisplaySocialInputs}>
                    Add Social Network Links
                    </button>
                  {' '}
                  <span className='text-muted'>Optional</span>
                </div>
                {
                  (this.state.displaySocialInputs) ?
                    (
                      <div>
                        <InputGroup
                          placeholder='Twitter Profile URL'
                          name='social.twitter'
                          icon='fab fa-twitter'
                          value={this.state.social.twitter}
                          onChange={this.onChange}
                          errors={this.errors}
                        />
                        <InputGroup
                          placeholder='Facebook Profile URL'
                          name='social.facebook'
                          icon='fab fa-facebook'
                          value={this.state.social.facebook}
                          onChange={this.onChange}
                          errors={this.errors}
                        />
                        <InputGroup
                          placeholder='LinkedIn Profile URL'
                          name='social.linkedin'
                          icon='fab fa-linkedin'
                          value={this.state.social.linkedin}
                          onChange={this.onChange}
                          errors={this.errors}
                        />
                        <InputGroup
                          placeholder='Youtube Profile URL'
                          name='social.youtube'
                          icon='fab fa-youtube'
                          value={this.state.social.youtube}
                          onChange={this.onChange}
                          errors={this.errors}
                        />
                        <InputGroup
                          placeholder='Instagram Profile URL'
                          name='social.instagram'
                          icon='fab fa-instagram'
                          value={this.state.social.instagram}
                          onChange={this.onChange}
                          errors={this.errors}
                        />
                      </div>
                    )
                    : null
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

CreateProfile.propTypes = {
  profileReducer: PropTypes.object.isRequired,
  errorReducer: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profileReducer, errorReducer }) => ({ profileReducer, errorReducer });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
