import {$} from '@core/dom.js'

export function resizeHandler($root, event) {
    const $target = $(event.target); //переменная в которой оборачиваем объект в DOM утилиту $
    const $parent = $target.closest('[data-type="targetable"]');
    const coords = $parent.getCoords();

    const type = $target.data.resize; //получаем значение атрибута по которому будем проводить проверку
    //console.log(type); //смотрим значение

    //console.log($parent.getCoords());
    //console.log($parent.data);
    const cellsdata = $root.findAll(`[data-col="${$parent.data.col}"]`);

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
            document.onmouseup = null;
        };
    };
};