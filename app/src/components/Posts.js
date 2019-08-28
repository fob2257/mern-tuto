import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts } from '../actions/postAction';

import Spinner from './layout/Spinner';
import PostForm from './layout/PostForm';
import PostFeed from './layout/PostFeed';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  };

  render() {
    const { posts, loading } = this.props.postReducer;

    return (
      <div className='feed'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <PostForm />
              <div>
                {
                  (loading) ? <Spinner />
                    : <PostFeed posts={(posts) ? posts : []} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Posts.propTypes = {
  postReducer: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ postReducer }) => ({ postReducer });

const mapDispatchToProps = { getPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
