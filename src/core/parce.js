export function parce(value = '') {
    if (value.startsWith('=')) {
       try {
        return eval(value.slice(1));//передаем строчку которую нужно парсить
       } catch (e) {
           return value;
       };
    };
    return value;
};