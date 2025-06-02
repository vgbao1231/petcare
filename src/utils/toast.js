import { toast as reactToast } from 'react-toastify';

class ToastService {
    static instance;

    constructor() {
        if (ToastService.instance) {
            return ToastService.instance;
        }
        ToastService.instance = this;
    }

    success(message) {
        reactToast.success(message);
    }

    error(message) {
        reactToast.error(message);
    }

    info(message) {
        reactToast.info(message);
    }

    warn(message) {
        reactToast.warn(message);
    }

    static getInstance() {
        if (!ToastService.instance) {
            ToastService.instance = new ToastService();
        }
        return ToastService.instance;
    }
}

export default ToastService;
