import toast from 'react-hot-toast/headless';

export const showToast = (message, type = 'success', duration = 3000) => {
  toast(message, {
    duration: duration || Infinity,
    type,
  });
};
