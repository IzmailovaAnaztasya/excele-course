import {$} from '@core/dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router'); //проверка на наличие селектора
        };

        this.$placeholder = $(selector);
        this.routes = routes;

        this.page = null;

        this.changePageHandler = this.changePageHandler.bind(this);

        this.init()
    };

    init() {
        window.addEventListener('hashchange', this.changePageHandler); //отслеживаем изменение страниц и вызываем метод
        this.changePageHandler();
    };

    changePageHandler() {
        // console.log(ActiveRoute.path);
        // console.log('param:', ActiveRoute.param);
        //this.$placeholder.html('<h1>' + ActiveRoute.path);
        if (this.page) {
            this.page.destroy();
        };
        this.$placeholder.clear();

        const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard;

        this.page = new Page(ActiveRoute.param);

        this.$placeholder.append(this.page.getRoot());

        this.page.afterRender();
    };

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler);
    };
};