import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { value, ...otherProps } = props;

  return (
    <button {...otherProps}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Button;
