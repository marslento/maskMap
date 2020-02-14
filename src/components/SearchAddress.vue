<template>
  <section :class="['search-section p-2', { slideShow: pharmacyInfo}]">
    <div class="top">
      <p class="mainTitle">即時口罩地圖</p>
    </div>
    <treeselect
      v-if="false"
      v-model="value"
      :multiple="false"
      :options="options"
      valueFormat="object"
      placeholder="以地區或郵遞區號查詢"
      :normalizer="normalizer"/>
    <section class="pt-1" v-if="false">
      <!-- {{filteredPharmacy.lenghth}} -->
      <div v-for="pharmacy in filteredPharmacy" :key="pharmacy.properties.id">
        <Pharmacy :pharmacy="pharmacy"/>
      </div>
    </section>
    <section v-else>
      <Pharmacy :pharmacy="pharmacyInfo"/>
    </section>
  </section>
</template>

<script>
// import Address from '@/api/address';
import { mapGetters } from 'vuex';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import zipData from '@/map/twdistrictzip.json';
import Pharmacy from './Pharmacy.vue';

export default {
/* eslint-disable no-underscore-dangle */
  name: 'SearchAddress',
  components: {
    Treeselect,
    Pharmacy,
  },
  props: {
  },
  data() {
    return {
      value: null,
      options: zipData,
    };
  },
  computed: {
    ...mapGetters(['pharmacies', 'pharmacyInfo']),
    filteredPharmacy() {
      if (!this.pharmacies || !this.value) return [];
      if (this.value.ancestor) {
        return this.pharmacies.features
          .filter((d) => d.properties.county === this.value.ancestor.name
            && d.properties.town === this.value.name);
      }
      return this.pharmacies.features.filter((d) => d.properties.county === this.value.name);
    },
  },
  methods: {
    normalizer(node) {
      if (node.districts) {
        const children = node.districts.map((d) => ({
          ancestor: {
            id: node.name,
            name: node.name,
            label: node.name,
          },
          ...d,
        }));
        return {
          id: node.name,
          label: node.name,
          children,
        };
      }
      return {
        id: `${node.zip}${node.name}`,
        label: `${node.zip} ${node.name}`,
      };
    },
  },
  async created() {
    // await this.fetch();
  },
  mounted() {
    console.log(this.pharmacies);
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
  .search-section {
    opacity: 0;
  }
  .slideShow {
    opacity: 1
  }
</style>
