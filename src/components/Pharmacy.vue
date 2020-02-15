<template>
  <div class="pharmacy-card text-left mt-1" v-if="pharmacy">
    <div class="info">
      <h5 class="font-weight-bold mb-3">
        <span>
          {{pharmacy.properties.name}}
        </span>
        <span class="pl-1">
          <span :class="[maskClass(pharmacy.properties.mask_adult)]"></span>
          <span :class="[maskClass(pharmacy.properties.mask_child)]"></span>
        </span>
      </h5>
      <h6>
        <a :href="'https://www.google.com.tw/maps/place/:'+ pharmacy.properties.address"
          target="_blank"
          style="text-decoration: none;">
          <i class="fas fa-map-marker-alt pr-1"></i>
          {{pharmacy.properties.address}}
        </a>
      </h6>
      <h6>
        <a :href="'tel:'+ pharmacy.properties.phone"
          style="text-decoration: none;">
          <i class="fas fa-phone-alt pr-1"></i>
          {{pharmacy.properties.phone}}
        </a>
      </h6>
      <div class="availableDayTime "
        v-html="availableTime(pharmacy.properties.available)">
      </div>
      <!-- <a
        :href="'https://www.google.com.tw/maps/place/' + pharmacy.properties.address + pharmacy.properties.name"
        class="card-link"
        target="_blank">google map</a> -->
      <!-- <small class="mb-2 text-muted">
        更新時間：{{pharmacy.properties.updated ? pharmacy.properties.updated : '無資料'}}
      </small> -->
    </div>
      <!-- custom_note -->
    <div class="note-block p-3"
      v-if="pharmacy.properties.note && pharmacy.properties.note !== '-'">
      <!-- v-if="pharmacy.properties.custom_note || pharmacy.properties.service_note" -->
      <div> 備註：</div>
      <div>{{pharmacy.properties.note}}</div>
      <!-- <div>{{pharmacy.properties.custom_note}}</div> -->
      <!-- <div>{{pharmacy.properties.service_note}}</div> -->
    </div>
    <div class="d-flex w-100 maskInfo" v-if="false">
      <span :class="[maskClass(pharmacy.properties.mask_adult)]">
        成人口罩：
        {{pharmacy.properties.mask_adult}}
      </span>
      <span :class="[maskClass(pharmacy.properties.mask_child)]">
        兒童口罩：
        {{pharmacy.properties.mask_child}}
      </span>
    </div>
  </div>
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
      // return `maskAmount rounded-pill sta-${color}`;
      return `maskAmount-dot sta-${color}`;
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
  mounted() {
    console.log(this.pharmacy);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './src/assets/style.scss';
  .pharmacy-card {
    width: 98%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include pc-width {
      flex-direction: column;
    }
    @include pc-phone-width {
      flex-direction: row;
    }
    .info {
      font-size: .9rem;
      margin-bottom: .5rem;
      a {
        color: #41b4c7;
      }
      @include pc-phone-width {
        margin-bottom: 0rem;
      }
    }
  }
  .maskInfo {
    flex-direction: column;
    justify-content: space-evenly;
  }
  .maskAmount {
    width: 150px;
    padding: .5rem 1rem;
    margin: .25rem auto;
    text-align: left;
    white-space: nowrap;
    &-dot {
      width: 12px;
      height: 12px;
      margin: 0 0.1rem;
      display: inline-block;
      border-radius: 50%;
      transform: translateY(-2px);
    }
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
    height: 100%;
    font-size: .9rem;
    color: #767f80;
    position: relative;
    min-width: 40%;
    &:before, &:after {
      content: '';
      position: absolute;
      width: 1px;
      height: 26px;
      background: #d2ac73;
      transform: rotate(45deg);
    }
    &:before {
      top: -6px;
      left: 6px;
    }
    &:after {
      bottom: -6px;
      right: 6px;
    }
  }
</style>
