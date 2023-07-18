import Axios from "axios";

import { toast } from "react-toastify";
import { getUser } from "../app/utils/cookieHelper";

export const axiosInstance = Axios.create({

  baseURL: 'http://localhost:8484/hrms/api/',
  // baseURL: 'http://10.14.15.233:8484/hrms/api/',
  // baseURL: 'http://10.14.14.146:8484/hrms/api/',
  // baseURL: "http://10.14.15.156:8484/hrms/api/",
  // baseURL: "http://10.14.14.198:8484/hrms/api/",

  // baseURL: 'http://103.94.159.144:8083/hrms/api/',

  timeout: 20000,
});

axiosInstance.interceptors.request.use(function (config) {
  const data = getUser();
  config.withCredentials = false;
  if (data !== null) {
    config.headers["Authorization"] = "Bearer " + data;
  }

  return config;
});
// Initialize an empty object to keep track of the URLs and their hit counts

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      // Rest of the error handling logic
      const errorMessage = error?.response?.data?.message;
      if (
        errorMessage === "invalid_or_missing_token" ||
        errorMessage === "user_disabled"
      ) {
        removeUser();
        window.location.replace("/login");
        return Promise.reject(error);
      } else if (errorMessage === "access_denied_no_permission") {
        window.location.replace("/not-found");
      } else if (errorMessage) {
        // Show the error message using toastify
        toast.error(errorMessage);
        return Promise.reject({ message: errorMessage });
      } else {
        // Show a generic error message
        toast.error("Some error occurred");
        return Promise.reject(error.response.data);
      }
    } else {
      // Show a generic error message

      return Promise.reject({
        message: "Some unusual error occurred, please try again",
      });
    }
  }
);
