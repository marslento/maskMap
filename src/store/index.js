import Vue from 'vue';
import Vuex from 'vuex';
import Mask from '@/api/mask';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pharmacies: null,
    pharmacyInfo: null,
    maskType: 0,
  },
  mutations: {
    setPharmacies(state, data) {
      state.pharmacies = data;
    },
    setPharmacyInfo(state, data) {
      state.pharmacyInfo = data;
    },
    setMaskType(state, data) {
      state.maskType = data;
    },
  },
  actions: {
    async fetchPharmacies({ commit }) {
      const response = await Mask.all();
      commit('setPharmacies', response.data);
    },
    setPharmacyInfo({ commit }, data) {
      commit('setPharmacyInfo', data);
    },
    setMaskType({ commit }, data) {
      commit('setMaskType', data);
    },
  },
  getters: {
    pharmacies: (state) => {
      if (state.pharmacies && state.maskType !== 0) {
        // state.pharmacies
        const features = state.pharmacies.features.filter((d) => {
          // const key = state.maskType === 1 ? 'mask_adult' : 'mask_child';
          if (state.maskType !== 4) {
            let key = 'mask_adult';
            if (state.maskType === 2) key = 'mask_child';
            return d.properties[key] > 0;
          }
          return (d.properties.mask_adult + d.properties.mask_child) > 0;
        });
        return {
          type: state.pharmacies.type,
          features,
        };
      }
      return state.pharmacies;
    },
    pharmacyInfo: (state) => state.pharmacyInfo,
    maskType: (state) => state.maskType,
  },
  modules: {
  },
});
