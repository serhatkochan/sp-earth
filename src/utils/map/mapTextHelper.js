import { Text, Stroke } from 'ol/style';

export const GetAreaText = (name) => {
  return new Text({
    text: name,
    textBaseline: 'center',
    textAlign: 'center',
    padding: [7, 7, 7, 7],
    font: '15px',
    stroke: new Stroke({
      color: '#fff',
      lineCap: 'butt',
      width: 4,
    }),
    overflow: false,
  });
};
