import ApiService from './apiService';

class UserService {
  setToken = () => {
    return ApiService.setToken();
  };
  login(email, password) {
    return ApiService.post('api/users/login', { email, password });
  }
}

export default new UserService();
