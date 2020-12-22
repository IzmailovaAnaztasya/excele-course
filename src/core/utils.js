//вспомогательные функции не привязанные к конкретному участку кода

//концепт написания Pure functions, когда функции не взаимодейств. с глобальными переменными, только входящие параметры и результат
export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    };
    return string.charAt(0).toUpperCase() + string.slice(1);
};