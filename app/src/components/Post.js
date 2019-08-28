import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPost } from '../actions/postAction';

import Spinner from './layout/Spinner';
import PostItem from './layout/PostItem';
import CommentForm from './layout/CommentForm';
import CommentFeed from './layout/CommentFeed';

class Post extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.id) {
      this.props.getPost(match.params.id);
    }
  };

  render() {
    const { post, loading } = this.props.postReducer;

    return (
      <div className='post'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Link to='/feed' className='btn btn-light mb-3'>Back To Feed</Link>
              {
                (loading || !post || !Object.keys(post).length) ? <Spinner />
                  : (
                    <div>
                      <PostItem data={post} showActions={false} />
                      <CommentForm postId={post._id} />
                      <CommentFeed postId={post._id} comments={(post.comments) ? post.comments : []} />
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
};

Post.propTypes = {
  postReducer: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ postReducer }) => ({ postReducer });

const mapDispatchToProps = { getPost };

export default connect(mapStateToProps, mapDispatchToProps)(Post);
