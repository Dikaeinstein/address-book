import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = (props) => {
  const { value, onChange, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <div className="input-group">
        <input
          className="form-control py-2 border-right-0 border"
          type="search"
          value={value}
          aria-label="search contact"
          placeholder="search contact"
          onChange={onChange}
        />
        <span className="input-group-append">
          <div className="input-group-text bg-transparent">
            <i className="fa fa-search" />
          </div>
        </span>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
