import {DOMListener} from '@core/DOMListener.js';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.store = options.store;
        this.subscribe = options.subscribe || [];//храним массив строк
        this.unsubscribers = [];
        //this.storeSub = null;

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

    $dispatch(action) {
        this.store.dispatch(action);
    };

    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn);
    // };

    //Сюда приходят изм-я только по полям на которые подписались
    storeChanged() {

    };

    isWatching(key) {
        return this.subscribe.includes(key);
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
        //this.storeSub.subscribe();
    };
};