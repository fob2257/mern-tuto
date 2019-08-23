import React from 'react'
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  disabled,
  label,
  info,
  errors = {},
}) => {
  return (
    <div className='form-group'>
      <input
        type={type}
        className={`form-control form-control-lg ${errors.hasOwnProperty(name) && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled} />
      {
        info && <small className='form-text text-muted'>{info}</small>
      }
      {
        errors.hasOwnProperty(name) && errors[name].map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>)
      }
      {/* {
        errors.hasOwnProperty('message') &&
        ((typeof errors.message === 'string' && <div className='invalid-feedback'>{errors.message}</div>)
          || errors.message.map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>))
      } */}
    </div>
  );
};

TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  errors: PropTypes.object,
};

TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
