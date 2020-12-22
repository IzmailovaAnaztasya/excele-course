import {ExcelComponent} from '@core/ExcelComponent.js';

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar';

    constructor($root) {
        super($root, {
            name: 'Toolbar', //имя данного компанента, чтобы по нему можно было его определять в коде
            listeners: ['click'], //массив со всеми слушателями которые хотим добавить в этот компанент
        });
    };

    toHTML() {
        return `
        <div class="button">
                    <span class="material-icons">format_align_left</span>
                </div>

                <div class="button">
                    <span class="material-icons">format_align_center</span>
                </div>

                <div class="button">
                    <span class="material-icons">format_align_right</span>
                </div>

                <div class="button">
                    <span class="material-icons">format_bold</span>
                </div>

                <div class="button">
                    <span class="material-icons">format_italic</span>
                </div>

                <div class="button">
                    <span class="material-icons">format_underlined</span>
                </div>
        `
    }

    onClick() {
        console.log('onClickToolbar');
    };
};