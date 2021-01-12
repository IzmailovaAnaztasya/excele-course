import {DOMListener} from '@core/DOMListener.js';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.unsubscribers = [];

        //console.log(options);//объект emitter и listeners

        this.prepare();
    };

    //настраивает наш компонент до init
    prepare() {

    };

    //метод возвращает шаблон компонента
    toHTML() {
        return '';
    };

    //уведомляем слушателей о событии eventName
    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args);
    };

    //подписываемся на событие eventName
    $on(eventName, fn) {
        const unsub = this.emitter.subscribe(eventName, fn);
        this.unsubscribers.push(unsub);
    };

    //инициализируем компонент
    //добавляем слушателей
    init() {
        this.initDOMListeners();
    };

    //удаляем компонент
    //чистим слушателей
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach((unsub) => unsub());
    };
};