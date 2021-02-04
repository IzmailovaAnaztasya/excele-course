import { isEqual } from '@core/utils'

export class StoreSubscriber {
    constructor(store) {
        this.store = store;
        this.sub = null; //переменная подписки
        this.prevState = {}; //предыдущ. сост-е
    };

    //Принимаем список компонентов, которые необходимо подписать
    subscribeComponents(components) {
        this.prevState = this.store.getState();

        this.sub = this.store.subscribe((state) => {
            Object.keys(state).forEach((key) => {
                //console.log(key);
                if (!isEqual(this.prevState[key], state[key])) { //проверка новых состояний компонентов
                    components.forEach((component) => { //присваиваем обновления
                        if (component.isWatching(key)) {
                            const changes = {[key]: state[key]};
                            component.storeChanged(changes);
                        };
                    });
                };
            });
            this.prevState = this.store.getState();
        });
    };

    //Отписка от изменений в Store
    unsubscribeFromStore() {
        this.sub.unsubscribe();
    };
};