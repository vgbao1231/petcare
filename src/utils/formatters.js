export const capitalizeWords = (str) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const trimWords = (str) => str.trim();
export const getNumbersFromString = (str) => (str.match(/\d+/g) || []).join('');
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};


export const ISOtoLocale = (d, type = 'both') => {
    const date = new Date(d);

    if (type === 'date') {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', });
    }

    if (type === 'time') {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    // Mặc định trả cả ngày và giờ
    return date
        .toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
        .replace(',', ' at');
};

export const formatUnixToLocale = (seconds) =>
    new Date(seconds * 1000).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

export const formatUnixToDateLocale = (seconds) =>
    new Date(seconds * 1000).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });


