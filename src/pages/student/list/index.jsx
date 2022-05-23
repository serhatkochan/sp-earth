import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ExportCSV from 'components/export/exportCSV';
import ExportXLSX from 'components/export/exportXLSX';
import Table from 'components/table';

import StudentService from 'services/axios/studentService';
import ProvinceService from 'services/axios/provinceService';

import './index.scss';
import { Form, Layout, Tag } from 'antd';
import { DownCircleOutlined, DownSquareOutlined } from '@ant-design/icons';

const { Content } = Layout;

const StudentList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [excelFilter, setExcelFilter] = useState({});
  const [form] = Form.useForm();
  const phoneMask = '(000) 000 00 00';

  useEffect(() => {
    getAllStudent();
    getAllProvinceList();
  }, []);

  const getAllStudent = () => {
    try {
      StudentService.getAllStudents().then((res) => {
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
  const getAllProvinceList = () => {
    try {
      ProvinceService.getAllProvinceList().then((res) => {
        if (res.data.success) {
          setProvinceData(res.data.data);
        } else {
          console.log(res.data.message);
        }
      });
    } catch (ex) {
      console.log('Bilinmeyen Bir Hata Oluştu!');
    }
  };
  const triggerFilterButton = (filters) => {
    try {
      if (Object.keys(filters).length > 0) {
        StudentService.findByFilters(filters).then((res) => {
          if (res.data.success) {
            setFilterData(res.data.data);
          } else {
            console.log(res.data.message);
          }
        });
      }
    } catch (ex) {
      console.log('Bilinmeyen Bir Hata Oluştu!');
    }
  };

  const triggerProvinceChange = (value) => {
    setDistrictData(provinceData[value - 1]?.districts);
  };

  const triggerExportExcelWithApi = () => {
    console.log('triggerExportExcelWithApi');
    console.log(excelFilter);
    try {
      let filename = '';
      StudentService.exportToExcel(excelFilter).then((response) => {
        response.blob().then((blob) => {
          console.log(blob);
        });
      });
    } catch (ex) {
      console.log('Bilinmeyen Bir Hata Oluştu!');
    }
  };
  const columns = [
    {
      title: t('student.no'),
      label: t('student.no'),
      dataIndex: 'studentNo',
      key: 'studentNo',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.studentNo - b.studentNo,
      filter: true,
    },
    {
      title: t('first.name'),
      label: t('first.name'),
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      filter: true,
    },
    {
      title: t('last.name'),
      label: t('last.name'),
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      filter: true,
    },
    {
      title: t('phone.number'),
      label: t('phone.number'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      filter: {
        type: 'masked',
        mask: phoneMask,
      },
    },
    {
      title: t('province.name'),
      label: t('province.name'),
      dataIndex: 'provinceName',
      key: 'provinceNo',
      sorter: (a, b) => a.provinceName.length - b.provinceName.length,
      filter: {
        type: 'dropdown',
        options: provinceData,
        label: 'provinceName',
        value: 'provinceNo',
        render: (option) => t(option.provinceName),
      },
    },
    {
      title: t('district.name'),
      label: t('district.name'),
      dataIndex: 'districtName',
      key: 'districtId',
      sorter: (a, b) => a.districtName.length - b.districtName.length,
      filter: {
        type: 'dropdown',
        options: districtData,
        label: 'districtName',
        value: 'districtId',
        render: (option) => t(option.districtName),
      },
    },
    {
      title: t('email'),
      label: t('email'),
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      filter: true,
    },
    {
      title: t('role'),
      label: t('role'),
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: t('active'),
      label: t('active'),
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
      <div className="site-layout-pages-breadcrumb">{t('student.list')}</div>
      <Content className="site-layout-pages-content">
        <div className="download-button-line">
          <div className="download-icon">
            <ExportCSV
              csvHeaders={columns}
              csvData={studentData ? studentData : []}
              fileName={'student-data.csv'}
              icon={<DownCircleOutlined />}
              text={t('export.csv.with.react')}
            />
          </div>
          <div className="download-icon">
            <ExportXLSX
              csvData={studentData ? studentData : []}
              csvHeaders={columns}
              fileName={'student-data'}
              wscols={[
                {
                  wch: 11,
                },
                {
                  wch: 15,
                },
                {
                  wch: 15,
                },
                {
                  wch: 13,
                },
                {
                  wch: 10,
                },
                {
                  wch: 10,
                },
                {
                  wch: 20,
                },
                {
                  wch: 6,
                },
                {
                  wch: 6,
                },
              ]}
              icon={<DownCircleOutlined />}
              text={t('export.xlsx.with.react')}
            />
          </div>
          <div
            className="download-icon"
            onClick={() => triggerExportExcelWithApi()}
          >
            <DownCircleOutlined /> {t('export.excel.with.api')}
          </div>
        </div>
        <Table
          searchForm={form}
          data={filterData ? filterData : studentData}
          actions={actionConfig()}
          loading={false}
          columns={columns}
          triggerFilterButton={triggerFilterButton}
          triggerProvinceChange={triggerProvinceChange}
          setFilterData={setFilterData}
          setExcelFilter={setExcelFilter}
          pagination={{
            defaultCurrent: 1,
            pageSize: 7,
            total: filterData ? filterData.length : studentData?.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} ${t('students.listed')}. ${t(
                'total'
              )} ${total} ${t('student')} `,
          }}
        />
      </Content>
    </div>
  );
};

export default StudentList;
