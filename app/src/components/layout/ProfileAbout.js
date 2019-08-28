import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ data }) => (
  <div className='row'>
    <div className='col-md-12'>
      <div className='card card-body bg-light mb-3'>
        <h3 className='text-center text-info'>{`${data.user.firstName}'s Bio`}</h3>
        <p className='lead'>{(data.bio) ? (<span>{data.bio}</span>) : (<span>{`${data.user.firstName}'s does not have a bio`}</span>)}</p>
        <hr />
        <h3 className='text-center text-info'>Skill Set</h3>
        <div className='row'>
          <div className='d-flex flex-wrap justify-content-center align-items-center'>
            {
              data.skills.map((skill, i) =>
                <div key={i} className='p-3'>
                  <i className='fa fa-check'></i>
                  {skill}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  </div>
);

ProfileAbout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfileAbout;
