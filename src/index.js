import {Excel} from '@/components/excel/Excel.js';
import './scss/index.scss';

const excel = new Excel('#app', {
    components: [];
});

console.log('Excel', excel);
