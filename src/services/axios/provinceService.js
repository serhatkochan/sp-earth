import ApiService from './apiService';

class ProvinceService {
  getAllProvince() {
    return ApiService.get('api/provinces');
  }
  getAllDistrict() {
    return ApiService.get('api/districts');
  }
  getAllProvinceList() {
    return ApiService.get('api/provinces/getAllProvinceList');
  }
}

export default new ProvinceService();
