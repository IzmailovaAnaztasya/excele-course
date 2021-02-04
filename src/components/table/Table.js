import { ExcelComponent } from '@core/ExcelComponent.js';
import { $ } from '../../core/dom';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import { resizeHandler } from './table.resize';
import { isCell, shouldResize, range, nextSelector } from './table.function';
import * as actions from '@/redux/actions'
import { defaultStyles } from '@/constants'
import { parce } from '@core/parce'

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  };

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  };

  init() {
    super.init(); //чтобы добавились элементы DOM

    const $cellSelect = this.$root.find('[data-id="0:0"]'); //переменная для выбран ячейки
    this.selectCell($cellSelect);

    this.$on('formula:input', (value) => {
      this.selection.current.attr('data-value', value).textcont(parce(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      //console.log('Table style:', style);
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });

    // this.$subscribe((state) => {
    //   console.log('TableState', state);
    // });
  };

  selectCell($cellSelect) {
    this.selection.select($cellSelect);
    this.$emit('table:select', $cellSelect);
    const styles = $cellSelect.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));

    console.log('Styles to dispatch', styles);
  };

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
      //console.log('Resize data', data);
    } catch (e) {
      console.warn('Resize error', e.message);
    };
  };

  onMousedown(event) {
    if (shouldResize(event)) {
      //уравнение позволяет не учитывать Mousedown там где нет dataset.resize
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        const colsRange = range(current.col, target.col); // console.log('cols', colsRange);
        const rowsRange = range(current.row, target.row); // console.log('rows', rowsRange);

        const ids = colsRange.reduce((acc, col) => {
          rowsRange.forEach((row) => acc.push(`${row}:${col}`));
          return acc;
        }, []);
        //console.log(ids);

        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      };
    };
    //console.log(event.target);
  };

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event; //снова диструктизация чтобы не писать (event.key) каждый раз
    if (keys.includes(key) && !event.shiftKey) {
      //console.log(key);
      event.preventDefault();
      const { col, row } = this.selection.current.id(true); //старая ячейка
      const $next = this.$root.find(nextSelector(key, { col, row })); //новая ячейка
      this.selectCell($next);//учитываем событие перехода но новую ячейку для Formula
    };
  };

  updateTextInStore(text) {
    this.$dispatch(actions.changeText({ //передавем
      id: this.selection.current.id(), //ключ id
      text, //текст
    }));
  };

  onInput(event) {
    //this.$emit('table:text', $(event.target));
    this.updateTextInStore($(event.target).textcont()); //текст
  };
};
