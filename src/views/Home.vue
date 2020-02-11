<template>
  <div class="home">
    <!-- menu -->
      <!-- search input -->
      <!-- filter btns -->
    <!-- map -->
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  mounted() {
    console.log('map');
  },
};
</script>
<style lang="scss" scoped>
html,body{
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
