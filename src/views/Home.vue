<template>
  <div class="home">
    <!-- map -->
    <div class="map-container">
      <div id="map" ref="map"></div>
    </div>
    <!-- menu -->
      <!-- search input -->
      <!-- filter btns -->
    <div :class="['pharmacy-info p-3', {show: pharmacyInfo}]" >
      <!-- <SearchAddress/> -->
      <div class="top-block">
        <p class="mainTitle m-0">即時口罩地圖</p>
      </div>
      <Pharmacy :pharmacy="pharmacyInfo"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';
import config from '@/map/mapConfig.json';
// import SearchAddress from '@/components/SearchAddress.vue';
import Pharmacy from '@/components/Pharmacy.vue';

// import $L from 'leaflet';

export default {
  name: 'Home',
  components: {
    // SearchAddress,
    Pharmacy,
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
        // this.$router.push
      }
    },
  },
  async created() {
    this.getLocation();
    await this.fetchPharmacies();
  },
  async mounted() {
    // create
    this.map = this.$utils.map.createMap('map', { maxZoom: 18 });
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
@import './src/assets/style.scss';
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
  background: #fff;
  z-index: 1000;
  overflow: auto;
  transition: left .6s, opacity .2s;
  display: block;
  position: fixed;
  opacity: 0;
  min-height: 166px;
  min-width: 320px;
  width: 100%;
  box-shadow:  0px -2px 12px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px 20px 0px 0px;
  &.show {
    bottom: 0;
    opacity: 1;
  }
  @include pc-width {
    top: 0;
    width: 408px;
    left: -408px;
    height: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    border-radius: 0px;
    padding: 0rem;
    &.show {
      left: 0;
      opacity: 1;
    }
  }
}
.top-block{
  background: #c6ebf1;
  padding: 0.5rem 1rem 0.75rem;
  margin: -1rem -1rem 1.25rem -1rem;
  display: none;
  @include pc-width {
    display: block;
  }
  .mainTitle {
    letter-spacing: 2px;
    color: #313854;
    font-weight: 600;
    text-align: left;
    font-size: 1.1rem;
  }
}
</style>
