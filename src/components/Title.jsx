import React from 'react';
import PropTypes from 'prop-types';

const Title = props => (
  <header
    className="container-fluid bg-light text-center text-dark pt-3 pb-3"
  >
    <h1>{props.title}</h1>
  </header>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
