export function genUid(length = 8) {
    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2, 2 + length)
    );
}

export function getTokenPayload(token) {
    if (!token) return {};
    return JSON.parse(atob(token.split('.')[1]));
}
