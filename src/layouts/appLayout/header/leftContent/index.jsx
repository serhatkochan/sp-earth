import { Link } from 'react-router-dom';
import { Image } from 'antd';
import logo from 'assests/images/mahrek-logo.png';
import Menu from './Menu';

import './index.scss';

const LeftContent = () => {
  return (
    <div className="left-content">
      <Link to={'/'}>
        <Image className="logo" src={logo} preview={false} />
      </Link>
      <Menu />
    </div>
  );
};

export default LeftContent;
