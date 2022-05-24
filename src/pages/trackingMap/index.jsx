import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';
import './index.scss';

//map
import Test from './test';
import {
  ClearAllMapItems,
  CreateMap,
  FitMapByLayer,
} from 'utils/map/mapHelper';
import {
  ClearAllHumans,
  CreateHumanIcon,
  UpdateHumanIcon,
} from 'utils/map/mapFeatureHelper';
import { setPending } from '../../store/actions/pendingActions';
import { useDispatch } from 'react-redux';

const { Content } = Layout;

const TrackingMap = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPending(true));
    CreateMap('MAP_0');
    CreateHumanIcon({
      humanId: 1,
      lat: 38.6,
      lon: 35.7,
      humanType: 'VICTIM',
    });
    CreateHumanIcon({
      humanId: 2,
      lat: 38.9489795,
      lon: 35.9226718,
      humanType: 'VICTIM',
    });
    setTimeout(
      function () {
        dispatch(setPending(false));
      }.bind(this),
      1200
    );
  }, []);
  return (
    <div>
      <div className="site-layout-pages-breadcrumb">{t('student.map')}</div>
      <Content className="map-content">
        <div id="map" style={{ width: '100%', height: '75vh' }}></div>
        <div id="info" />
        {/*<Test />*/}
      </Content>
    </div>
  );
};

export default TrackingMap;
