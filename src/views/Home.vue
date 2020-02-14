<template>
  <div class="home">
    <!-- map -->
    <div class="map-container">
      <div id="map" ref="map"></div>
    </div>
    <!-- menu -->
      <!-- search input -->
      <!-- filter btns -->
    <div :class="['pharmacy-info', {show: pharmacyInfo}]" >
      <SearchAddress/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import config from '@/map/mapConfig.json';
import SearchAddress from '../components/SearchAddress.vue';

// import $L from 'leaflet';

export default {
  name: 'Home',
  components: {
    SearchAddress,
  },
  data() {
    return {
      map: null,
      geolocation: {
        state: false,
        latitude: config.center[0],
        longitude: config.center[1],
        viewSize: config.viewSize,
      },
      config,
      markersGroup: null,
    };
  },
  watch: {
    getLocation() {
      this.map.setView([this.geolocation.latitude, this.geolocation.longitude],
        this.geolocation.viewSize);
    },
    pharmacies() {
      if (this.markersGroup) {
        this.$utils.map.removeLayer(this.map, this.markersGroup);
      }
      this.addMarkers();
    },
  },
  computed: {
    ...mapGetters(['pharmacies', 'pharmacyInfo']),
  },
  methods: {
    ...mapActions(['fetchPharmacies', 'setPharmacyInfo']),
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setLocation);
        this.geolocation.state = true;
      } else {
        this.geolocation.state = false;
      }
    },
    setLocation(position) {
      this.geolocation.latitude = position.coords.latitude;
      this.geolocation.longitude = position.coords.longitude;
      this.geolocation.viewSize = 16;
      if (this.map) {
        this.map.setView(
          [this.geolocation.latitude, this.geolocation.longitude],
          this.geolocation.viewSize,
        );
      }
    },
    addMarkers() {
      this.markersGroup = this.$utils.map.geoJsonLayerMarkerClusterGroup(
        this.map,
        this.pharmacies,
        this.markerEmit,
      );
    },
    markerEmit(data) {
      // save to vuex
      if (!data) {
        this.setPharmacyInfo(null);
      } else {
        this.setPharmacyInfo(data.target.feature);
      }
    },
  },
  async created() {
    this.getLocation();
    await this.fetchPharmacies();
  },
  async mounted() {
    // create
    this.map = this.$utils.map.createMap('map', { maxZoom: 24 });
    this.$utils.map.createTileLayer(this.map, this.config.mapURL, {
      attribution: this.config.attribution,
    });
    // setView
    this.map.setView(
      [this.geolocation.latitude, this.geolocation.longitude],
      this.geolocation.viewSize,
    );
    // console.log(this.pharmacies);
    // this.addMarkers();
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  // overflow: hidden;
}
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
}
#map {
  width: 100%;
  height: 100%;
}
.pharmacy-info {
  position: fixed;
  top: 0;
  left: -408px;
  width: 408px;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background: #fff;
  z-index: 1000;
  overflow: auto;
  opacity: 0;
  transition: left .6s, opacity .2s;
  &.show {
    left: 0;
    opacity: 1;
  }
}
</style>
