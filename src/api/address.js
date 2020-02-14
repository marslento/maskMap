import axios from 'axios';

class Address {
  static all() {
    const url = 'https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/AllData.json';
    // const url = 'https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/CityCountyData.json';
    return axios.get(url);
  }
}

export default Address;
