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
        <Link to={'/students'}>
          <AntMenu.Item key={'studentsList'}>{t('student.list')}</AntMenu.Item>
        </Link>
        <Link to={'/students/add'}>
          <AntMenu.Item key={'studentsAdd'}>{t('student.add')}</AntMenu.Item>
        </Link>
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
