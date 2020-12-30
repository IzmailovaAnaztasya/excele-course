import {ExcelComponent} from '@core/ExcelComponent.js';
import { createTable } from './table.template';
import {$} from '@core/dom.js';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
        })
    };

    toHTML() {
        return createTable(20);
    };

    // onClick() {
    //     console.log('click');
    // };

    onMousedown(event) {
            if (event.target.dataset.resize) { //уравнение позволяет не учитывать Mousedown там где нет dataset.resize
                const $target = $(event.target); //переменная в которой оборачиваем объект в DOM утилиту $
                const $parent = $target.closest('[data-type="targetable"]');
                const coords = $parent.getCoords();

                const type = $target.data.resize; //получаем значение атрибута по которому будем проводить проверку
                //console.log(type); //смотрим значение

                //console.log($parent.getCoords());
                //console.log($parent.data);
                const cellsdata = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

                document.onmousemove = (e) => { // обращение к документу на событие и назначение этому функции
                    if (type === 'col') {
                        const delta = e.pageX - coords.right; //разница между коорд. мышки - коорд положения
                        //console.log(delta);
                        const deltavalue = coords.width + delta;
                        $parent.css({width: deltavalue + 'px'});
                        cellsdata.forEach((el) => el.style.width = deltavalue + 'px'); //получаем все ячейки таблицы и работаем}
                    } else {
                        const delta = e.pageY - coords.bottom;
                        //console.log(delta);
                        const deltavalue = coords.height + delta;
                        $parent.css({height: deltavalue + 'px'});
                    };

                    document.onmouseup = () => {
                    document.onmousemove = null;
                };
            };
        };
    };
};