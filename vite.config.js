import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    css: {
        devSourcemap: true,
    },
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Cho phép truy cập từ các IP khác
        port: 8080, // Cổng của server
        strictPort: true, // Chỉ dùng đúng cổng 8080
        https: false, // Nếu muốn dùng HTTPS thì cần cấu hình SSL
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
