export class Emitter {
    constructor() { //instance у класса Emitter
        this.listeners = {}; //по умолчанию в нем создаем пустой объект
    };

    //dispatch, fire, trigger
    //наш метод уведомления слушателей если они есть
    //вызов метода table.emit('table:select, {a: 1}')
    emit(eventName, ...args) { //оператор rest
        if (!Array.isArray(this.listeners[eventName])) { //проверяем является ли [] = []
            return false;
        };
        this.listeners[eventName].forEach((listener) => { //на кажд итерац получаем слушателя которые будут на самом деле fn
            listener(...args); //уже оператор spread котор. разворачивает аргументы fn
        });
        return true;
    };

    //on, listen
    //наш метод подписки на уведомления, либо добавл нового слушателя
    //вызов метода formula.subscribe('table:select', () => {})
    subscribe(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || []; //обращ. к переменной чтобы добавить слушателей и далем их массивом
        this.listeners[eventName].push(fn); //по ключу eN складируем в [] функции

        //отписка от определенных событий
        return () => { //возвращаем функцию которая позволяет это сделать
            this.listeners[eventName] =
             this.listeners[eventName].filter((listener) => listener !== fn); //переопределяем старый listeners[] и через filter оставляем все кроме fn
        };
    };
};


//Example testing

//создали объект new
//const emitter = new Emitter();
//подписались на событие 'anastasya' и вызываем fn где получаем дата
//emitter.subscribe('anastasya', (data) => console.log('Sub:', data));
//обращаемся к emit по событиюб где дата это 42
//emitter.emit('anastasya', 42);
//если бы имена событий не совпадали то должна сработать отписка

//также можем выполнять это асинхронно через setTimeout()