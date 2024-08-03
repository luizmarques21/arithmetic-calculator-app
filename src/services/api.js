import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
