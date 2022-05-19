import { get as getProjection } from 'ol/proj';
import { getWidth, getTopLeft } from 'ol/extent';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector as VectorSource } from 'ol/source';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

import MapLayerList from './mapLayerList';
import { LayerTypes } from './mapConstant';
import { OlMapItems } from './mapHelper';

const OlMapVectorLayers = {};
const OlMapBaseLayers = {};

const zIndexList = {
  [LayerTypes.AREA_LAYER]: 8,
  [LayerTypes.MEASURE_LAYER]: 9,
  [LayerTypes.UNITS_LAYER]: 10,
  [LayerTypes.NOTIFICATION_LAYER]: 11,
};

const CreateSource = (URL) => new XYZ({ url: URL, cacheSize: 99999999999 });

const CreateTileLayer = (mapKey = 'MAP_0', url = MapLayerList[1].url) => {
  const tileLayer = new TileLayer({
    source: CreateSource(url),
    preload: Infinity,
  });

  OlMapBaseLayers[mapKey] = tileLayer;
  return tileLayer;
};

const ChangeBaseLayer = (mapKey, url, id) => {
  const mapBaseLayer = OlMapBaseLayers[mapKey];
  let source = CreateSource(url);

  if (id === 'mahrekMap') {
    source = CreateWMTSSource(url);
  }

  mapBaseLayer.set('source', source);
};

const CreateWMTSSource = (URL) => {
  const projection = getProjection('EPSG:3857');
  const projectionExtent = projection.getExtent();
  const size = getWidth(projectionExtent) / 256;
  const resolutions = new Array(20);
  const matrixIds = new Array(20);
  for (let z = 0; z < 20; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    // eslint-disable-next-line no-restricted-properties
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
  }

  return new WMTS({
    url: URL,
    layer: 'INFOTECH_TILELAYER',
    matrixSet: 'TMS',
    format: 'image/png',
    version: '1.0.0',
    projection,
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions,
      matrixIds,
    }),
    style: 'normal',
    tilePixelRatio: 2,
    cacheSize: 99999999999,
  });
};
const CreateVectorLayer = (mapKey, layerName, style) => {
  const vectorLayer = new VectorLayer({
    source: new VectorSource(),
    style,
  });

  vectorLayer.setProperties({ layerName });
  OlMapItems[mapKey]?.addLayer(vectorLayer);
  OlMapVectorLayers[mapKey + layerName] = vectorLayer;

  LayersSetZIndex();

  return vectorLayer;
};
const LayersSetZIndex = () => {
  Object.keys(OlMapVectorLayers).forEach((item) => {
    const vectorLayer = OlMapVectorLayers[item];
    const layerProps = vectorLayer.getProperties();
    if (layerProps.layerName) {
      vectorLayer.setZIndex(zIndexList[layerProps.layerName]);
    }
  });
};
const SetVisibleLayer = (mapKey, layerName, visible) => {
  if (OlMapVectorLayers && OlMapVectorLayers[mapKey + layerName]) {
    OlMapVectorLayers[mapKey + layerName].setVisible(visible);
  }
};

const RemoveVectorLayer = (mapKey, layerName) => {
  if (OlMapItems[mapKey] && OlMapVectorLayers[mapKey + layerName]) {
    OlMapItems[mapKey].removeLayer(OlMapVectorLayers[mapKey + layerName]);
    delete OlMapVectorLayers[mapKey + layerName];
  }
};

const ClearSourceLayer = (mapKey, layerName) => {
  if (OlMapVectorLayers && OlMapVectorLayers[mapKey + layerName]) {
    OlMapVectorLayers[mapKey + layerName].getSource().clear();
  }
};
const GetSelectedLayer = () => {
  const result = 'mahrekMap';
  return result;
};
export {
  OlMapVectorLayers,
  MapLayerList,
  CreateTileLayer,
  CreateVectorLayer,
  SetVisibleLayer,
  ClearSourceLayer,
  RemoveVectorLayer,
  OlMapBaseLayers,
  ChangeBaseLayer,
  GetSelectedLayer,
};
