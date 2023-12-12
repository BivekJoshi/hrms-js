const envType = import.meta.env.MODE;
export const contextPath = () => {
  return window.location.pathname.substring(
    0,
    window.location.pathname.indexOf('/', 2)
  );
};

export const getBaseUrl = () => {
  if (envType === 'development') {
    return 'http://103.94.159.144:8085/pms/api';
  } else if (envType === 'production') {
    let path = window.localStorage.getItem('hrms-path');
    path = path ? path + '/api' : null;
    return path || contextPath() + '/api';
  }
};