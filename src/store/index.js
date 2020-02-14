import Vue from 'vue';
import Vuex from 'vuex';
import Mask from '@/api/mask';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pharmacies: null,
    pharmacyInfo: null,
  },
  mutations: {
    setPharmacies(state, data) {
      state.pharmacies = data;
    },
    setPharmacyInfo(state, data) {
      state.pharmacyInfo = data;
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
  },
  getters: {
    pharmacies: (state) => state.pharmacies,
    pharmacyInfo: (state) => state.pharmacyInfo,
  },
  modules: {
  },
});
