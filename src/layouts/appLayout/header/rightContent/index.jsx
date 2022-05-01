import Language from './language';
import Avatar from './avatar';

import './index.scss';

const RightContent = () => {
  return (
    <div className="rightContent">
      <div className="avatar-user-name">UserNameee</div>
      <Avatar />
      <Language />
    </div>
  );
};
export default RightContent;
