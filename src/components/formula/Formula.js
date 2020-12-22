import {ExcelComponent} from '@core/ExcelComponent.js';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root) {
        super($root, {
            name: 'Formula', //имя данного компанента, чтобы по нему можно было его определять в коде
            listeners: ['input', 'click'], //массив со всеми слушателями которые хотим добавить в этот компанент
        });
    };

    toHTML() {
        return `
        <div class="formula-info">fx</div>
                <div class="formula-input" contenteditable spellcheck="false"></div>
        `
    };

    onInput(event) {
        console.log('Formula: onInput ', event.target.textContent.trim());
    };

    onClick() {
        console.log('onClick');
    };
};