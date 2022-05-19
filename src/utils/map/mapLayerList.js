const MapLayerList = [
  {
    id: 'mahrekMap',
    name: '00319',
    icon: 'mahrek-map',
    url: 'https://wmts.locationbox.com.tr/wmtsservice/wmts?Key=2230000204000136000500080404070X40261090070050240004069',
  },
  {
    id: 'googleMap',
    name: '00320',
    icon: 'google-map',
    url: 'https://mts.google.com/vt/hl=tr&x={x}&y={y}&z={z}',
  },
  {
    id: 'googleTrafficMap',
    name: '00321',
    icon: 'google-map',
    url: 'https://mts.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}',
  },
  {
    id: 'googleSatelliteMap',
    name: '00322',
    icon: 'google-map',
    url: 'https://mt.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
  },
  {
    id: 'googleTerrainMap',
    name: '00323',
    icon: 'google-map',
    url: 'https://mt.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
  },
  {
    id: 'googleHybridMap',
    name: '00324',
    icon: 'google-map',
    url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  },
  {
    id: 'openStreet',
    name: '00325',
    icon: 'ops-map',
    url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  {
    id: 'yandexSatelliteMap',
    name: '00326',
    icon: 'yandex-sat-map',
    url: 'https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
  },
];

export default MapLayerList;
