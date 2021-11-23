import {
    heartQuerySelector,
    deleteQuerySelector,
    imageQuerySelector,
    elementsImageQuerySelector,
    elementsNameQuerySelector,
} from '../scripts/constants.js';

class Card {
    constructor({ item, handleCardClick }, templateSelector) {
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        this._templateSelector = templateSelector;
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
        this._cardTemplateImage = this._cardElement.querySelector(elementsImageQuerySelector);
        this._cardTemplateName = this._cardElement.querySelector(elementsNameQuerySelector);
        this._cardTemplateImage.src = this._link;
        this._cardTemplateImage.alt = this._name;
        this._cardTemplateName.textContent = this._name;

        // Навешивает слушатели
        this._setEventListeners();

        return this._cardTemplate;
    }

    _setEventListeners() {
        // Лайк
        this._cardElement.querySelector(heartQuerySelector).addEventListener('click', this._setLike);

        // Удаление
        this._cardElement.querySelector(deleteQuerySelector).addEventListener('click', this._deleteCard);

        // Попап изображения
        this._cardElement.querySelector(imageQuerySelector).addEventListener('click', () => this.handleCardClick(this._item));
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