<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
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
    margin: .25rem auto;
    text-align: left;
    white-space: nowrap;
  }
  .mask-updated {
    font-size: .8rem;
    // margin-bottom: .5rem;
    color: #a2a2a2;
  }
  .mask-note {
    font-size: .9rem;
    border-top: 1px solid #ededed;
    margin-top: .5rem;
    padding-top: .25rem;
  }
}
.sta-grey {
  background: #a7a7a7;
  color: #fff;
}
.sta-red {
  background: #d95e37;
  color: #fff;
}
.sta-yellow {
  background: #eec979;
  color: #fff;
}
.sta-green {
  background: #66bdcc;
  color: #fff;
}
</style>
