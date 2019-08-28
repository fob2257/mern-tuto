import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileAction';

const Experiences = (props) => {
  const onDeleteClick = id => props.deleteExperience(id);

  return (
    <div>
      <h4 className='mb-4'>Experience Credentials</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        {
          props.data.map((obj, i) => (
            <tr key={obj._id}>
              <td>{obj.company}</td>
              <td>{obj.title}</td>
              <td>
                <Moment format='YYYY/MM/DD' date={obj.from} /> - {(obj.to) ? <Moment format='YYYY/MM/DD' date={obj.to} /> : 'Now'}
              </td>
              <td>
                <button onClick={() => onDeleteClick(obj._id)} className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  );
};

Experiences.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteExperience };

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);
