import {Router} from '@core/routes/Router'
import {DashboardPage} from '@/components/pages/DashboardPage'
import { ExcelPage } from './components/pages/ExcelPage';
import './scss/index.scss';

new Router('#app', { //передаем необходимый селектор и набор роутеров к нему
    dashboard: DashboardPage,
    excel: ExcelPage,
});