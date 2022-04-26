import { useState, React, createElement } from "react";
import "./App.css";
import { Breadcrumb, Button, Layout, Spin } from "antd";
import {
  SettingFilled,
  PoweroffOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import CustomFooter from "./layouts/Footer.jsx";
import Navi from "./layouts/Navi";
import Dashboard from "./layouts/Dashboard";
import { IntlProvider, FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

const { Header, Footer } = Layout;

export default function App() {
  const [loading, setLoading] = useState(false);

  const messages = useSelector((state) => state.language);
  let locale = navigator.language;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <Layout className="light-theme">
          <Header>
            <Navi />
          </Header>
          <Dashboard />
          <Footer>
            <CustomFooter />
          </Footer>
        </Layout>
      </Spin>
    </IntlProvider>
  );
}
