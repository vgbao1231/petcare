export const genUid = (length = 8) => {
    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2, 2 + length)
    );
}

export const getTokenPayload = (token) => {
    if (!token) return {};
    return JSON.parse(atob(token.split('.')[1]));
}

export const cleanObject = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ''));
}

export const genAvatarColor = (name) => {
    const colors = [
        "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
        "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
        "#8BC34A", "#CDDC39", "#FFC107", "#FF9800", "#FF5722"
    ];
    return colors[(name?.charCodeAt(0) - 65) % colors.length] || colors[0];
};

export const lightenColor = (hex, percent = 0.3) => {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));

    return `rgb(${r}, ${g}, ${b})`;
};


