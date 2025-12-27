export const SS = {
  get(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },
};
