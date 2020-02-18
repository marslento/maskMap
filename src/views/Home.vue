<template>
  <div class="home">
    <!-- map -->
    <div :class="['search-wrap', { shades: pharmacyInfo }]">
      <!-- <div class="top-block">
        <p class="mainTitle m-0">即時口罩地圖</p>
      </div> -->
      <!-- search input -->
      <div class="search-loc">
        <div class="search-input pr-3">
          <SearchAddress :map="map"/>
        </div>
        <!-- filter btns -->
        <div class="located-wrap rounded-circle btn btn-sm btn-light"
          @click="getLocation">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32">
            <path id="Icon_material-my-location"
              data-name="Icon material-my-location"
              d="M18,12a6,6,0,1,0,6,6A6,6,0,0,0,18,12Zm13.41,
                4.5A13.491,13.491,0,0,0,19.5,4.59V1.5h-3V4.59A13.491,
                13.491,0,0,0,4.59,16.5H1.5v3H4.59A13.491,13.491,0,0,0,
                16.5,31.41V34.5h3V31.41A13.491,13.491,0,0,0,31.41,19.5H34.5v-3ZM18,
                28.5A10.5,10.5,0,1,1,28.5,18,10.492,10.492,0,0,1,18,28.5Z"
              transform="translate(-1.5 -1.5)"/>
          </svg>
        </div>
        <div class="sync-wrap rounded-circle btn btn-sm btn-light"
          @click="refreshData">
          <i class="fas fa-sync-alt"></i>
        </div>
      </div>
      <div class="filter-wrap p-1 d-flex flex-wrap">
        <div :class="['rounded-pill m-1 btn btn-sm btn-outline-info',
          { active: maskType === 0}]"
          @click="setMaskType(0)">
          全部
        </div>
        <div :class="['rounded-pill m-1 btn btn-sm btn-outline-info',
          { active: maskType === 4}]"
          @click="setMaskType(4)">
          未售完
        </div>
        <div :class="['rounded-pill m-1 btn btn-sm btn-outline-info',
          { active: maskType === 1}]"
          @click="setMaskType(1)">
          成人口罩
        </div>
        <div :class="['rounded-pill m-1 btn btn-sm btn-outline-info',
          { active: maskType === 2}]"
          @click="setMaskType(2)">
          兒童口罩
        </div>
      </div>
    </div>
    <div class="map-container">
      <div id="map" ref="map"></div>
    </div>
    <!-- menu -->
    <div ref="pharmacyInfoWrap"
      :class="['pharmacy-info pt-2 pr-3 pl-3 pb-2', {show: pharmacyInfo}]" >
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
import SearchAddress from '@/components/SearchAddress.vue';
import Pharmacy from '@/components/Pharmacy.vue';
// import $L from 'leaflet';

export default {
  name: 'Home',
  components: {
    SearchAddress,
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
      mapHeight: 0,
      myLocationCircle: null,
      // maskType: 0,
    };
  },
  // pharmacyInfoWrap
  watch: {
    // getLocation() {
    //   this.map.setView([this.geolocation.latitude, this.geolocation.longitude],
    //     this.geolocation.viewSize);
    // },
    pharmacies() {
      if (this.markersGroup) {
        this.$utils.map.removeLayer(this.map, this.markersGroup);
      }
      this.addMarkers();
    },
    pharmacyInfo() {
      if (this.pharmacyInfo) {
        this.mapHeight = this.$refs.pharmacyInfoWrap.clientHeight;
      }
    },
  },
  computed: {
    ...mapGetters(['pharmacies', 'pharmacyInfo', 'maskType']),
    // mapHeight() {
    //   return this.$refs.pharmacyInfoWrap ? this.$refs.pharmacyInfoWrap.clientHeight : 0;
    // },
  },
  methods: {
    ...mapActions(['fetchPharmacies', 'setPharmacyInfo', 'setMaskType']),
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setLocation);
        this.geolocation.state = true;
      } else {
        this.geolocation.state = false;
      }
    },
    refreshData() {
      this.$utils.map.removeLayer(this.map, this.markersGroup);
      this.setPharmacyInfo(null);
      this.fetchPharmacies();
    },
    setLocation(position) {
      this.geolocation.latitude = position.coords.latitude;
      this.geolocation.longitude = position.coords.longitude;
      this.geolocation.viewSize = 16;
      // console.log(position.coords.heading);
      if (this.map) {
        this.setLocationCircle();
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
        this.maskType,
      );
    },
    markerEmit(data) {
      // save to vuex
      if (!data) {
        this.setPharmacyInfo(null);
      } else {
        this.setPharmacyInfo(data.target.feature);
        const coordinates = data.target.feature.geometry.coordinates.reverse();
        const zoom = this.map.getZoom();
        this.map.setView(
          coordinates,
          zoom,
        );
      }
    },
    setLocationCircle() {
      if (this.map && !this.myLocationCircle) {
        this.myLocationCircle = this.$utils.map.addCircle(this.map,
          [this.geolocation.latitude, this.geolocation.longitude],
          {
            color: '#2196F3',
            fillColor: '#2196F3',
            fillOpacity: 0.9,
            strokeOpacity: 0,
            radius: 15,
          });
      }
    },
  },
  async created() {
    this.getLocation();
    await this.fetchPharmacies();
  },
  async mounted() {
    // create
    this.map = this.$utils.map.createMap('map', { maxZoom: 18, zoomControl: false });
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
  display: flex;
  flex-direction: column;
}
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  #map {
    width: 100%;
    height: 100%;
  }
}

.search-wrap {
  width: 100%;
  z-index: 1002;
  position: relative;
  @include pc-width {
    width: calc(408px - 1rem);
    // box-shadow: 0px 0 10px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0px;
    left: 0px;
    // &.shades {
      // border-radius: 0px;
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.19);
    // }
  }
  .search-loc {
    color: #313854;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    padding: .5rem;
    @include pc-width {
      margin: .5rem;
      border-radius: 5px;
    }
  }
}
.located-wrap {
  fill: #313854;
  padding: .5rem;
  margin-right: .25rem;
  cursor: pointer;
  svg {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.sync-wrap {
  padding: .5rem;
  margin-right: .25rem;
  cursor: pointer;
  i {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.filter-wrap {
  position: absolute;
  .btn {
    white-space: nowrap;
    background: #fff;
    &:hover {
      background: #17a2b8;
    }
  }
}
.pharmacy-info {
  position: fixed;
  background: #fff;
  z-index: 1001;
  transition: left .6s, opacity .2s, bottom .5s, height .5s, display .5s;
  display: none;
  opacity: 0;
  min-height: 170px;
  min-width: 320px;
  width: 100%;
  box-shadow:  0px -2px 12px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px 20px 0px 0px;
  &.show {
    bottom: 0;
    opacity: 1;
    display: block;
  }
  @include pc-width {
    top: 0;
    width: 408px;
    left: -408px;
    height: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    border-radius: 0px;
    &.show {
      left: 0;
      opacity: 1;
      display: block;
    }
  }
  .top-block{
    background: #c6ebf1;
    padding: 0.5rem 1rem 0.75rem;
    margin: -1rem -1rem 1.25rem -1rem;
    display: none;
    @include pc-width {
      margin-bottom: 90px;
      display: block;
      opacity: 0;
    }
    .mainTitle {
      letter-spacing: 2px;
      color: #313854;
      font-weight: 600;
      text-align: left;
      font-size: 1.1rem;
    }
  }
}

</style>
