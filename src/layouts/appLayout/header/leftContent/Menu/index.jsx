import { Button, Dropdown, Menu as AntMenu } from 'antd';
import { Link } from 'react-router-dom';

import './index.scss';
import { useTranslation } from 'react-i18next';

const { SubMenu } = AntMenu;

const Menu = () => {
  const { t } = useTranslation();
  const menuData = (
    <AntMenu>
      <SubMenu key={'students'} title={t('student.list')}>
        <AntMenu.Item key={'studentsList'}>
          <Link to={'/students'}>{t('student.list')}</Link>
        </AntMenu.Item>
        <AntMenu.Item key={'studentsAdd'}>
          <Link to={'/students/add'}>{t('student.add')}</Link>
        </AntMenu.Item>
      </SubMenu>
    </AntMenu>
  );

  return (
    <div className="header-menu">
      <Button className="header-menu-button">
        <Link to={'/'}>{t('map')}</Link>
      </Button>
      <Dropdown
        overlay={menuData}
        className="header-menu-dropdown header-menu-button"
      >
        <Button>{t('management')}</Button>
      </Dropdown>
    </div>
  );
};

export default Menu;
