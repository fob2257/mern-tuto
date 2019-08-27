import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({ data }) => (
  <div className='card card-body bg-light mb-3'>
    <div className='row'>
      <div className='col-2'>
        <img
          className='rounded-circle'
          src={data.user.avatar}
          alt={`${data.user.firstName} ${data.user.lastName}`}
        />
      </div>
      <div className='col-lg-6 col-md-4 col-8'>
        <h3>{`${data.user.firstName} ${data.user.lastName}`}</h3>
        <p>
          {data.status} {data.company && (<span>at {data.company}</span>)}
        </p>
        <p>
          {data.location && (<span>{data.location}</span>)}
        </p>
        <Link to={`/profiles/${data.handle}`} className='btn btn-info'> View Profile </Link>
      </div>
      <div className='col-md-4 d-none d-md-block'>
        <h4>Skill Set</h4>
        <ul className='list-group'>
          {
            data.skills.slice(0, 4).map((skill, i) =>
              <li key={i} className='list-group-item'>
                <i className='fa fa-check pr-1' />
                {skill}
              </li>
            )
          }
        </ul>
      </div>
    </div>
  </div>
);

ProfileItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfileItem;
