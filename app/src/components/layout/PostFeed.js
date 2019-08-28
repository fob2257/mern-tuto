import React from 'react';
import PropTypes from 'prop-types';

import PostItem from './PostItem';

const PostFeed = ({ posts }) => (
  <div className='posts'>
    {
      posts.map((post, i) => <PostItem key={i} data={post} />)
    }
  </div>
)

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};

PostFeed.defaultProps = {
  posts: [],
};

export default PostFeed;
