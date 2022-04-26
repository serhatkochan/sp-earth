import React from "react";
import { Button, Dropdown, Icon, Layout, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useNavigate, Link } from "react-router-dom";

const { SubMenu } = Menu;

export default function AppMenu() {
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
    <Menu>
      <SubMenu
      key={"students"}
        title={
          <FormattedMessage id="header.students" defaultMessage={"Öğrenciler"} />
        }
      >
        <Menu.Item key={"studentsList"} onClick={handleStudentsList}>
          <FormattedMessage
            id="header.students.list"
            defaultMessage={"Öğrenci Listesi"}
          />
        </Menu.Item>
        <Menu.Item key={"studentsAdd"} onClick={handleStudentAdd}>
          <FormattedMessage
            id="header.students.add"
            defaultMessage={"Öğrenci Ekle"}
          />
        </Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <div className="header-menu">
      <Button onClick={handleMain}>
      <FormattedMessage id="header.map" defaultMessage={"HARİTA"} />
      </Button>
      <Dropdown overlay={menu} className="header-menu-dropdown">
        <Button>
          <FormattedMessage id="header.management" defaultMessage={"management"} />
        </Button>
      </Dropdown>
    </div>
  );
}
