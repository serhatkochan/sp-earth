import Header from './header';
import Footer from './footer';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Layout className="light-theme">
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};
export default AppLayout;
