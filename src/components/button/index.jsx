import React from 'react';
import { Button as AntButton } from 'antd';

import classNames from 'classnames/bind';

const Button = ({
  className,
  onClick,
  text,
  icon,
  htmlType,
  loading,
  disabled = false,
}) => {
  const renderContent = () => {
    let result = text;

    if (icon && (icon.position === 'left' || icon.position === undefined)) {
      result = <>{text}</>;
    } else if (icon && icon.position === 'right') {
      result = <>{text}</>;
    }

    return result;
  };

  return (
    <AntButton
      className={classNames({
        button: true,
        [className]: !!className,
        disabled,
      })}
      onClick={!disabled ? onClick : undefined}
      htmlType={htmlType}
      loading={loading}
    >
      {renderContent()}
    </AntButton>
  );
};

export default Button;
