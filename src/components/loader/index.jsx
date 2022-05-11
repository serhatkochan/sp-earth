import React from 'react';
import { Spin } from 'antd';

const Loader = ({ loading, children, size = 'middle' }) => {
  return (
    <Spin size={size} spinning={loading}>
      {children}
    </Spin>
  );
};

export default Loader;
