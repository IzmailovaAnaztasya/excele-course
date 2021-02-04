class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    };

    html(html) {
        if (typeof html === 'string') { //get
            this.$el.innerHTML = html; //set
            return this;
        };
        return this.$el.outerHTML.trim();
    };

    textcont(text) {
        if (typeof text !== 'undefined') { //get
            this.$el.textContent = text; //set
            return this;
        };
        if (this.$el.tagName.toLowerCase() === 'input') { //учесть проверку на 'input'
            return this.$el.value.trim();
        };
        return this.$el.textContent.trim();
    };

    clear() {
        this.html('');
        return this;
    };

    //заменяет функционал addEventListener для listeners, this.$root слушателей
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback); //у него уже есть
    };

    //заменяет функционал addEventListener для listeners, this.$root слушателей
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    };

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        };

        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        };
        return this;
    };

    get data() {
        return this.$el.dataset;
    };

    closest(selector) {
        return $(this.$el.closest(selector));
    };

    getCoords() {
        return this.$el.getBoundingClientRect();
    };

    find(selector) {
       return $(this.$el.querySelector(selector)); // $() чтобы получить наш инстанс а не анативный элемент DOM
    };

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    };

    css(styles = {}) {
        Object.keys(styles).forEach( (key) => {
            this.$el.style[key] = styles[key];
            //console.log(key);
            //console.log(styles[key]);
        });
    };

    getStyles(styles = []) {
        return styles.reduce((res, s) => { //приводит к другому значению, начальное знач - результирующий объект и стиль
            res[s] = this.$el.style[s];
            return res;
        }, {}); //объект и объект
    };

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':'); //возфращаем из объекта парсера в строку
            return {
                row: +parsed[0], //парсим по строке 0, + для приведения к числу
                col: +parsed[1], //парсим по колонке 1
            };
        };
        return this.data.id;
    };

    focus() {
        this.$el.focus();
        return this;
    };

    attr(name, value) { //для упрощения взаимодей-я с атрибутами
        if (value) {
            this.$el.setAttribute(name, value); //если передаем value то записываем и то и то
            return this;
        };
        return this.$el.gerAttribute(name); //либо записывю только name
    };

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    };

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    };
};

// event.terget
export function $(selector) {
    return new Dom(selector);
};

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes)
    };
    return $(el);
};