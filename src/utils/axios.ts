import axios from "axios";
const axiosBackendInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
//   withCredentials: true,
});
export default axiosBackendInstance;
