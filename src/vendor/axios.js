/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
// import router from '../router';

// Add a response interceptor
axios.interceptors.response.use((response) => response, (error) => {
  if (!error.response) {
    return Promise.reject({
      response: {
        data: null,
      },
    });
  }
  if (Number(error.response.data.code) === 10010
    || Number(error.response.data.code) === 10020
    || Number(error.response.data.code) === 10030
  ) {
    // localStorage.removeItem('user');
    // router.push('/pages/login');
  }
  return Promise.reject(error);
});

export default axios;
