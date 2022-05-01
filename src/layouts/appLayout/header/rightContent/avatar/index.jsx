import { Avatar as AntAvatar, Badge, Dropdown, Menu as AntMenu } from 'antd';
import { Link } from 'react-router-dom';

import './index.scss';
import { useTranslation } from 'react-i18next';

const Avatar = () => {
  const { t } = useTranslation();

  const menuData = (
    <AntMenu
      key="avatarMenu"
      style={{ margin: '-30px 30px 0 0 ', cursor: 'pointer' }}
    >
      <AntMenu.Item key={'studentsList'}>
        <Link to={'/students'}>{t('student.list')}</Link>
      </AntMenu.Item>
      <AntMenu.Item key={'studentsAdd'}>
        <Link to={'/students/add'}>{t('student.add')}</Link>
      </AntMenu.Item>
    </AntMenu>
  );
  return (
    <div className="header-avatar-dropdown">
      <Dropdown overlay={menuData} placement="topRight">
        <Badge
          dot
          color="#28c76f"
          offset={[-10, 15]}
          style={{
            width: '1.1vw',
            height: '1.1vw',
            border: '2.8px solid #dee9f2',
          }}
        >
          <AntAvatar
            className="avatar-image"
            size={44}
            src="https://telematik.otokar.com.tr/images/avatar.png"
          ></AntAvatar>
        </Badge>
      </Dropdown>
    </div>
  );
};

export default Avatar;
