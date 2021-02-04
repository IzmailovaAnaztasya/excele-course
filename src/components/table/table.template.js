import { toInlineStyles } from '../../core/utils';
import { defaultStyles } from '@/constants';
import { parce } from '@core/parce';

const CharCODES = {
    A: 65,
    Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
};

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
};

function createCell(state, i, index) {
    //console.log(index);
    const width = getWidth(state.colState, index);
    const id = `${i}:${index}`;
    const data = state.cellState[id];
    //'font-weight: bold; text-decoration: underline; ...'
    const styles = toInlineStyles({
        ...defaultStyles,
        ...state.stylesState[id],
    });
    return `
        <div class="cell" contenteditable="" data-col="${index}" data-type="cell"
        data-id="${id}" data-value="${data || ''}" style="${styles}; width:${width}">${parce(data) || ''}</div>
        <div class="cell-resize" data-resize="cell"></div>
    `
};

function createCol({col, index, width}) { //диструктуризация принимаемых объектов
    //console.log(index);
    return `
        <div class="column" data-type="targetable" data-col="${index}" style="width:${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
        </div>
    `
};

function createRow(index, content, state) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index);
    return `
        <div class="row" data-type="targetable" data-row="${index}" style="height:${height}">
            <div class="row-info">
            ${index ? index : ''}
            ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
};

function widthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index),
        };
    };
};

export function createTable(rowsCount = 15, state = {}) {
    //console.log(state);
    const colsCount = CharCODES.Z - CharCODES.A + 1; //общее кол-во колонок по буквам
    const rows = []; //создаем наши строки
    //console.log(rows);

    const cols = new Array(colsCount).fill('').map((el, index) => { //сщздание нового массива Array
        return String.fromCharCode(CharCODES.A + index)
    })
        .map(widthFrom(state)) //для рендера State
        .map((el, index) => { //передает 3 параметра el index arrey
            return createCol(el, index) //вот тут мы создаем колонку
        }).join(''); //разбиваем первую строку на Колонки

    //console.log(cols);

    rows.push(createRow(null, cols, {})); //формируем первую строку с шапкой таблицы A-Z
    // добавляем пустой {} чтобы не передавать напрямую state но учитывать его

    for (let i = 0; i < rowsCount; i++) { //с пом-ю цикла созд макет остальных строк
        const cells = new Array(colsCount).fill('').map((_, index) => {
            return createCell(state, i, index)
            }).join('');
            //console.log(colsCell);
        rows.push(createRow(i + 1, cells, state.rowState));
    };

    return rows.join('');
};