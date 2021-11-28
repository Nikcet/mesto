class Section {
    constructor(renderer, container) {
        this.renderer = renderer;
        this._container = container;
    }

    // Рисует карточки из массива
    renderItems(items) {
        items.forEach(item => {
            this.renderer(item);
        });
    }

    // Добавляет карточку в DOM
    addItem(element) {
        this._container.prepend(element);
    }
}

export default Section;