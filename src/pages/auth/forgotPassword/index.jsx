import React from 'react';
import { Link } from 'react-router-dom';

import { MailOutlined } from '@ant-design/icons';
import { Form, Image } from 'antd';
import { Input, Button } from 'components';
import './index.scss';
import Logo from 'assests/images/mahrek-logo.png';

import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="forgot-wrapper">
      <div className="mahrek-logo-wrapper">
        <Image preview={false} src={Logo} />
      </div>
      <h3 className="form-title">{t('forgot.password')}</h3>
      <Form name="forgotForm" className="form-wrapper">
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

        <Button
          htmlType="submit"
          className="btn-forgot"
          text={t('reset.password')}
        />

        <Form.Item className="btn-login">
          <Link to={'/login'}>{t('backward')}</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
