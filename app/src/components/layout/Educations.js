import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteEducation } from '../../actions/profileAction';

const Educations = (props) => {
  const onDeleteClick = id => props.deleteEducation(id);

  return (
    <div>
      <h4 className='mb-4'>Experience Credentials</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th></th>
          </tr>
        </thead>
        {
          props.data.map((obj, i) => (
            <tr key={obj._id}>
              <td>{obj.school}</td>
              <td>{obj.degree}</td>
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

Educations.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteEducation };

export default connect(mapStateToProps, mapDispatchToProps)(Educations);
