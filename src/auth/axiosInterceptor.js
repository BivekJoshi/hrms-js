import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { getUser, removeUser } from '../app/utils/cookieHelper';
import { docContextPath, getBaseUrl } from './getBaseUrl';

// const baseURL = 'http://172.16.16.190:8083/hrms/api/';
//export const baseURL = 'https://172.16.16.94:6523/hrms/api/';
// export const DOC_URL = 'https://103.94.159.144/';
export const DOC_URL = docContextPath();
const baseURL = getBaseUrl();
// returns true if exipred && false is not
const checkIfExpired = (token) => {
  if (token) {
    const decode = jwtDecode(token);
    const exp = decode.exp;

    const iat = decode.iat;
    const now = new Date();
    if (now.getTime() > exp * 1000) {
      return true;
    }
    if (now.getTime() < iat * 10 - 60000) {
      alert('Wrong System Time \n Please correct your system time');
      return true;
    }
    return false;
  }
  return true;
};

export const axiosInstance = Axios.create({
  baseURL: baseURL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(function (config) {
  const data = getUser();
  config.withCredentials = false;
  if (data !== null) {
    if (!checkIfExpired(data)) {
      config.headers['Authorization'] = 'Bearer ' + data;
    } else {
      removeUser();
      window.location.href('#/');
    }
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
        window.location.replace('/#');
        return Promise.reject(error);
      } else if (
        errorMessage ===
        'Branch delete error: could not execute batch; SQL [delete from branch where id=?]; constraint [fk_employee_branch_id]; nested exception is org.hibernate.exception.ConstraintViolationException: could not execute batch'
      ) {
        toast.error('Cannot delete company. Please contact admin.');
      } else {
        toast.error(errorMessage);

        return Promise.reject(error.response.data);
      }
    } else {
      return Promise.reject({
        message: 'Some unusual error occurred, please try again',
      });
    }
  }
);
