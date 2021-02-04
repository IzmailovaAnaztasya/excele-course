import { ExcelComponent } from './ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) { //собир все аргументы с пом-ю оператоте rest чтобы сохр функционал
        super(...args) //что бы сохранить формат аргуметнов при насладовании
    };

    get template() { //берем старый рендер сост-я
        return JSON.stringify(this.state, null, 2);//для теста
    };

    initState(initialState = {}) {
        this.state = {...initialState};//инициализируем наш state
    };

    setState(newState) {
        this.state = {...this.state, ...newState};//принимает оба состояния для обработки

        this.$root.html(this.template);//новый render шаблона с изменениями
    };
};