//вспомогательные функции не привязанные к конкретному участку кода

//концепт написания Pure functions, когда функции не взаимодейств. с глобальными переменными, только входящие параметры и результат
export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    };
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function storage(key, data = null) { //взаимодействие с LocalStorage
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    };
    localStorage.setItem(key, JSON.stringify(data));
};

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    };
    return a === b;
};

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(';');
};

export function debounce(fn, wait) { //принимает функцию и кол-во милисекунд
    let timeout; //на верхнем уровне созд. некий счетчик интервала
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);//чистим наш счетчик
            // eslint-disable-next-line
            fn.apply(this, args);//вызывю функцию с аргументами
            //fn(...args);//вызывю функцию с аргументами
        };
        clearTimeout(timeout);//еще одна доп. чистка чтобы заново зпереапускать
        timeout = setTimeout(later, wait);
    }; //возвращ. новую функцию модификатор аргументов
};

//для клонирования defaulState
export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
};