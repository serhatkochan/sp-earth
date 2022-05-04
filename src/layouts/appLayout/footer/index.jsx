import { useTranslation } from 'react-i18next';
import { ApiVersion } from 'config/app';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="copyright">{t('copyright')}</div>
      <div className="version">{ApiVersion}</div>
    </div>
  );
};
export default Footer;
