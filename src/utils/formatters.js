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
export const convertToCurrency = (value) => new Intl.NumberFormat('en-US').format(Number(value.replace(/[^\d]/g, '')));

export const ISOtoLocale = (d) => new Date(d).toLocaleString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
    hour12: true
}).replace(',', ' at');
