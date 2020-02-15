<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
.popUp {
  font-size: 1rem;
  font-family: 'Noto Sans TC', 'Avenir', Helvetica, Arial, sans-serif;
  max-width: 160px;
  .mask-title {
    margin-bottom: .5rem;
    padding-bottom: .25rem;
    border-bottom: 1px solid #ededed;
  }
  .mask-wrap {
    margin: .5rem auto;
  }
  .mask-adult, .mask-child {
    min-width: 32px;
    width: 100%;
    padding: .25rem 1rem;
    margin: .4rem auto;
    text-align: left;
    white-space: nowrap;
  }
  .mask-updated {
    font-size: .8rem;
    padding-top: .25rem;
    // margin-bottom: .5rem;
    // border-top: 1px solid #ededed;
    color: #a2a2a2;
    text-align: left;
  }
  .mask-note {
    font-size: .9rem;
    border-top: 1px solid #ededed;
    margin-top: .5rem;
    padding-top: .25rem;
  }
}

</style>
