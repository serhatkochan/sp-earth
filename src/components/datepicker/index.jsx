import React from 'react';
import { DatePicker as AntDatePicker, TimePicker as AntTimePicker } from 'antd';

import FormItem from 'components/formItem';

import './index.scss';
import { MailOutlined } from '@ant-design/icons';

const DatePicker = (props) => {
  const {
    placeholder = null,
    dateFormat = 'DD.MM.YYYY',
    timeFormat = 'HH:mm',
    onChange,
    disabledDate,
    disabledTime,
    value,
    type,
    disabled,
  } = props;

  const renderPicker = () => {
    let result = (
      <AntDatePicker
        suffixIcon={<MailOutlined />}
        placeholder={placeholder}
        format={dateFormat}
        onChange={onChange}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
        value={value}
        getPopupContainer={() => document.getElementById('datePickerContainer')}
        disabled={disabled}
      />
    );

    if (type === 'time') {
      result = (
        <AntTimePicker
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          format={timeFormat}
          getPopupContainer={() =>
            document.getElementById('datePickerContainer')
          }
          disabled={disabled}
        />
      );
    }

    return result;
  };

  return (
    <FormItem {...props} rowClassName="datepicker" id={'datePickerContainer'}>
      {renderPicker()}
    </FormItem>
  );
};

export default DatePicker;
