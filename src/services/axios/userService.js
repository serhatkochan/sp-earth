import ApiService from './apiService';

class UserService {
  setToken = () => {
    return ApiService.setToken();
  };
  login(email, password) {
    return ApiService.post('api/users/login', { email, password });
  }
  logout() {
    return ApiService.post('api/users/logout');
  }
}

export default new UserService();
