import {ExcelStateComponent} from '@core/ExcelStateComponent.js';
import { createToolbar } from './toolbar.template';
import { $ } from '../../core/dom';
import { defaultStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Toolbar', //имя данного компанента, чтобы по нему можно было его определять в коде
            listeners: ['click'], //массив со всеми слушателями которые хотим добавить в этот компанент
            subscribe: ['currentStyles'],
            ...options,
        });
    };

    prepare() { //наше сост-е
        this.initState(defaultStyles);
    };

    get template() {
        return createToolbar(this.state);
    };

    toHTML() {
        return this.template;
    };

    storeChanged(changes) {
        this.setState(changes.currentStyles);
    };

    onClick(event) {
        const $target = $(event.target);
        if ($target.data.type === 'typebutton') {
            //console.log($target.data.value);
            const value = JSON.parse($target.data.value);//получ объект с ключами для сравнения с initialState
            this.$emit('toolbar:applyStyle', value);

            // const key = Object.keys(value) [0];
            // //console.log(key);
            // this.setState({[key]: value[key]});//чтобы только значения
            // //console.log(this.state);
        };
    };
};