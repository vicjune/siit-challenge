import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    checker({
      typescript: { buildMode: true },
      eslint: {
        lintCommand: 'eslint .',
        useFlatConfig: true,
      },
      overlay: {
        initialIsOpen: false,
        badgeStyle: 'display: none;',
      },
    }),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
