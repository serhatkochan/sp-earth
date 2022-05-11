import React from 'react';
import { Checkbox as AntCheckbox, Form } from 'antd';

const Checkbox = ({
  label,
  name,
  rules,
  dependencies,
  hidden,
  className,
  valuePropName = 'checked',
  defaultValue,
}) => {
  return (
    <Form.Item
      name={name}
      rules={rules}
      dependencies={dependencies}
      hidden={hidden}
      className={className}
      valuePropName={valuePropName}
      initialValue={defaultValue}
    >
      <AntCheckbox>{label}</AntCheckbox>
    </Form.Item>
  );
};

export default Checkbox;
