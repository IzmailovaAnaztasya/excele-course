import {Page} from '@core/Page';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
//import {initialState} from '@/redux/initialState';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import { debounce, storage } from '@core/utils';
import { normalizeInitialState } from '../../redux/initialState';

function storageName(param) {
    return 'excel:' + param;
};

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();
        //const params = this.params;

        //console.log(this.params);
        const state = storage(storageName(params));
        const store = createStore(rootReducer, normalizeInitialState(state));

        const stateListener = debounce((state) => {
            console.log('App State:', state);
            storage(storageName(params), state)
        }, 300);

        store.subscribe(stateListener); //передаем но не вызываем

        this.excel = new Excel({ //запуск компонента
            components: [Header, Toolbar, Formula, Table],
            store,
        });

        return this.excel.getRoot();
    };

    afterRender() {
        this.excel.init();
    };

    destroy() {
        this.excel.destroy();
    };
};