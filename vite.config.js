import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    css: {
        devSourcemap: true,
    },
    plugins: [react()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@reusable': '/src/components/reusable',
            '@ui': '/src/components/ui',
            '@services': '/src/services',
            '@assets': '/src/assets',
            '@utils': '/src/utils',
            '@src': '/src',
        },
    },
});
