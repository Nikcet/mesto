class Card {
    constructor({ item, handleCardClick }, templateSelector) {
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        this._templateSelector = templateSelector;
        this.ESC_CODE = 'Escape';
        this.handleCardClick = handleCardClick;
    };

    // Возвращает пустой шаблон
    _getTemplate = () => {
        return this._cardTemplate = this._templateSelector
            .querySelector('.elements__template')
            .content
            .querySelector('.elements__card')
            .cloneNode(true);
    };

    // Возвращает готовую карточку
    createCard = () => {
        // Копирует шаблон разметки
        this._cardElement = this._getTemplate();

        // Заполняет шаблон данными
        this._cardTemplateImage = this._cardElement.querySelector('.elements__image');
        this._cardTemplateName = this._cardElement.querySelector('.elements__name');
        this._cardTemplateImage.src = this._link;
        this._cardTemplateImage.alt = this._name;
        this._cardTemplateName.textContent = this._name;

        // Лайк
        this._cardElement.querySelector('.elements__heart').addEventListener('click', this._setLike);

        // Удаление
        this._cardElement.querySelector('.elements__delete').addEventListener('click', this._deleteCard);

        // Попап изображения
        this._cardElement.querySelector('.elements__image').addEventListener('click', () => this.handleCardClick(this._item));

        return this._cardTemplate;
    }
    // Лайк
    _setLike(event) {
        event.target.classList.toggle('elements__heart_active');
    }
    // Удаление
    _deleteCard(event) {
        event.target.closest('.elements__card').remove();
    }

}

export default Card;