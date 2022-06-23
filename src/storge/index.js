export function saveItem(key, value) {
    if (typeof value === 'object') {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    } else {
        window.sessionStorage.setItem(key, value);
    }
}

export function getItem(key) {
    //如果key值不存在返回null
    return window.sessionStorage.getItem(key);
}
export function clearAll() {
    window.sessionStorage.clear();
}
