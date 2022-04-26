import React, { useState } from "react";
import { Avatar, Badge, Button, Dropdown, Icon, Layout, Menu } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { selectLocale } from "../store/slices/localeSlice";
import trTR from "../locales/tr-TR";
import enEN from "../locales/en-EN";
import {selectLanguage} from "../store/actions/languageActions"

export default function LanguageDropdown() {
  const dispatch = useDispatch()

  const selectTrTR = () => {
    dispatch(selectLanguage(trTR))
  };
  const selectEnEN = () => {
    dispatch(selectLanguage(enEN))
  };
  const menu = (
    <Menu style={{margin: "-10px"}}>
      <Menu.Item key={"turkish"} onClick={selectTrTR}>
        <FormattedMessage
          id="header.language.turkish"
          defaultMessage={"Türkçe"}
        />
      </Menu.Item>
      <Menu.Item key={"english"} onClick={selectEnEN}>
        <FormattedMessage
          id="header.language.english"
          defaultMessage={"English"}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-language-selection">
      <Dropdown overlay={menu} placement="topLeft">
        <span><FormattedMessage
          id="header.language"
          defaultMessage={"English"}
        /></span>
      </Dropdown>
    </div>
  );
}
