const CharCODES = {
    A: 65,
    Z: 90,
};

function createCell() {
    return `
        <div class="cell" contenteditable=""></div>
    `
};

function createCol(col) {
    return `
        <div class="column">${col}</div>
    `
};

function createRow(index, content) {
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
};

export function createTable(rowsCount = 15) {
    const colsCount = CharCODES.Z - CharCODES.A + 1; //общее кол-во колонок по буквам
    const rows = []; //создаем наши строки
    //console.log(rows);

    const cols = new Array(colsCount).fill('').map((el, index) => {
        return String.fromCharCode(CharCODES.A + index)
    })
        .map((el) => {
            return createCol(el)
        }).join(''); //разбиваем первую строку на Колонки

    //console.log(cols);

    const cells = new Array(colsCount).fill('').map((el) => {
        return createCell(el)
    }).join('');
    //console.log(colsCell);

    rows.push(createRow(null, cols)); //формируем первую строку с шапкой таблицы A-Z

    for (let i = 0; i < rowsCount; i++) { //с пом-ю цикла созд макет остальных строк
        rows.push(createRow(i + 1, cells));
    };

    return rows.join('');
};