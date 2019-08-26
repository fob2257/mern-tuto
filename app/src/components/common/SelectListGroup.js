import React from 'react'
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  value,
  onChange,
  options,
  info,
  errors,
}) => (
    <div className='form-group'>
      <select
        className={`form-control form-control-lg ${errors.hasOwnProperty(name) && 'is-invalid'}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {
          options.map(({ label, value }, i) => (<option key={i} value={value}>{label}</option>))
        }
      </select>
      {
        info && <small className='form-text text-muted'>{info}</small>
      }
      {
        errors.hasOwnProperty(name) && errors[name].map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>)
      }
    </div>
  );

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  info: PropTypes.string,
  errors: PropTypes.object,
};

SelectListGroup.defaultProps = {
  options: [],
  errors: {},
};

export default SelectListGroup;
