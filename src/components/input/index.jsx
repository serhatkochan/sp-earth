import React from 'react';
import { Input as AntInput, InputNumber } from 'antd';
import MaskedInput from 'antd-mask-input';
import FormItem from '../formItem';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Input = (props) => {
  const {
    autoComplete = 'off',
    placeholder = '',
    onSearch,
    onChange,
    defaultValue,
    value,
    children,
    disabled = false,
    readOnly = false,
    autoSize = undefined,
    suffix,
    type,
    controls = false,
    max,
    min,
    rows,
    maxLength,
    minLength,
    loading,
    mask,
  } = props;

  const renderInput = (type) => {
    switch (type) {
      case 'password':
        return (
          <AntInput.Password
            autoComplete={autoComplete}
            placeholder={placeholder}
            disabled={disabled}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        );
      case 'search':
        return (
          <div className="searchInputContainer">
            <AntInput.Search
              autoComplete={autoComplete}
              placeholder={placeholder}
              defaultValue={defaultValue}
              value={value}
              disabled={disabled}
              onChange={onChange}
              maxLength={maxLength}
              minLength={minLength}
              onSearch={onSearch}
              loading={loading}
            />
          </div>
        );
      case 'textArea':
        return (
          <AntInput.TextArea
            autoComplete={autoComplete}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
            autoSize={autoSize}
            rows={rows}
            maxLength={maxLength}
            minLength={minLength}
          />
        );
      case 'number':
        return (
          <InputNumber
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            controls={controls}
            max={max}
            min={min}
            autoComplete={autoComplete}
          />
        );
      case 'masked':
        return (
          <MaskedInput
            autoComplete={autoComplete}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
            suffix={suffix}
            maxLength={maxLength}
            minLength={minLength}
            mask={mask}
          />
        );
      default:
        return (
          <AntInput
            autoComplete={autoComplete}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}
            value={value}
            disabled={disabled}
            suffix={suffix}
            maxLength={maxLength}
            minLength={minLength}
          />
        );
    }
  };
  return (
    <FormItem {...props} rowClassName="input">
      {children || renderInput(type)}
    </FormItem>
  );
};

export default Input;
