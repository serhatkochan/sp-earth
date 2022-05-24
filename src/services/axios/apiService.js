import { ApiUrl } from 'config/app';
import axios from 'axios';
import {
  IsLogin,
  LogoutAuth,
  GetAuthInfoByKey,
  GetAuthInfo,
} from 'utils/authHelper';

class ApiService {
  service;

  constructor() {
    this.service = axios.create({
      baseURL: ApiUrl,
    });
    this.setToken();
  }
  apiGateway = (apiCall) => {
    return new Promise((resolve, reject) => {
      try {
        const response = apiCall();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
  setToken = () => {
    this.service.interceptors.request.use((config) => {
      const token = GetAuthInfo()?.jwt;
      if (IsLogin() && token) {
        config.headers.Authorization = 'Bearer ' + token;
      } else {
        LogoutAuth();
      }
      return config;
    });
  };

  get = (url) => {
    return this.apiGateway(() => {
      return this.service.get(url);
    });
  };

  post = (url, body, options) => {
    if (options) {
      return this.apiGateway(() => {
        return this.service.post(url, body, {
          ...options,
        });
      });
    }
    return this.apiGateway(() => {
      return this.service.post(url, body);
    });
  };

  put = (url, body) => {
    return this.apiGateway(() => {
      return this.service.put(url, body);
    });
  };

  delete = (url, body) => {
    return this.apiGateway(() => {
      return this.service.delete(url, body);
    });
  };
}

export default new ApiService();
