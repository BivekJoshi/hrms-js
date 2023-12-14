const envType = import.meta.env.MODE;
export const contextPath = () => {
  return window.location.pathname.substring(
    0,
    window.location.pathname.indexOf('/', 2)
  );
};

export const getBaseUrl = () => {
  if (envType === 'development') {
    return 'https://103.94.159.144:8083/hrms/api/';
  } else if (envType === 'production') {
    return contextPath() + '/api';
  }
};

export const getDocUrl = () => {
  if (envType === 'development') {
    return 'https://103.94.159.144/';
  } else if (envType === 'production') {
    return contextPath() + '/api';
  }
};
