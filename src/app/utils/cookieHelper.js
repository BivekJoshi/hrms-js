const STORAGE_KEY = "hrms";

export const setUser = (data) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
};

export const removeUser = () => {
  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.clear();
};
// window.addEventListener("beforeunload", removeUser);