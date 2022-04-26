import React from "react";
import { Avatar, Badge, Button, Dropdown, Icon, Layout, Menu } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useNavigate, Link } from "react-router-dom";

export default function AvatarDropdown() {
  const navigate = useNavigate();

  const handleStudentsList = () => {
    navigate("/students");
  };
  const handleStudentAdd = () => {
    navigate("/students/add");
  };
  const handleMain = () => {
    navigate("");
  };
  const menu = (
    <Menu style={{margin: "-30px 30px 0 0 ", cursor:"pointer"}}>
      <Menu.Item key={"settings"} onClick={handleStudentsList}>
          <FormattedMessage
            id="header.students.list"
            defaultMessage={"Öğrenci Listesi"}
          />
        </Menu.Item>
        <Menu.Item key={"logout"} onClick={handleStudentAdd}>
          <FormattedMessage
            id="header.students.add"
            defaultMessage={"Öğrenci Ekle"}
          />
        </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-avatar-dropdown">
      <Dropdown overlay={menu} placement="topRight" >
          <Badge
            dot
            color="#28c76f"
            offset={[-10, 15]}
            style={{
              width: "1.1vw",
              height: "1.1vw",
              border: "2.8px solid #dee9f2",
            }}
          >
            <Avatar
              className="avatar-image"
              size={44}
              src="https://telematik.otokar.com.tr/images/avatar.png"
            />
          </Badge>
      </Dropdown>
    </div>
  );
}
