import {ExcelComponent} from '@core/ExcelComponent.js';
import {$} from '@core/dom.js'

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula', //имя данного компанента, чтобы по нему можно было его определять в коде
            listeners: ['input', 'click', 'keydown'], //массив со всеми слушателями которые хотим добавить в этот компанент
            ...options,
        });
    };

    toHTML() {
        return `
        <div class="formula-info">fx</div>
                <div id='formula' class="formula-input" contenteditable spellcheck="false"></div>
        `
    };

    init() {
        super.init(); //чтобы добавились элементы DOM

        this.$formula = this.$root.find('#formula'); //единый запрос к DOM дереву

        this.$on('table:select', ($cellTable) => {
            this.$formula.textcont($cellTable.textcont());
        });

        this.$on('table:text', ($cellTable) => {
            this.$formula.textcont($cellTable.textcont());
        });
    };

    onInput(event) {
        //console.log('Formula: onInput ', event.target.textContent.trim());
        this.$emit('formula:text', $(event.target).textcont());
    };

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emit('formula:done');
        };
    };

    onClick() {
        console.log('onClick');
    };
};