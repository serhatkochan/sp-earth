import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import { Feature } from 'ol';
import { FeatureTypes, LayerTypes, RouteIconTypes } from './mapConstant';
import { HumanIconCache, UnitRouteIconCache } from './mapCacheHelper';
import {
  ClearSourceLayer,
  CreateVectorLayer,
  OlMapVectorLayers,
  RemoveVectorLayer,
  SetVisibleLayer,
} from './mapLayerHelper';
import { FitMapByLayer } from './mapHelper';

export let OlMapFeatures = {};

const CreateHumanIcon = (
  item,
  layerName = LayerTypes.HUMAN_LAYER,
  mapKey = 'MAP_0'
) => {
  const { lon, lat, humanId, humanType } = item;
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat([lon, lat])),
  });

  iconFeature.setProperties({
    humanId: item.humanId,
    humanName: 'serhat',
    humanType,
    type: FeatureTypes.HUMAN,
    mapKey,
  });

  iconFeature.setStyle((_feature, resolution) =>
    HumanIconScaleByResolution({
      resolution,
      zIndex: 11,
      humanType,
    })
  );

  const vectorSource = OlMapVectorLayers[mapKey + layerName].getSource();
  vectorSource.addFeature(iconFeature);

  OlMapFeatures[mapKey + layerName + humanId] = iconFeature;
};

const UpdateHumanIcon = ({ humanId, layerName, mapKey, lon, lat }) => {
  if (Object.values(OlMapFeatures).length > 0) {
    const humanLayer = layerName || LayerTypes.HUMAN_LAYER;
    const humanFeatureKey = mapKey + humanLayer + humanId;
    const humanFeature = OlMapFeatures[humanFeatureKey];

    if (humanFeature) {
      const iconGeometry = humanFeature.getGeometry();
      iconGeometry.setCoordinates(fromLonLat([lon, lat]));
    }
  }
};

const HumanIconScaleByResolution = ({ resolution, humanType, zIndex }) => {
  // eslint-disable-next-line no-restricted-properties
  const scale = 1 / Math.pow(resolution, 1 / 10);
  const iconStyle = new Icon({
    src: HumanIconCache[humanType],
    scale,
  });

  return new Style({
    image: iconStyle,
    zIndex,
  });
};

const ClearAllHumans = (mapKey = 'MAP_0') => {
  OlMapFeatures = {};
  RemoveVectorLayer(mapKey, LayerTypes.HUMAN_LAYER);
  CreateVectorLayer(mapKey, LayerTypes.HUMAN_LAYER);
};

const CreateRouteIcon = (
  icon,
  lonLat,
  mapKey,
  id,
  rotation = 0,
  zIndex,
  props,
  itemIndex = -1
) => {
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(lonLat)),
  });

  iconFeature.setProperties({
    type: FeatureTypes.ROUTE_HISTORY,
    mapKey,
    ...props,
    itemIndex,
  });

  iconFeature.setStyle((_feature, resolution) =>
    RouteMarkersScaleByResolution({
      resolution,
      props,
      rotation,
      zIndex,
      icon,
    })
  );

  OlMapVectorLayers[mapKey + LayerTypes.ROUTE_HISTORY_LAYER]
    .getSource()
    .addFeature(iconFeature);
  OlMapFeatures[mapKey + LayerTypes.ROUTE_HISTORY_LAYER + id] = iconFeature;
};

const RouteMarkersScaleByResolution = (data) => {
  const { resolution, zIndex, icon, color } = data;
  // eslint-disable-next-line no-restricted-properties
  const scale = 1 / Math.pow(resolution, 1 / 4);
  const iconStyle = new Icon({
    src: UnitRouteIconCache[icon],
    rotation: 0,
    scale,
    color,
  });

  return new Style({
    image: iconStyle,
    zIndex,
  });
};

const CreateRouteHistory = (locationLogList) => {
  /* harita bölme yapıldığında düzenlenecek */
  const mapKey = 'MAP_0';
  const locationLogListLength = locationLogList.length - 1;
  if (locationLogListLength > 0) {
    try {
      const firstLog = locationLogList[0];
      const lastLog = locationLogList[locationLogListLength];
      const { ROUTE_START, ROUTE_END, ROUTE } = RouteIconTypes;

      const startProps = {
        address: firstLog.address,
        locationDate: firstLog.locationDate,
      };
      CreateRouteIcon(
        ROUTE_START,
        [firstLog.lon, firstLog.lat],
        mapKey,
        'ROUTE_START',
        0,
        11,
        startProps
      );

      const endProps = {
        address: lastLog.address,
        locationDate: lastLog.locationDate,
      };
      CreateRouteIcon(
        ROUTE_END,
        [lastLog.lon, lastLog.lat],
        mapKey,
        'ROUTE_END',
        0,
        11,
        endProps
      );

      CreateRouteIcon(
        ROUTE,
        [firstLog.lon, firstLog.lat],
        mapKey,
        'ROUTE_CAR',
        firstLog.direction,
        10
      );

      locationLogList.forEach((item, key) => {
        const itemId = `ROUTE_HISTORY_${key}`;
        const itemCoordinate = [item.lon, item.lat];
        CreateRouteIcon(
          ROUTE,
          itemCoordinate,
          mapKey,
          itemId,
          item.direction,
          8,
          undefined,
          key
        );
        if (item.eventType === 0 || item.eventType === null) {
        } else {
          // henüz alarm yok
          // CreateAlarmIcon(item.eventType, itemCoordinate, mapKey, itemId, item.locationDate, 9, key);
        }
      });
    } catch (e) {
      console.warn(e);
    }
  }
};

const DrawRouteHistory = (logList) => {
  SetVisibleLayer('MAP_0', LayerTypes.HUMAN_LAYER, false);
  ClearRouteHistory();
  CreateVectorLayer('MAP_0', LayerTypes.ROUTE_HISTORY_LAYER);
  CreateRouteHistory(logList);
  FitMapByLayer('MAP_0', LayerTypes.ROUTE_HISTORY_LAYER, [320, 320, 320, 320]);
};

const ClearDrawnRouteHistory = () => {
  ClearSourceLayer('MAP_0', LayerTypes.ROUTE_HISTORY_LAYER);
  RemoveVectorLayer('MAP_0', LayerTypes.ROUTE_HISTORY_LAYER);
  SetVisibleLayer('MAP_0', LayerTypes.HUMAN_LAYER, true);
  FitMapByLayer('MAP_0', LayerTypes.HUMAN_LAYER, [320, 320, 320, 0]);
};

const ClearRouteHistory = (mapKey = 'MAP_0') => {
  RemoveVectorLayer(mapKey, LayerTypes.ROUTE_HISTORY_LAYER);
};

export {
  CreateHumanIcon,
  UpdateHumanIcon,
  ClearAllHumans,
  DrawRouteHistory,
  ClearDrawnRouteHistory,
  RouteMarkersScaleByResolution,
};
