import React from 'react';
import { Row, Col, Form } from 'antd';
import classNames from 'classnames/bind';

const FormItem = ({
  id,
  className,
  children,
  label,
  labelPlacement = 'vertical',
  labelClassName,
  rules,
  dependencies,
  hidden,
  valuePropName,
  labelCol,
  fieldKey,
  name,
  rowClassName,
  theme,
  validateTrigger = 'onBlur',
}) => {
  const isRequired = rules && rules.find((item) => item.required);

  return (
    <Row
      id={id}
      className={classNames({
        inputHorizontal: labelPlacement === 'horizontal',
        [rowClassName]: [rowClassName],
      })}
    >
      {label && (
        <Col span={labelPlacement === 'horizontal' ? 12 : 24}>
          <div
            className={classNames({
              [className]: !!className,
              inputLabel: true,
              [labelClassName]: [labelClassName],
              [theme]: !!theme,
              required: isRequired,
            })}
          >
            {label}
          </div>
        </Col>
      )}
      <Col
        className={classNames({ [theme]: !!theme })}
        span={labelPlacement === 'horizontal' ? 12 : 24}
      >
        <Form.Item
          name={name}
          rules={rules}
          dependencies={dependencies}
          hidden={hidden}
          valuePropName={valuePropName}
          labelCol={labelCol}
          fieldKey={fieldKey}
          validateTrigger={validateTrigger}
        >
          {children}
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormItem;
