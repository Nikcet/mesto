class Section {
    constructor(items, renderer, containerSelector) {
        this._items = items;
        this.renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems() {
        this._items.forEach(item => {
            this.addItem(this.renderer(item));
        });
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }
}

export default Section;