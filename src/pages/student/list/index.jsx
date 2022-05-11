import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';

import Table from 'components/table';

import { getTableDate, dateDifferenceAsDay } from 'utils/dateHelper';

import StudentService from 'services/axios/studentService';
import './index.scss';
import { Layout, Tag } from 'antd';

const { Content } = Layout;

const StudentList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);

  const getAllStudent = () => {
    try {
      StudentService.get().then((res) => {
        if (res.data.success) {
          setStudentData(res.data.data);
        } else {
          console.log(res.data.message);
        }
      });
    } catch (ex) {
      console.log('Bilinmeyen Bir Hata Oluştu!');
    }
  };
  useEffect(() => {
    getAllStudent();
  }, []);

  const columns = [
    {
      title: t('student.no'),
      dataIndex: 'studentNo',
      key: 'studentNo',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.studentNo - b.studentNo,
      filter: true,
    },
    {
      title: t('first.name'),
      dataIndex: 'firstName',
      key: 'firstName',
      filter: true,
    },
    {
      title: t('last.name'),
      dataIndex: 'lastName',
      key: 'lastName',
      filter: true,
    },
    {
      title: t('phone.number'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      filter: true,
    },
    {
      title: t('province.name'),
      dataIndex: 'provinceName',
      key: 'provinceNo',
      filter: {
        type: 'dropdown',
        options: studentData,
        label: 'provinceName',
        value: 'provinceName',
        render: (option) => t(option.text),
      },
    },
    {
      title: t('district.name'),
      dataIndex: 'districtName',
      key: 'districtName',
      filter: {
        type: 'dropdown',
        options: studentData,
        label: 'districtName',
        value: 'districtName',
        render: (option) => t(option.text),
      },
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      filter: true,
    },
    {
      title: t('active'),
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: (a, b) => a.isActive - b.isActive,
      render: (active) =>
        active ? (
          <Tag color={'green'} key={active}>
            {t('active')}
          </Tag>
        ) : (
          <Tag color={'volcano'} key={active}>
            {t('passive')}
          </Tag>
        ),
    },
  ];

  const actionConfig = () => {
    return {
      delete: {
        onClick: (data) => {
          try {
            StudentService.deleteStudent(data.studentId).then((res) => {
              if (res.data.success) {
                getAllStudent();
              } else {
                console.log(res.data.message);
              }
            });
          } catch (ex) {
            console.log('Bilinmeyen Bir Hata Oluştu!');
          }
        },
        confirm: {
          content: {
            text: 'are_you_sure_tracking_number_will_deleted',
          },
          dataKey: 'studentNo',
        },
      },
      edit: {
        onClick: (data) => {
          navigate(`/students/${data.studentId}`);
        },
      },
    };
  };

  return (
    <div>
      <div className="site-layout-pages-breadcrumb">Student List</div>
      <Content className="site-layout-pages-content">
        <Table
          data={studentData}
          head={{
            pageTitle: t('tracking_records'),
            renderRight: () => {
              return <div>sdasd</div>;
            },
          }}
          actions={actionConfig()}
          loading={false}
          columns={columns}
          onFilterChange={null}
          pagination={{
            defaultCurrent: 1,
            pageSize: 7,
            total: studentData?.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          defaultPageSize={5}
        />
      </Content>
    </div>
  );
};

export default StudentList;
