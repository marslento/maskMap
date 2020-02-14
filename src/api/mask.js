import axios from 'axios';

class Mask {
  static all() {
    const url = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
    // https://kiang.github.io/pharmacies/json/points.json
    // https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json
    return axios.get(url);
  }
}

export default Mask;
