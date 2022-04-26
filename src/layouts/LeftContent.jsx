import React from "react";
import AppMenu from "./AppMenu";
import { Image } from "antd";
import logo from "../assests/images/mahrek-logo.png";
import { Link } from "react-router-dom";

export default function LeftContent() {
  return (
    <div className="leftContent">
      <Link to={"/"}>
        <Image preview={false} className="logo" src={logo} />
      </Link>
      <AppMenu />
    </div>
  );
}
