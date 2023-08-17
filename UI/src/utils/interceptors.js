import axios from "axios";
import { urls } from "./urls";

const axios_instance = axios.create({
  baseURL: urls.baseURL,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    // Check the stack out error for refresh token
    const originalReq = error.config;
    if (error.response?.status === 403 && !originalReq._retry) {
      originalReq._retry = true;
      return axios
        .post(urls.refreshToken, {
          refreshToken: sessionStorage.getItem("refreshToken"),
        })
        .then((res) => {
          if (res.data.success) {
            sessionStorage.setItem("token", res.data.token);
            error.config.headers["Authorization"] = "Bearer " + res.data.token;
            return axios_instance(error.config);
          }
        });
    }
    return Promise.reject(error);
  }
);
