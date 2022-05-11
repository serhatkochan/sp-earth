import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import classNames from 'classnames/bind';

import FormItem from 'components/formItem';

import './index.scss';

const { Option, OptGroup } = Select;

const Dropdown = (props) => {
  const {
    className,
    children,
    options = [],
    onChange,
    onSelect,
    bordered = true,
    displayLabel = 'label',
    displayValue = 'value',
    labelRender,
    onSearch,
    showSearch = true,
    searchType = 'valueAndText',
    value,
    allowClear,
    placeholder,
    withGrouped = false,
    groupedOptions = {},
    mode,
    disabled,
    withNoneOption = false,
    autoComplete,
  } = props;
  return (
    <FormItem {...props} rowClassName="dropdown">
      <Select
        className={classNames({ [className]: className })}
        bordered={bordered}
        disabled={disabled}
        defaultValue={value}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        showSearch={showSearch}
        onSelect={onSelect}
        optionFilterProp="children"
        autoClearSearchValue={true}
        allowClear={allowClear}
        placeholder={placeholder}
        mode={withGrouped ? 'multiple' : mode}
        autoComplete={autoComplete}
        maxTagCount={withGrouped && 5}
        filterOption={(input, option) => {
          const inputText = input ? input.toLowerCase() : '';
          const optionText = option.children
            ? option.children.toLowerCase()
            : '';
          const optionValue = option.value
            ? option.value.toString().toLowerCase()
            : '';
          let filterResult = false;

          if (searchType === 'valueAndText') {
            filterResult =
              optionText.includes(inputText) || optionValue.includes(inputText);
          } else if (searchType === 'onlyText') {
            filterResult = optionText.includes(inputText);
          }

          return filterResult;
        }}
      >
        {withNoneOption && (
          <Option key={-1} value={''}>
            {' '}
            {'None'}
          </Option>
        )}
        {withGrouped
          ? Object.keys(groupedOptions).length &&
            Object.keys(groupedOptions).map((group, index) => (
              <OptGroup key={group} label={group}>
                {groupedOptions[group]?.map((item) => (
                  <Option key={`${index}_${item.name}`} value={item.id}>
                    {item.id}
                  </Option>
                ))}
              </OptGroup>
            ))
          : options.map((option, index) => (
              <Option
                key={`${index}_${option[displayValue]}`}
                value={option[displayValue]}
              >
                {labelRender ? labelRender(option) : option[displayLabel]}
              </Option>
            ))}
        {children}
      </Select>
    </FormItem>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  bordered: PropTypes.bool,
  displayLabel: PropTypes.string,
  displayValue: PropTypes.string,
  labelRender: PropTypes.func,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  showSearch: PropTypes.bool,
  searchType: PropTypes.oneOf(['valueAndText', 'onlyText']),
  onSelect: PropTypes.func,
  allowClear: PropTypes.bool,
  placeholder: PropTypes.string,
  withNoneOption: PropTypes.bool,
};

export default Dropdown;
