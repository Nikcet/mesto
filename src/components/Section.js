class Section {
    constructor(items, renderer, container) {
        this._items = items;
        this.renderer = renderer;
        this._container = container;
    }

    // Рисует карточки из массива
    renderItems() {
        this._items.forEach(item => {
            this.renderer(item);
        });
    }

    // Добавляет карточку в DOM
    addItem(element) {
        this._container.prepend(element);
    }
}

export default Section;