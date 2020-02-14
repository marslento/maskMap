<template>
  <transition name="leave">
    <div class="card text-left mt-3 mb-3 p-2" v-if="pharmacy">
      <div class="card-body p-2">
        <h5 class="card-title font-weight-bold">{{pharmacy.properties.name}}</h5>
        <h6 class="text-muted">
          {{pharmacy.properties.address}}
        </h6>
        <h6 class="text-muted">
          {{pharmacy.properties.phone}}
        </h6>
        <p class="d-flex pb-1">
          <span :class="[maskClass(pharmacy.properties.mask_adult)]">
            成人口罩：
            {{pharmacy.properties.mask_adult}}
          </span>
          <span :class="[maskClass(pharmacy.properties.mask_child)]">
            兒童口罩：
            {{pharmacy.properties.mask_child}}
          </span>
        </p>
        <div class="card-text availableDayTime "
          v-html="availableTime(pharmacy.properties.available)">
        </div>
        <!-- custom_note -->
        <div class="card-text note-block p-2"
          v-if="pharmacy.properties.custom_note || pharmacy.properties.service_note">
          <div> 店家備註：</div>
          <div>{{pharmacy.properties.custom_note}}</div>
          <div>{{pharmacy.properties.service_note}}</div>
        </div>
        <!-- <a
          :href="'https://www.google.com.tw/maps/place/' + pharmacy.properties.address + pharmacy.properties.name"
          class="card-link"
          target="_blank">google map</a> -->
         <small class="mb-2 text-muted">
          更新時間：{{pharmacy.properties.updated ? pharmacy.properties.updated : '無資料'}}
        </small>
      </div>
    </div>
  </transition>
</template>

<script>
// import Address from '@/api/address';

export default {
  name: 'Pharmacy',
  components: {
  },
  props: {
    pharmacy: null,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    maskClass(range) {
      const color = this.$utils.color.rangeColorMarker(range);
      return `maskAmount rounded-pill sta-${color}`;
    },
    availableTime(data) {
      const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const today = arr[new Date().getDay()];
      const times = data.split('、')
        .filter((d) => d.match(today))
        .map((d) => `<span>${d.substring(3)}</span>`)
        .join(' ');
      return `<span class="today-weekday">${today}：</span> <span class="today-availableTime">${times}</span>`;
    },
  },
  async created() {
    // await this.fetch();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .top{
    background: #c6ebf1;
    margin: -.5rem -.5rem .5rem -.5rem ;
    padding: .5rem;
  }
  .mainTitle {
    letter-spacing: 2px;
    color: #313854;
    // font-weight: 600;
    text-align: left;
    font-size: 1.1rem;
  }
  .maskAmount {
    min-width: 32px;
    width: 48%;
    padding: .5rem 1rem;
    margin: .25rem auto;
    text-align: left;
    white-space: nowrap;
  }
  .availableDayTime {
    // background: #efefef;
    border-radius: 5px;
    color: #a7a7a7;
    font-weight: lighter;
    padding-bottom: .5rem;
  }
  .note-block{
    background: #efefef;
    border-radius: 5px;
  }
  .v-leave {
    opacity: 1;
  }
  .v-leave-active {
    transition: opacity 0.5s;
  }
  .v-leave-to {
    opacity: 0;
  }
  .v-enter {
    opacity: 0;
  }
  .v-enter-active {
    transition: opacity 0.5s;
  }
  .v-enter-to {
    opacity: 1;
  }
</style>
