<template>
  <section class="search-section">
    <treeselect
      v-model="value"
      :multiple="false"
      :options="options"
      valueFormat="object"
      placeholder="以行政區或郵遞區號查詢"
      :normalizer="normalizer"/>
  </section>
</template>

<script>
// import Address from '@/api/address';
import { mapGetters } from 'vuex';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import zipData from '@/map/twdistrictzip.json';

export default {
/* eslint-disable no-underscore-dangle */
  name: 'SearchAddress',
  components: {
    Treeselect,
  },
  props: {
    map: {
      default: null,
      required: true,
    },
  },
  data() {
    return {
      value: null,
      options: zipData,
    };
  },
  watch: {
    value() {
      if (this.value) {
        this.$utils.map.fitBounds(this.map, this.filteredPharmacy);
      }
    },
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
  mounted() {
    // console.log(this.map);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
