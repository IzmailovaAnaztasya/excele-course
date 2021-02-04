// Extra Task переписать на class
export function createStore(rootReducer, initialState = {}) {
    // initialState = {} начальное состояние и action несуществующий type: '__INIT__' для заглушки
    let state = rootReducer({...initialState}, {type: '__INIT__'}); //переопределяемая переменная локального состояния
    let listeners = []; //переопределяемая переменная содержит слушателей для Store

    return {
        subscribe(fn) {
            listeners.push(fn); //подписка на fn
            return { //экспортируем при желании отписаться
                unsubscribe() { //с пом-ю объектв и замыкания
                    listeners = listeners.filter((l) => l !== fn); //изменяемость переменной(очищение)
                },
            };
        },

        dispatch(action) {
            state = rootReducer(state, action); //по провилу приним 2 парам в таком порядке для созд. нового state
            listeners.forEach((listener) => listener(state)); //уведомляем все listeners и у каждого вызываем fn listeners с новым stste
        },

        getState() {
            return JSON.parse(JSON.stringify(state));
        },
    };
};