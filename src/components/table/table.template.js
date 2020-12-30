const CharCODES = {
    A: 65,
    Z: 90,
};

function createCell(_, index) {
    //console.log(index);
    return `
        <div class="cell" contenteditable="" data-col="${index}">
        <div class="cell-resize" data-resize="cell"></div>
        </div>
    `
};

function createCol(col, index) {
    //console.log(index);
    return `
        <div class="column" data-type="targetable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
        </div>
    `
};

function createRow(index, content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="targetable">
            <div class="row-info">
            ${index ? index : ''}
            ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
};

export function createTable(rowsCount = 15) {
    const colsCount = CharCODES.Z - CharCODES.A + 1; //общее кол-во колонок по буквам
    const rows = []; //создаем наши строки
    //console.log(rows);

    const cols = new Array(colsCount).fill('').map((el, index) => { //сщздание нового массива Array
        return String.fromCharCode(CharCODES.A + index)
    })
        .map((el, index) => { //передает 3 параметра el index arrey
            return createCol(el, index) //вот тут мы создаем колонку
        }).join(''); //разбиваем первую строку на Колонки

    //console.log(cols);

    const cells = new Array(colsCount).fill('').map((el, index) => {
        return createCell(el, index)
    }).join('');
    //console.log(colsCell);

    rows.push(createRow(null, cols)); //формируем первую строку с шапкой таблицы A-Z

    for (let i = 0; i < rowsCount; i++) { //с пом-ю цикла созд макет остальных строк
        rows.push(createRow(i + 1, cells));
    };

    return rows.join('');
};