/* eslint-disable prefer-destructuring */
const colorGray = '#a7a7a7';
const colorSetA = ['#EEC979', '#D95E37'];
const colorSetB = ['#aae3ed', '#66BDCC', '#313854'];
const colorMarker = ['grey', 'green', 'yellow', 'red'];
const rangeColorMarker = (range) => {
  // mask_adult  mask_child
  let icon = colorMarker[0];
  if (range > 100) {
    icon = colorMarker[1];
  } else if (range > 50) {
    icon = colorMarker[2];
  } else if (range > 0) {
    icon = colorMarker[3];
  }
  return icon;
};

export default {
  colorGray,
  colorSetA,
  colorSetB,
  rangeColorMarker,
};
