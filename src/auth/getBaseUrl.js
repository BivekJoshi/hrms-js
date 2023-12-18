const envType = import.meta.env.MODE;
export const contextPath = () => {
  return window.location.pathname.substring(
    0,
    window.location.pathname.indexOf('/', 2)
  );
};

export const getBaseUrl = () => {
  if (envType === 'development') {
    return 'http://103.94.159.144:8083/hrms/api/';
    // return 'https://dgtrade.dghub.io:8080/hrms';
  } else if (envType === 'production') {
    return contextPath() + '/api';
  }
};

export const docContextPath = () => {
  const protocolAndHost = `${window.location.protocol}//${window.location.hostname}`;

  return protocolAndHost;
};
