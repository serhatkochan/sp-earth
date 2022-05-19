import OlMap from 'ol/Map';
import View from 'ol/View';
import { fromLonLat, transform } from 'ol/proj';
import {
  ChangeBaseLayer,
  CreateTileLayer,
  CreateVectorLayer,
  GetSelectedLayer,
  OlMapVectorLayers,
  RemoveVectorLayer,
} from './mapLayerHelper';

import MapLayerList from './mapLayerList';
import { LayerTypes } from './mapConstant';

const OlMapItems = {};

const TransformLongLat = (longLat) =>
  transform(longLat, 'EPSG:3857', 'EPSG:4326');
const CreateMap = (key) => {
  OlMapItems[key] = new OlMap({
    layers: [CreateTileLayer()],
    view: new View({
      center: fromLonLat([35.2489795, 38.9226718]),
      zoom: 7,
      minZoom: 1,
      maxZoom: 20,
    }),
    controls: [],
    target: 'map',
  });
  // ekranda gözükecek harita
  let selectedMapLayer = GetSelectedLayer();
  const foundedMap = MapLayerList.find((item) => item.id === selectedMapLayer);
  ChangeBaseLayer(key, foundedMap.url, foundedMap.id);

  CreateVectorLayer(key, LayerTypes.HUMAN_LAYER);

  setTimeout(() => {
    OlMapItems[key].updateSize();
  }, 200);
  OlMapItems['MAP_0'].on('pointermove', listener);
  OlMapItems['MAP_0'].on('singleclick', listener);

  OlMapItems['MAP_0']
    .getViewport()
    .addEventListener('contextmenu', function (evt) {
      evt.preventDefault();
      console.log(OlMapItems['MAP_0'].getEventCoordinate(evt));
    });
};
const listener = (event) => {
  const features = OlMapItems['MAP_0'].getFeaturesAtPixel(event.pixel);
  if (event.type === 'pointermove') {
    let info = document.getElementById('info');
    if (features.length === 0) {
      info.innerText = '';
      info.style.opacity = 0;
      return;
    }
    const properties = features[0].getProperties();
    info.innerText = JSON.stringify(properties, null, 2);
    info.style.opacity = 1;
  } else if (event.type === 'singleclick' && features[0]) {
    console.log(features[0].getProperties());
  }
};
const RemoveMap = (key) => {
  delete OlMapItems[key];
};
const FitMapByLayer = (key, layerName, padding = [75, 75, 75, 75]) => {
  if (OlMapVectorLayers[key + layerName]) {
    const layerSource = OlMapVectorLayers[key + layerName].getSource();
    let getExtend = [0, 0, 0, 0];

    getExtend = layerSource.getExtent();

    OlMapItems[key].getView().fit(getExtend, { padding, duration: 500 });
  }
};
const FitMap = (key, extend, padding = [75, 75, 75, 75]) => {
  OlMapItems[key].getView().fit(extend, { padding, duration: 500 });
};
const MapZoomCoordinate = (key, coordinate, zoom, animate = true) => {
  const mapView = OlMapItems[key].getView();

  if (animate) {
    if (zoom) {
      mapView.animate({ zoom, center: coordinate, duration: 500 });
    } else {
      mapView.animate({ center: coordinate, duration: 500 });
    }
  } else if (zoom) {
    mapView.setCenter(coordinate);
    mapView.setZoom(zoom);
  } else {
    mapView.setCenter(coordinate);
  }
};
const ClearAllMapItems = (mapKey = 'MAP_0', layerNames) => {
  layerNames.forEach((layerName) => {
    RemoveVectorLayer(mapKey, layerName);
  });
  RemoveMap(mapKey);
};

export {
  OlMapItems,
  CreateMap,
  RemoveMap,
  FitMapByLayer,
  FitMap,
  TransformLongLat,
  ClearAllMapItems,
  MapZoomCoordinate,
};
