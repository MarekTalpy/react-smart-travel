// tailwind.config.js
export default {
  theme: {
    extend: {
      keyframes: {
        enter: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        leave: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(10px)' },
        },
      },
      animation: {
        enter: 'enter 0.2s ease-out',
        leave: 'leave 0.2s ease-in',
      },
    },
  },
};
