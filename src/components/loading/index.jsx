import React from 'react';
import { Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './index.scss';
import Logo from 'assests/images/mahrek-logo.png';

const Loading = () => {
  return (
    <div className="loader">
      <Image className="image" preview={false} src={Logo} />
      <LoadingOutlined style={{ display: 'block' }} />
    </div>
  );
};

export default Loading;
