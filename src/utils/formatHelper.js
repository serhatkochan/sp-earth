export const HexCodeToRgb = (hexCode, opacity = 1) => {
  let c;
  let result = [0, 103, 255, 0.18];
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hexCode)) {
    c = hexCode.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${ c.join('')}`;
    // eslint-disable-next-line no-bitwise
    result = [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  }

  if (opacity) {
    result = [...result, opacity];
  }

  return result;
};
