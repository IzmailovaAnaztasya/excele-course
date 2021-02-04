import {TABLE_RESIZE, CURRENT_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE} from './types'
//концепт написания Pure functions
export function rootReducer(state, action) {
    //console.log('TYPE', action);

    let prevState;
    let field;
    let val;
    switch (action.type) { //избегаем мутирования и меняем colState
        case TABLE_RESIZE: {
            field = action.data.type === 'col' ? 'colState' : 'rowState';
            prevState = state[field] || {}; //предыдущ сост-е
            prevState[action.data.id] = action.data.deltavalue; //для какого-либо определенного id присвоить нужное знач-е
            return {...state, [field]: prevState}; //теперь добавляем его чтобы изменения суммировались а не переписывались
        };
        case CURRENT_TEXT:
            prevState = state['cellState'] || {};
            prevState[action.data.id] = action.data.text;
            return {...state, currentText: action.data.text, cellState: prevState};
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data};
        case APPLY_STYLE:
            field = 'stylesState';
            val = state[field] || {};
            action.data.ids.forEach((id) => {
                val[id] = {...val[id], ...action.data.value};
            });
            return {...state, [field]: val, currentStyles: {...state.currentStyles, ...action.data.value}};
        case CHANGE_TITLE:
            return {...state, title: action.data};
        default: return state;
    };

    // function value(state, field, action) {
    //     const val = state[field] || {};
    //     val[action.data.id] = action.data.value;
    //     return val;
    // };
};