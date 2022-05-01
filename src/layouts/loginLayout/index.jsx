import { Col, Layout, Row } from 'antd';
//Component
import Language from './language';
import Carousel from './carousel';
import { Outlet } from 'react-router-dom';

import { ApiVersion } from 'config/api';

const LoginLayout = () => {
  return (
    <Layout>
      <Row>
        <Col span={14}>
          <Carousel />
        </Col>
        <Col span={10}>
          <Outlet />
        </Col>
      </Row>
      <Language />
      <div className="version">{ApiVersion}</div>
    </Layout>
  );
};

export default LoginLayout;
