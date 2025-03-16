export const checkIsBlank = (val) =>
    val === null ||
    val === undefined ||
    (val && typeof val === 'object' && Object.keys(val).length === 0) ||
    ((Array.isArray(val) || val instanceof FileList) && val.length === 0) ||
    (typeof val === 'number' && isNaN(val)) ||
    (val instanceof Date && isNaN(val.getTime()));

export const checkIsAlphabetic = (val) => !/\d/.test(val);

export const checkIsEmail = (val) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(val);
};

export const checkIsPhoneNumber = (val) => {
    const regex = /^(?:\+?84|0)(?:\d){9}$/;
    return regex.test(val.trim());
};

export const checkMinLength = (val, minLen) => val.trim().length < minLen;

export const checkMinValue = (val, minVal) => Number(val) < minVal;

export const checkMaxValue = (val, maxVal) => Number(val) > maxVal;

export const checkPastDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 0 để so sánh chính xác

    return selectedDate >= today;
};
