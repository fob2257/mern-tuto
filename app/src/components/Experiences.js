import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from '../actions/profileAction';

class Experiences extends Component {
  onDeleteClick = id => this.props.deleteExperience(id);

  render() {
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
            this.props.data.map((obj, i) => (
              <tr key={obj._id}>
                <td>{obj.company}</td>
                <td>{obj.title}</td>
                <td>
                  <Moment format='YYYY/MM/DD' date={obj.from} /> - {(obj.to) ? <Moment format='YYYY/MM/DD' date={obj.to} /> : 'Now'}
                </td>
                <td>
                  <button onClick={() => this.onDeleteClick(obj._id)} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))
          }
        </table>
      </div>
    );
  };
};

Experiences.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => null;

const mapDispatchToProps = { deleteExperience };

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);
