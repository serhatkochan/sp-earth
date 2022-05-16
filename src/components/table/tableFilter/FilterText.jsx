import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import Input from 'components/input';

const FilterText = ({ onChange, placeholder, value, type, mask }) => {
  const [filterValue, setFilterValue] = useState(null);

  useEffect(() => {
    setFilterValue(value);
  }, [value]);

  const sendChange = (q) => {
    if (onChange) {
      onChange(q);
    }
  };

  const delayedChange = useCallback(
    debounce((q) => sendChange(q), 350),
    [onChange]
  );

  const handleChange = (e) => {
    setFilterValue(e.target.value);
    delayedChange(e.target.value);
  };

  return (
    <Input
      label={placeholder}
      placeholder={placeholder}
      value={filterValue}
      onChange={handleChange}
      theme="dark"
      type={type ? type : 'text'}
      mask={mask ? mask : ''}
    />
  );
};

FilterText.propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.any,
  mask: PropTypes.any,
};

export default FilterText;
