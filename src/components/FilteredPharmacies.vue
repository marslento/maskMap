<template>
  <section class="FilteredPharmacies-section p-2">
    <section class="pt-1">
      <!-- {{filteredPharmacy.lenghth}} -->
      <div v-for="pharmacy in filteredPharmacy" :key="pharmacy.properties.id">
        <Pharmacy :pharmacy="pharmacy"/>
      </div>
    </section>
    <section>
      <Pharmacy :pharmacy="pharmacyInfo"/>
    </section>
  </section>
</template>

<script>
// import Address from '@/api/address';
import { mapGetters } from 'vuex';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import zipData from '@/map/twdistrictzip.json';
import Pharmacy from './Pharmacy.vue';

export default {
/* eslint-disable no-underscore-dangle */
  name: 'FilteredPharmacies',
  components: {
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
