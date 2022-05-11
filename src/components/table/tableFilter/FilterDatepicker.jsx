import React from 'react';
import moment from 'moment';

import DatePicker from 'components/datepicker';

const FilterDatepicker = ({ onChange, placeholder, value }) => {
  return (
    <DatePicker
      label={placeholder}
      placeholder={placeholder}
      value={value ? moment(value) : null}
      onChange={(value) => onChange(value)}
      theme="light"
    />
  );
};

export default FilterDatepicker;
