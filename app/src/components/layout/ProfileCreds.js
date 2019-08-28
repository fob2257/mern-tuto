import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileCreds = ({ data }) => (
  <div className='row'>
    <div className='col-md-6'>
      <h3 className='text-center text-info'>Experience</h3>
      <ul className='list-group'>
        {
          data.experience && data.experience.map((obj, i) =>
            <li key={i} className='list-group-item'>
              <h4>{obj.company}</h4>
              <p>
                <Moment format='YYYY/MM/DD' date={obj.from} /> - {(obj.to) ? <Moment format='YYYY/MM/DD' date={obj.to} /> : 'Now'}
              </p>
              <p>
                <strong>Position: </strong>
                {obj.title}
              </p>
              {
                obj.location && (
                  <p>
                    <strong>Location: </strong>
                    {obj.location}
                  </p>
                )
              }
              {
                obj.description && (
                  <p>
                    <strong>Description: </strong>
                    {obj.description}
                  </p>
                )
              }
            </li>
          )
        }
      </ul>
    </div>
    <div className='col-md-6'>
      <h3 className='text-center text-info'>Education</h3>
      <ul className='list-group'>
        {
          data.education && data.education.map((obj, i) =>
            <li key={i} className='list-group-item'>
              <h4>{obj.school}</h4>
              <p>
                <Moment format='YYYY/MM/DD' date={obj.from} /> - {(obj.to) ? <Moment format='YYYY/MM/DD' date={obj.to} /> : 'Now'}
              </p>
              <p>
                <strong>Degree: </strong>
                {obj.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {obj.degree}
              </p>
              {
                obj.description && (
                  <p>
                    <strong>Description: </strong>
                    {obj.description}
                  </p>
                )
              }
            </li>
          )
        }
      </ul>
    </div>
  </div>
);

ProfileCreds.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfileCreds;
