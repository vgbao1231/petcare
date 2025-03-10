import axios from 'axios';
import Cookies from 'js-cookie';

const API_PRIVATE_AUTH_PREFIX = import.meta.env.VITE_API_PREFIX_URL;
console.log(API_PRIVATE_AUTH_PREFIX);

const api = axios.create({ baseURL: API_PRIVATE_AUTH_PREFIX });

const headerConfig = (more) => ({
    'Content-Type': 'application/json',
    ...more,
});

const requestInterceptor = (request) => {
    request.headers = headerConfig(request.headers);
    const accessToken = Cookies.get('accessToken');
    request.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : 'none';

    return request;
};

const responseInterceptor = (error) => {
    const status = error.response?.status;

    if (status === 401) {
        // ❌ Token hết hạn → Đăng xuất người dùng, xóa token
        Cookies.remove('accessToken');
        window.location.href = '/login'; // Chuyển về trang login
    } else if (status === 403) {
        console.error('Không có quyền truy cập!');
    } else if (status >= 500) {
        console.error('Lỗi máy chủ, vui lòng thử lại sau!');
    }

    return Promise.reject(error); // Trả lỗi về để FE có thể xử lý tiếp
};

api.interceptors.request.use(requestInterceptor, (err) => Promise.reject(err));
api.interceptors.response.use((res) => res, responseInterceptor);

export { api };
