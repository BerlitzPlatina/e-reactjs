import axios, { AxiosRequestConfig } from "axios";
import { getAuthority } from "./authority";

const instance = axios.create({
  // baseURL: process.env.API_HOST,
  baseURL: 'http://magento2/rest/all/V1',
  timeout: 30000,
  withCredentials: false,
});

instance.interceptors.request //REQUEST
  .use(
    async function (config) {
      if (typeof window !== "undefined") {
        // client side
        const authority = getAuthority();
        const headers = { ...config.headers };
        if (authority) {
          headers["Authorization"] = `Bearer ${authority}`;
        }
        headers["X-Requested-With"] = "XMLHttpRequest";
        headers["Content-Type"] = "application/json";
        config.headers = headers;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
instance.interceptors.response.use(
  async function (response) {
    console.log("axios interceptor 1");
    if (typeof window !== "undefined") {
      // console.log('response.status', response.status);
      // if (response.status === 401) {
      //   // removeAuthority();
      //   removeAuthority();
      //   await axios.post('/api/auth/logout');
      //   window.location.href = '/';
      // }
    } else {
      console.log("response.status.server", response.status);
    }
    return response;
  },
  async (error) => {
    // console.log('axios interceptor 2');
    console.log("error->", error.response);
    // if (typeof window !== "undefined") {
    //   if (error?.response?.status === 401) {
    //     // removeAuthority();
    //     // await axios.post("/api/auth/logout");
    //     // window.location.href = "/";
    //   }
    // }
    // return response;
    return {
      response: error?.response ?? null,
      data: error?.response?.data ?? null,
    };
  }
);

const request = (url, options) => {
  return instance.request({ ...options, url: url });
};

export const requestWithToken = (
  url,
  token,
  options
) => {
  const headers = { ...options.headers };
  headers["Authorization"] = `Bearer ${token}`;
  options.headers = headers;
  return instance.request({ ...options, url: url });
};

export default request;