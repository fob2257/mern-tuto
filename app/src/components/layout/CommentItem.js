import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteCommentPost } from '../../actions/postAction';

const CommentItem = ({
  postId,
  data,
  showActions = true,
  userReducer: user,
  deleteCommentPost,
}) => (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <img
            className='rounded-circle d-none d-md-block'
            src={data.avatar}
            alt={`${data.firstName} ${data.lastName}`}
          />
          <br />
          <p className='text-center'>{`${data.firstName} ${data.lastName}`}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>
            {data.text}
          </p>
          {
            (showActions && data.user._id === user.data.id) ? (
              <button
                type='button'
                onClick={() => deleteCommentPost({ postId, commentId: data._id })}
                className='btn btn-danger mr-1'>
                <i className='fas fa-times' />
              </button>
            ) : null
          }
        </div>
      </div>
    </div>
  );

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  userReducer: PropTypes.object.isRequired,
  deleteCommentPost: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  postId: '',
  data: {},
  showActions: true,
  userReducer: {},
  deleteCommentPost: f => f,
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = { deleteCommentPost };

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
