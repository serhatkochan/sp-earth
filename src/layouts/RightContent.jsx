import React from "react";
import AvatarDropdown from "./AvatarDropdown";
import LanguageDropdown from "./LanguageDropdown";


export default function RightContent() {
  return (
    <div className="rightContent">
      <div className="avatar-user-name">UserName</div>
      <AvatarDropdown />
      <LanguageDropdown />
    </div>
  );
}
