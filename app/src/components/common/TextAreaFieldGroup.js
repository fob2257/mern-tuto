import React from 'react'
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  placeholder,
  name,
  value,
  onChange,
  info,
  errors = {},
}) => (
    <div className='form-group'>
      <textarea
        className={`form-control form-control-lg ${errors.hasOwnProperty(name) && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        style={{ resize: 'none' }}
        rows={3}
      />
      {
        info && <small className='form-text text-muted'>{info}</small>
      }
      {
        errors.hasOwnProperty(name) && errors[name].map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>)
      }
    </div>
  );

TextAreaFieldGroup.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  errors: PropTypes.object,
};

export default TextAreaFieldGroup;
