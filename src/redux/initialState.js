import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'
import {clone} from '../core/utils'

//пустой объект для начального состояния который потом заполняется
const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    cellState: {}, //{'0:1','text'}
    stylesState: {}, //{id: {значение}} возможно лучше хранить в строке
    currentText: '', //поле отвечающ за текущий текст ячейки или фрмулы
    currentStyles: defaultStyles,
    openDate: new Date().toJSON(), //запихиваем Date() в строку чтобы можно было работать как со строкой, а не с объектом
};

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  });


//прописываем логику нашего начального состояния для LocalStorage
export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState;

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
};