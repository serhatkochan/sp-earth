import React from 'react';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';

const { Content } = Layout;

export default function StudentDetails() {
  let { studentId } = useParams();
  return (
    <div>
      <div className="site-layout-pages-breadcrumb">
        Gelen studentId: {studentId}
      </div>
      <Content className="site-layout-pages-content">abcF</Content>
    </div>
  );
}
