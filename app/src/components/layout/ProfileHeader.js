import React from 'react';
import PropTypes from 'prop-types';

const ProfileHeader = ({ data }) => (
  <div className='row'>
    <div className='col-md-12'>
      <div className='card card-body bg-info text-white mb-3'>
        <div className='row'>
          <div className='col-4 col-md-3 m-auto'>
            <img
              className='rounded-circle'
              src={data.user.avatar}
              alt={`${data.user.firstName} ${data.user.lastName}`}
            />
          </div>
        </div>
        <div className='text-center'>
          <h1 className='display-4 text-center'>{`${data.user.firstName} ${data.user.lastName}`}</h1>
          <p className='lead text-center'>
            {data.status} {data.company && (<span>at {data.company}</span>)}
          </p>
          <p>
            {data.location && (<span>{data.location}</span>)}
          </p>
          <p>
            {
              data.website && (
                <a className='text-white p-2' href={data.website} target='_blank'>
                  <i className='fas fa-globe fa-2x'></i>
                </a>
              )
            }
            {
              data.social && data.social.twitter && (
                <a className='text-white p-2' href={data.social.twitter} target='_blank'>
                  <i className='fab fa-twitter fa-2x'></i>
                </a>
              )
            }
            {
              data.social && data.social.facebook && (
                <a className='text-white p-2' href={data.social.facebook} target='_blank'>
                  <i className='fab fa-facebook fa-2x'></i>
                </a>
              )
            }
            {
              data.social && data.social.linkedin && (
                <a className='text-white p-2' href={data.social.linkedin} target='_blank'>
                  <i className='fab fa-linkedin fa-2x'></i>
                </a>
              )
            }
            {
              data.social && data.social.youtube && (
                <a className='text-white p-2' href={data.social.youtube} target='_blank'>
                  <i className='fab fa-youtube fa-2x'></i>
                </a>
              )
            }
          </p>
        </div>
      </div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfileHeader;
