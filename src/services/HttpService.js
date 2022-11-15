import axios from "axios";
import { useAuthUserStore } from "@/stores/authUserStore.js"

/*
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurred.");
    logger.log(error);
  }

  return Promise.reject(error);
});
*/

/*
function setToken(token) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}
*/

axios.interceptors.request.use(config => {
  const authUserStore = useAuthUserStore();
  config.headers.Authorization = `Bearer ${authUserStore.user.token}`;
  return config;
});

axios.defaults.baseURL = "http://surveys.test";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // setToken,
};

export default methods;
