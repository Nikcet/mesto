class Section {
    constructor(items, renderer, containerSelector) {
        this._items = items;
        this.renderer = renderer;
        this._containerSelector = containerSelector;
    }

    // Рисует карточки из массива
    renderItems() {
        this._items.forEach(item => {
            this.renderer(item);
        });
    }

    // Добавляет карточку в DOM
    addItem(element) {
        this._containerSelector.prepend(element);
    }
}

export default Section;