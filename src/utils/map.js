import 'leaflet/dist/leaflet.css';
import $L from 'leaflet';
import 'leaflet.markercluster';
import Color from './color';

const createMap = (divId, options) => $L.map(divId, options);

const createTileLayer = async (map, url, options) => {
  const tileLayer = await $L.tileLayer(url, options);
  tileLayer.addTo(map);
  return tileLayer;
};
const removeLayer = (map, layer) => {
  map.removeLayer(layer);
};

const CustomMarkerIcon = (color) => $L.icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const rangeColorMarker = (range) => {
  // .mask_adult + mask_child
  const markerColor = Color.rangeColorMarker(range);
  let icon = new CustomMarkerIcon(markerColor);
  if (range > 100) {
    icon = new CustomMarkerIcon(markerColor);
  } else if (range > 50) {
    icon = new CustomMarkerIcon(markerColor);
  } else if (range > 0) {
    icon = new CustomMarkerIcon(markerColor);
  }
  return icon;
};

const PopupContent = (feature) => {
  const adult = Color.rangeColorMarker(feature.properties.mask_adult);
  const child = Color.rangeColorMarker(feature.properties.mask_child);
  const staAdultClass = `sta-${adult}`;
  const staChildClass = `sta-${child}`;
  let note = `<div class="mask-note"> 
      <div>備註：</div>
      <div>${feature.properties.note}</div>
    </div>`;
  note = feature.properties.note ? note : '';
  return `<div class="popUp" data-id="${feature.properties.id}">
      <div class="mask-title">
        <p class="font-weight-bold mb-1">${feature.properties.name}</p>
        <div class="mask-updated">更新: ${feature.properties.updated ? feature.properties.updated : '無資料'}</div>
      </div>
      <div class="mask-wrap d-block justify-content-between">
        <div class="${staAdultClass} rounded-pill mask-adult">
          成人：${feature.properties.mask_adult === 0 ? '已售完' : feature.properties.mask_adult}
        </div>
        <div class="${staChildClass} rounded-pill mask-child">
          兒童：${feature.properties.mask_child === 0 ? '已售完' : feature.properties.mask_child}
        </div>
      </div>
      ${note}
    </div>`;
};

const geoJsonLayerMarkerClusterGroup = (map, geoJsonData, fn) => {
  const markers = $L.markerClusterGroup();
  const geoJsonLayer = $L.geoJson(geoJsonData, {
    onEachFeature(feature, layer) {
      const popupContent = PopupContent(feature);
      layer.bindPopup(popupContent)
        .on('popupclose', () => {
          fn(null);
        });
      layer.on({
        click: fn,
      });
    },
    pointToLayer(feature, latlng) {
      const range = feature.properties.mask_adult + feature.properties.mask_child;
      const customIcon = rangeColorMarker(range);
      return $L.marker(latlng, { icon: customIcon });
    },
  });
  markers.addLayer(geoJsonLayer);
  map.addLayer(markers);
  // map.fitBounds(markers.getBounds());
  return markers;
};


const addMarker = (map, point, color) => {
  const customIcon = new CustomMarkerIcon(color);
  $L.marker(point, { icon: customIcon }).addTo(map);
};

const addCircle = (map, point, option) => {
  $L.circle(point, option).addTo(map);
};

const addGeoJson = (geojsonFeature, map) => $L.geoJSON(geojsonFeature).addTo(map);

export default {
  createMap,
  createTileLayer,
  removeLayer,
  geoJsonLayerMarkerClusterGroup,
  addMarker,
  addCircle,
  addGeoJson,
};
