import {ExcelComponent} from '@core/ExcelComponent.js';
import { $ } from '../../core/dom';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import { resizeHandler } from './table.resize';
import { isCell, shouldResize, range, nextSelector } from './table.function';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        })
    };

    toHTML() {
        return createTable(20);
    };

    prepare() {
        this.selection = new TableSelection();
    };

    init() {
        super.init();//чтобы добавились элементы DOM

        const $cellSelect = this.$root.find('[data-id="0:0"]'); //переменная для выбран ячейки
        this.selection.select($cellSelect);

        this.$on('formula:text', (text) => {
            this.selection.current.textcont(text);
        });

        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
    };

    onMousedown(event) {
            if (shouldResize(event)) { //уравнение позволяет не учитывать Mousedown там где нет dataset.resize
                resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const target = $target.id(true);
                const current = this.selection.current.id(true);

                const colsRange = range(current.col, target.col); // console.log('cols', colsRange);
                const rowsRange = range(current.row, target.row); // console.log('rows', rowsRange);

                const ids = colsRange.reduce((acc, col) => {
                    rowsRange.forEach((row) => acc.push(`${row}:${col}`));
                    return acc;
                }, []);
                //console.log(ids);

                const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
            };
        };
        //console.log(event.target);
    };

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp',
        ];

        const {key} = event; //снова диструктизация чтобы не писать (event.key) каждый раз
        if (keys.includes(key) && !event.shiftKey) {
            //console.log(key);
            event.preventDefault();
            const {col, row} = this.selection.current.id(true); //старая ячейка
            const $next = this.$root.find(nextSelector(key, {col, row})); //новая ячейка
            this.selection.select($next);
            this.$emit('table:select', $next); //учитываем событие перехода но новую ячейку для Formula
        };
    };

    onInput(event) {
        this.$emit('table:text', $(event.target));
    };
};
