<template>
  <div id="app">
    <div class="loading-wrap" v-if="!pharmacies">
      loading...
    </div>
    <router-view/>
  </div>
</template>
<script>
// import loadingAnimation from '@/components/loadingAnimation.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapGetters(['pharmacies']),
  },
};
</script>
<style lang="scss">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
@import "./src/assets/style.scss";
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap');

html,body, #app{
  width: 100%;
  height: 100vh;
}
#app {
  font-family: 'Noto Sans TC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1004;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
