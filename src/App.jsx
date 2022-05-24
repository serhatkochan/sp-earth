import { useEffect, useState } from 'react';
import './App.css';
import { ConfigProvider, Image, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Routes, Route } from 'react-router-dom';
import { NonAuthRoute, PrivateRoute } from 'config/Route';
import 'services/i18n';

//pages
import TrackingMap from 'pages/trackingMap';
import { StudentList, StudentAdd } from 'pages/student';
import { Login, ForgotPassword } from 'pages/auth';
import StudentSettings from './pages/auth/settings';
import { useSelector } from 'react-redux';

import Loading from 'components/loading';

export default function App() {
  const loading = useSelector((state) => state.pending);
  return (
    <ConfigProvider>
      <Spin spinning={loading} indicator={<Loading />} size="large">
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<TrackingMap />} />
            <Route exact path="/students" element={<StudentList />} />
            <Route exact path="/students/add" element={<StudentAdd />} />
            <Route exact path="/students/:studentId" element={<StudentAdd />} />
            <Route
              exact
              path="student/settings"
              element={<StudentSettings />}
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
