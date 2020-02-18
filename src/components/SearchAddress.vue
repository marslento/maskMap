<template>
  <section class="search-section" v-if="pharmacies">
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
      if (this.value && this.filteredPharmacy.length > 0) {
        this.$utils.map.fitBounds(this.map, this.filteredPharmacy);
      }
    },
  },
  computed: {
    ...mapGetters(['pharmacies', 'pharmacyInfo']),
    filteredPharmacy() {
      if (!this.pharmacies || !this.value) return [];
      // city
      if (this.value.step === 'cunli') {
        return this.pharmacies.features
          .filter((d) => (d.properties.county === this.value.ancestor.county
            && d.properties.town === this.value.ancestor.town
            && d.properties.cunli === this.value.name));
      }
      // cunli
      if (this.value.step === 'town') {
        return this.pharmacies.features
          .filter((d) => d.properties.county === this.value.ancestor.county
            && d.properties.town === this.value.name);
      }
      // county
      return this.pharmacies.features.filter((d) => d.properties.county === this.value.name);
    },
  },
  methods: {
    normalizer(node) {
      // county
      if (node.districts) {
        const children = node.districts.map((d) => ({
          step: 'town',
          ancestor: {
            county: node.name,
          },
          ...d,
        }));
        return {
          id: node.name,
          label: node.name,
          children,
        };
      }
      // town
      if (node.step === 'town') {
        const children = [];
        const { features } = this.pharmacies;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < features.length; i++) {
          if (features[i].properties.county === node.ancestor.county
              && features[i].properties.town === node.name) {
            const dupicate = children.filter((d) => d.name === features[i].properties.cunli);
            if (dupicate.length === 0) {
              children.push(
                {
                  step: 'cunli',
                  id: `${node.zip} ${node.name} ${features[i].properties.cunli}`,
                  label: features[i].properties.cunli,
                  name: features[i].properties.cunli,
                  ancestor: {
                    county: features[i].properties.county,
                    zip: node.zip,
                    town: features[i].properties.town,
                  },
                },
              );
            }
          }
        }
        return {
          step: 'town',
          id: `${node.zip}${node.name}`,
          label: `${node.zip} ${node.name}`,
          children,
        };
      }
      return {};
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
