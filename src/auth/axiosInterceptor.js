import Axios from 'axios';
import { toast } from 'react-toastify';
import { getUser, removeUser } from '../app/utils/cookieHelper';

export const baseURL = 'https://103.94.159.144:8083/hrms/api/';
export const DOC_URL = 'https://103.94.159.144/';
export const axiosInstance = Axios.create({
  baseURL: baseURL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(function (config) {
  const data = getUser();
  config.withCredentials = false;
  if (data !== null) {
    config.headers['Authorization'] = 'Bearer ' + data;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      const errorMessage = error?.response?.data?.message;
      if (
        errorMessage === 'invalid_or_missing_token' ||
        errorMessage === 'user_disabled'
      ) {
        removeUser();
        window.location.replace('/login');
        return Promise.reject(error);
      } else if (
        errorMessage ===
        'Company delete error: could not execute batch; SQL [delete from associate_company where id=?]; constraint [fkgs9c8ufts6dmvhvg4ptxshl0s]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute batch'
      ) {
        toast.error('Cannot delete company. Please contact admin.');
      } else if (errorMessage === 'access_denied_no_permission') {
        window.location.replace('/not-found');
      } else if (errorMessage) {
        toast.error(errorMessage);
        return Promise.reject({ message: errorMessage });
      } else {
        toast.error('Some error occurred');
        return Promise.reject(error.response.data);
      }
    } else {
      return Promise.reject({
        message: 'Some unusual error occurred, please try again',
      });
    }
  }
);
