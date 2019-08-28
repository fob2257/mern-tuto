import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createPost } from '../../actions/postAction';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      errors: {},
    };
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;

    this.props.createPost({ text });
    this.setState({ text: '' });
  };

  componentWillReceiveProps(nextProps) {
    const { errorReducer: errors } = nextProps;

    if (errors) {
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>
            Say Something...
          </div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <TextAreaFieldGroup
                  placeholder='Create A Post'
                  name='text'
                  value={this.state.text}
                  onChange={this.onChange}
                  errors={this.state.errors}
                />
              </div>
              <input type='submit' className='btn btn-dark' />
            </form>
          </div>
        </div>
      </div>
    );
  };
};

PostForm.propTypes = {
  errorReducer: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ errorReducer }) => ({ errorReducer });

const mapDispatchToProps = { createPost };

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
