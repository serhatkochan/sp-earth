import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import api from 'services/axios/api';
import Dropdown from 'components/dropdown';

export const FilterDropdown = ({
  value,
  placeholder,
  filterProps,
  onSelect,
  labelRender,
  mode,
}) => {
  const { options } = filterProps;
  const [defaultOptions, setDefaultOptions] = useState([]);
  const searchResponseLabel = filterProps.label ? filterProps.label : 'name';
  const searchResponseValue = filterProps.value ? filterProps.value : 'value';
  const searchUrl = filterProps.url ? filterProps.url : null;

  useEffect(() => {
    fillDefaultOptions();
  }, [options]);

  const getQuery = async () => {
    // if (searchUrl) {
    //     await api.get(searchUrl).then((response) => {
    //         setDefaultOptions(response.data.docs);
    //     }).catch(() => {
    //         setDefaultOptions([]);
    //     });
    // }
  };

  const fillDefaultOptions = () => {
    if (options && options.length > 0) {
      setDefaultOptions(options);
    } else {
      getQuery();
    }
  };

  return (
    <Dropdown
      label={placeholder}
      options={defaultOptions}
      value={value}
      onSelect={(value, option) => {
        if (!mode) {
          onSelect(value, option.children);
        }
      }}
      onChange={(value, options) => {
        if (mode) {
          if (value.length > 0) {
            onSelect(value, options.map((option) => option.children).join(','));
          } else {
            onSelect(null, null);
          }
        }
      }}
      showSearch={true}
      placeholder={placeholder}
      displayLabel={searchResponseLabel}
      displayValue={searchResponseValue}
      allowClear={true}
      labelRender={labelRender}
      mode={mode}
      theme="dark"
    />
  );
};

FilterDropdown.propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  filterProps: PropTypes.object,
};

export default FilterDropdown;
