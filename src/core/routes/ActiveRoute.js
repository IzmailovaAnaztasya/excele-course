export class ActiveRoute {
    static get path() {//возвращает текущий путь который забит в адресной строке
        return window.location.hash.slice(1); //slice(1) убираем # из строки результата
    };

    static get param() {
        return ActiveRoute.path.split('/')[1]; //из массива берем только первый индекс
    };

    static navig(path) {
        window.location.hash = path;
    };
};