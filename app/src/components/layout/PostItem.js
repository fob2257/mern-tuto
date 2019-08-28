import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePost, likePost } from '../../actions/postAction';

const PostItem = ({
  data,
  showActions = true,
  userReducer: user,
  deletePost,
  likePost,
}) => (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          {/* <Link to={`/profiles/${1}`}> */}
          <img
            className='rounded-circle d-none d-md-block'
            src={data.avatar}
            alt={`${data.firstName} ${data.lastName}`}
          />
          {/* </Link> */}
          <br />
          <p className='text-center'>{`${data.firstName} ${data.lastName}`}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>
            {data.text}
          </p>
          {
            (showActions) ?
              (
                <div>
                  <button
                    type='button'
                    onClick={() => likePost(data._id)}
                    className='btn btn-light mr-1'>
                    <i className={`fas fa-thumbs-up ${(data.likes.some(like => like.user._id === user.data.id)) ? 'text-info' : null}`}></i>
                    <span className='badge badge-light'>{data.likes.length}</span>
                  </button>
                  {/* <button type='button' className='btn btn-light mr-1'>
                    <i className='text-secondary fas fa-thumbs-down'></i>
                  </button> */}
                  <Link to={`/feed/${data._id}`} className='btn btn-info mr-1'>
                    Comments
                  </Link>
                  {
                    (data.user._id === user.data.id) ? (
                      <button
                        type='button'
                        onClick={() => deletePost(data._id)}
                        className='btn btn-danger mr-1'>
                        <i className='fas fa-times' />
                      </button>
                    ) : null
                  }
                </div>
              ) : null
          }

        </div>
      </div>
    </div>);

PostItem.propTypes = {
  data: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  userReducer: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
};

PostItem.defaultProps = {
  data: {},
  showActions: true,
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = { deletePost, likePost };

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
