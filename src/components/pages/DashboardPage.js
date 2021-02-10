import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createRecordsTable} from './dashboard.functions';

export class DashboardPage extends Page {
    getRoot() {
        const nowID = Date.now().toString(); //в качестве ID на фронтенде
        return $.create('div', 'dashboard').html(`
            <div class="dashboard__header">
                <h1>Excel Dashboard</h1>
            </div>

            <div class="dashboard__new">
                <div class="dashboard__view">
                    <a href="#excel/${nowID}" class="dashboard__create">
                        Новая <br /> Таблица
                    </a> <!--блокк ссылки-->
                </div>
            </div>

            <div class="dashboard__table dashboard__view">
                ${ createRecordsTable() }
            </div>
        `);
    };
};