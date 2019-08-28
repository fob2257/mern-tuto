import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';

const CommentFeed = ({ postId, comments }) => (
  <div className='comments'>
    {
      comments.map((comment, i) => <CommentItem key={i} postId={postId} data={comment} />)
    }
  </div>
)

CommentFeed.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

CommentFeed.defaultProps = {
  postId: '',
  comments: [],
};

export default CommentFeed;
