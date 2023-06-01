import Cookies from 'js-cookie';

const COOKIE_NAME = 'hrms';

export const setUser = (data) => {
  Cookies.set(COOKIE_NAME, JSON.stringify(data), {
    expires: 3,
    secure: true,
    sameSite: 'strict',
  });
};

export const getUser = () => {
  const data = Cookies.get(COOKIE_NAME);
  if (data) {
    return JSON.parse(data);
  }

  return null;
};

export const removeUser = () => {
  Cookies.remove(COOKIE_NAME);
  sessionStorage.removeItem(COOKIE_NAME);
  sessionStorage.clear();
};
