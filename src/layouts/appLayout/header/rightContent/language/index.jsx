import { Dropdown, Menu as AntMenu } from 'antd';
import './index.scss';
import { useTranslation } from 'react-i18next';

const Language = () => {
  const { t, i18n } = useTranslation();

  const selectTrTR = () => {
    i18n.init({
      lng: 'trTR',
    });
    localStorage.setItem('lng', 'trTR');
  };
  const selectEnUS = () => {
    i18n.init({
      lng: 'enUS',
    });
    localStorage.setItem('lng', 'enUS');
  };
  const menuData = (
    <AntMenu style={{ margin: '-10px' }}>
      <AntMenu.Item key={'turkish'} onClick={selectTrTR}>
        {t('turkish')}
      </AntMenu.Item>
      <AntMenu.Item key={'english'} onClick={selectEnUS}>
        {t('english')}
      </AntMenu.Item>
    </AntMenu>
  );
  return (
    <div className="header-language-selection">
      <Dropdown overlay={menuData} placement="bottomRight">
        <span>{t('language')}</span>
      </Dropdown>
    </div>
  );
};

export default Language;
