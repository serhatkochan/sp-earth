import React, { useEffect } from 'react';
import Map from 'ol/Map';
import { XYZ, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Point } from 'ol/geom';
import View from 'ol/View';
import { fromLonLat, transform } from 'ol/proj';

const Test = () => {
  const map = () =>
    new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://mts.google.com/vt/hl=tr&x={x}&y={y}&z={z}',
            cacheSize: 99999999999,
          }),
          preload: Infinity,
        }),
      ],
      target: 'map2',
      view: new View({
        center: fromLonLat([35.2489795, 38.9226718]),
        zoom: 7,
      }),
    });
  useEffect(() => {
    map();
  }, []);
  return (
    <div>
      <div id="map2" style={{ width: '100%', height: '75vh' }}></div>
    </div>
  );
};

export default Test;
