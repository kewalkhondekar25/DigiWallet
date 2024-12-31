import axios, { InternalAxiosRequestConfig } from "axios";



const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json"
  },
});

// axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
//   const [cookies, setCookie, removeCookie] = useCookies();
//   const token = cookies(["accessToken"]);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosInstance;