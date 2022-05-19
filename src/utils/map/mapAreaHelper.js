import { Circle, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Stroke, Style } from 'ol/style';
import { Feature } from 'ol';
import { AreaType, LayerTypes } from './mapConstant';
import {
  CreateVectorLayer,
  OlMapVectorLayers,
  RemoveVectorLayer,
} from './mapLayerHelper';
import { HexCodeToRgb } from '../formatHelper';
import { GetAreaText } from './mapTextHelper';

let OlMapAreas = {};

const CreateCircle = (mapKey, options) => {
  const { lon, lat, radius, name, id, color } = options;
  const circleFeature = new Feature({
    geometry: new Circle(fromLonLat([lon, lat]), radius),
  });

  circleFeature.setStyle(GetAreaStyle(name, color));

  circleFeature.setProperties({
    id,
    name,
    type: AreaType.CIRCLE,
    mapKey,
  });

  OlMapAreas[mapKey + LayerTypes.AREA_LAYER + id] = circleFeature;
  OlMapVectorLayers[mapKey + LayerTypes.AREA_LAYER]
    .getSource()
    .addFeature(circleFeature);
};

const CreatePolygon = (mapKey, options) => {
  const { pointList, name, id, color } = options;
  const polygonFeature = new Feature({
    geometry: new Polygon(pointList),
  });

  polygonFeature.setStyle(GetAreaStyle(name, color));

  polygonFeature.setProperties({
    id,
    name,
    type: AreaType.POLYGON,
    mapKey,
  });

  OlMapAreas[mapKey + LayerTypes.AREA_LAYER + id] = polygonFeature;
  OlMapVectorLayers[mapKey + LayerTypes.AREA_LAYER]
    .getSource()
    .addFeature(polygonFeature);
};

const DrawArea = (mapKey, item) => {
  const color = item.geofenceRole === 'ENTERED' ? '#508be2' : '#ff0000';
  if (item.geofenceType === AreaType.CIRCLE && item.geofencePoints.length > 0) {
    const areaPointList = item.geofencePoints[0];
    const circleOptions = {
      lat: areaPointList.lat,
      lon: areaPointList.lon,
      name: item.name,
      id: item.id,
      radius: item.radius,
      color,
    };
    CreateCircle(mapKey, circleOptions);
  } else if (
    item.geofenceType === AreaType.POLYGON &&
    item.geofencePoints.length > 0
  ) {
    const polyList = [
      item.geofencePoints.map((item) => fromLonLat([item.lon, item.lat])),
    ];
    const polygonOptions = {
      id: item.id,
      name: item.name,
      pointList: polyList,
      color,
    };
    CreatePolygon(mapKey, polygonOptions);
  }
};

const RemoveArea = (mapKey, id) => {
  const area = OlMapAreas[mapKey + LayerTypes.AREA_LAYER + id];
  if (area) {
    OlMapVectorLayers[mapKey + LayerTypes.AREA_LAYER]
      .getSource()
      .removeFeature(area);
    delete OlMapAreas[mapKey + LayerTypes.AREA_LAYER + id];
  }
};

const GetAreaStyle = (name, color) => {
  return new Style({
    stroke: new Stroke({
      color: color || '#508be2',
      width: 2,
    }),
    fill: new Fill({
      color: color ? HexCodeToRgb(color, 0.18) : [0, 103, 255, 0.18],
    }),
    text: GetAreaText(name),
    zIndex: 9,
  });
};

const ClearAllAreas = (mapKey) => {
  OlMapAreas = {};
  RemoveVectorLayer(mapKey, LayerTypes.AREA_LAYER);
  CreateVectorLayer(mapKey, LayerTypes.AREA_LAYER);
};

export {
  ClearAllAreas,
  OlMapAreas,
  CreateCircle,
  CreatePolygon,
  GetAreaStyle,
  RemoveArea,
  DrawArea,
};
