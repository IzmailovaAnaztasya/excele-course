import { capitalize } from './utils.js';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DOMListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  };

  initDOMListeners() {
    //console.log(this.listeners, this.$root);
    this.listeners.forEach((listener) => {
      //поскольку это стрелочная функция то мы можем обращаться напрямую к $root
      //console.log(listener, this.$root);
      const method = getMethodName(listener);
      //console.log(method);

      this[method] = this[method].bind(this);
      //здесь $root абстрактная оболочка и у него нет метода addEventListener, просисываем подобный ему сами в dom.js
      this.$root.on(listener, this[method]); //квадратные скобки чтобы добраться до инстансев нужного класса, однако потом метод уже вызывается в другом контексте
    });
  };

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  };
};

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
