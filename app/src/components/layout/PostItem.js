import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deletePost } from '../../actions/postAction';

const PostItem = ({
  data,
  userReducer: user,
  deletePost,
}) => (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <Link to={`/profiles/${1}`}>
            <img
              className='rounded-circle d-none d-md-block'
              src={data.avatar}
              alt={`${data.firstName} ${data.lastName}`}
            />
          </Link>
          <br />
          <p className='text-center'>{`${data.firstName} ${data.lastName}`}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>
            {data.text}
          </p>
          <button type='button' className='btn btn-light mr-1'>
            <i className='text-info fas fa-thumbs-up'></i>
            <span className='badge badge-light'>{data.likes.length}</span>
          </button>
          <button type='button' className='btn btn-light mr-1'>
            <i className='text-secondary fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${data._id}`} className='btn btn-info mr-1'>
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
      </div>
    </div>);

PostItem.propTypes = {
  data: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = { deletePost };

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
