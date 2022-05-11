import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Col, Form, Layout, Row } from 'antd';
import { Input, Dropdown, Checkbox, Button } from 'components';
import './index.scss';
import ProvinceService from 'services/axios/provinceService';
import StudentService from 'services/axios/studentService';
const { Content } = Layout;

export default function StudentAdd() {
  let { studentId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const roleData = [
    { value: 'Admin', role: 'Admin' },
    { value: 'User', role: 'User' },
  ];
  const phoneMask = '(000) 000 00 00';
  const fetchStudentPending = false;

  const onSaveStudent = (values) => {
    try {
      StudentService.addStudent(values).then((res) => {
        if (res.data.success) {
          navigate('/students');
        } else {
          console.log(res.data.message);
        }
      });
    } catch (ex) {
      console.log('Bilinmeyen Bir Hata Oluştu!');
    }
  };
  const onChangeStudent = (values) => {
    try {
      StudentService.updateStudent(studentId, values).then((res) => {
        if (res.data.success) {
          navigate('/students');
        } else {
          console.log(res.data.message);
        }
      });
    } catch (ex) {
      console.log('Bilinmeyen Bir Hata Oluştu!');
    }
  };

  const triggerDeleteStudent = () => {
    console.log('hi');
  };
  const triggerResetForm = () => {
    form.resetFields();
    form.setFieldsValue({
      isActive: false,
    });
  };
  const triggerProvinceChange = (value) => {
    setDistrictData(provinceData[value - 1].districts);
    form.setFieldsValue({
      districtId: '',
    });
  };
  const triggerDistrictChange = (value) => {};

  useEffect(() => {
    try {
      ProvinceService.getAllProvinceList().then((res) => {
        if (res.data.success) {
          setProvinceData(res.data.data);
        } else {
          console.log(res.data.message);
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  useEffect(() => {
    if (studentId) {
      StudentService.findByStudentId(studentId).then((res) => {
        setSelectedStudent(res.data.data);
        form.setFieldsValue(res.data.data);
      });
    } else {
      triggerResetForm();
    }
  }, [studentId]);

  useEffect(() => {
    if (selectedStudent) {
      setDistrictData(provinceData[selectedStudent.provinceNo - 1]?.districts);
      form.getFieldInstance('phoneNumber').focus();
    } else {
      form.getFieldInstance('phoneNumber').focus();
    }
  }, [selectedStudent, provinceData]);

  return (
    <div>
      <div className="site-layout-pages-breadcrumb">
        {studentId ? t('student.edit') : t('student.add')}
      </div>
      <div>
        <Row>
          <Content className="site-layout-pages-content">
            <div className="form-row">
              <Form
                onFinish={studentId ? onChangeStudent : onSaveStudent}
                form={form}
              >
                <Row>
                  <Col span={11} className={'form-col'}>
                    <div>
                      <Input
                        label={t('student.no')}
                        name="studentNo"
                        minLength={9}
                        maxLength={9}
                        rules={[
                          {
                            required: true,
                            message: t('first.name.is.required'),
                          },
                        ]}
                      />
                      <Input
                        label={t('email')}
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            message: t('please.enter.valid.email'),
                          },
                          {
                            required: true,
                            message: t('please.enter.email'),
                          },
                        ]}
                      />
                      <Input
                        label={t('phone.number')}
                        name="phoneNumber"
                        mask={phoneMask}
                        type={'masked'}
                        rules={[
                          {
                            required: true,
                            message: t('phone.number.is.required'),
                          },
                        ]}
                      />
                      <Dropdown
                        label={t('role')}
                        name="role"
                        displayLabel="role"
                        displayValue="role"
                        options={roleData}
                        rules={[
                          {
                            required: true,
                            message: t('role.is.required'),
                          },
                        ]}
                      />
                      <Checkbox
                        label={t('is.active')}
                        name="isActive"
                        className="isActive"
                      />
                    </div>
                  </Col>
                  <Col span={11} className={'form-col'}>
                    <div>
                      <Input
                        label={t('first.name')}
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: t('first.name.is.required'),
                          },
                        ]}
                      />
                      <Input
                        label={t('last.name')}
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: t('last.name.is.required'),
                          },
                        ]}
                      />
                      <Dropdown
                        label={t('province')}
                        name="provinceNo"
                        displayLabel="provinceName"
                        displayValue="provinceNo"
                        options={provinceData}
                        onChange={triggerProvinceChange}
                        rules={[
                          {
                            required: true,
                            message: t('province.is.required'),
                          },
                        ]}
                      />
                      <Dropdown
                        label={t('district')}
                        name="districtId"
                        displayLabel="districtName"
                        displayValue="districtId"
                        options={districtData}
                        onChange={triggerDistrictChange}
                        rules={[
                          {
                            required: true,
                            message: t('district.is.required'),
                          },
                        ]}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="formButtons">
                  <Button
                    text={t('delete')}
                    loading={false}
                    className="small"
                    onClick={triggerDeleteStudent}
                  />
                  <Button
                    text={t('reset')}
                    loading={false}
                    className={'small'}
                    onClick={triggerResetForm}
                  />
                  <Button
                    text={t('save')}
                    loading={false}
                    htmlType="submit"
                    className="small"
                  />
                </div>
              </Form>
            </div>
          </Content>
        </Row>
      </div>
    </div>
  );
}
