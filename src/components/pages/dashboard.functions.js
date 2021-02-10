import { storage } from "../../core/utils"; // eslint-disable-line

export function toHTML(key) {
    const model = storage(key);
    const id = key.split(':')[1];
    return `
         <li class="dashboard__record">
             <a href="#excel/${id}">${model.title}</a>
             <strong>
                ${new Date(model.openDate).toLocaleDateString()}
                ${new Date(model.openDate).toLocaleTimeString()}
             </strong>
        </li>
    `
};

//получаем список ключей которые содержать создаваемые таблицы в формате
//excel:1232112
function getAllKeys() {
    const keys = [];
    for (let i=0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        };
        keys.push(key);
    };
    return keys;
};

export function createRecordsTable() {
    const keys = getAllKeys();
    console.log('localStorage keys:', keys);
    if (!keys.length) {
        return `<p>Вы пока не создали ни одной таблицы</p>`
    };

    return `
        <div class="dashboard__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="dashboard__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `
};