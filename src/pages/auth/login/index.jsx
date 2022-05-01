import React from 'react';
import { Link } from 'react-router-dom';

import { MailOutlined } from '@ant-design/icons';
import { Form, Image } from 'antd';
import { Input, Button } from 'components';
import './index.scss';
import Logo from 'assests/images/mahrek-logo.png';

import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const onFinish = ({ email, password }) => {};

  return (
    <div className="login-wrapper">
      <div className="mahrek-logo-wrapper">
        <Image preview={false} src={Logo} />
      </div>
      <h3 className="form-title">{t('login')}</h3>
      <Form name="loginForm" className="form-wrapper" onFinish={onFinish}>
        <Input
          name="email"
          placeholder={t('email')}
          suffix={<MailOutlined />}
          rules={[
            {
              type: 'email',
              message: t('please.enter.valid.email'),
            },
            {
              required: true,
              message: t('please.enter.email'),
            },
          ]}
        />
        <Input
          name="password"
          placeholder={t('password')}
          type="password"
          rules={[
            {
              required: true,
              message: t('please.enter.password'),
            },
          ]}
        />

        <Button htmlType="submit" className="btn-login" text={'Giriş Yap'} />
        <Form.Item className="btn-forgot">
          <Link to={'/forgot-password'}>{t('forgot.password')}</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
