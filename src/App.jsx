import { useState } from 'react';
import './App.css';
import { ConfigProvider, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Routes, Route } from 'react-router-dom';
import { NonAuthRoute, PrivateRoute } from 'config/Route';
import 'services/i18n';

//pages
import TrackingMap from 'pages/trackingMap';
import StudentList from 'pages/student/StudentList';
import StudentAdd from 'pages/student/StudentAdd';
import StudentDetails from 'pages/student/StudentDetails';
import Login from 'pages/auth/login';
import ForgotPassword from 'pages/auth/forgotPassword';

export default function App() {
  const [loading, setLoading] = useState(false);
  return (
    <ConfigProvider>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<TrackingMap />} />
            <Route exact path="/students" element={<StudentList />} />
            <Route exact path="/students/add" element={<StudentAdd />} />
            <Route
              exact
              path="/students/:studentId"
              element={<StudentDetails />}
            />
          </Route>
          <Route exact path="/login" element={<NonAuthRoute />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route exact path="/forgot-password" element={<NonAuthRoute />}>
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route
            exact
            path="*"
            element={<div>Böyle Bir Sayfa Bulunamadı !</div>}
          />
        </Routes>
      </Spin>
    </ConfigProvider>
  );
}