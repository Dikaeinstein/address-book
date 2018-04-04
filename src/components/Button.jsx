import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { value, btnClassList, ...otherProps } = props;

  return (
    <button className={btnClassList} {...otherProps}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  btnClassList: PropTypes.string.isRequired,
};

export default Button;
