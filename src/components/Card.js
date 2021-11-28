import {
    heartQuerySelector,
    deleteQuerySelector,
    imageQuerySelector,
    heartNumberQuerySelector,
    elementsImageQuerySelector,
    elementsNameQuerySelector,
} from '../scripts/constants.js';


class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteClick }, templateSelector) {
        this._item = data;
        this._name = data.name;
        this._link = data.link;
        this.id = data._id;
        this._currentUserId = data.currentUserId;
        this._likes = data.likes;
        this._likesNumber = data.likes.length;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
        this.handleDeleteClick = handleDeleteClick;
        this.like = false;
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
        this._numberLikesText = this._cardElement.querySelector(heartNumberQuerySelector);

        this._cardTemplateImage.src = this._link;
        this._cardTemplateImage.alt = this._name;
        this._cardTemplateName.textContent = this._name;
        this._numberLikesText.textContent = this._likesNumber;

        // Скрывает кнопки удаления, если они не свои
        this._trash = this._cardElement.querySelector(deleteQuerySelector);
        if (this._currentUserId !== this._item.owner._id) {
            this._trash.style.visibility = 'hidden';
        }

        // Проверка, стоит ли уже лайк у карточки
        this.isLiked() ? this.like = true : this.like = false;

        // Навешивает слушатели
        this._setEventListeners();

        return this._cardTemplate;
    }

    _setEventListeners() {
        // Лайк
        this._heart = this._cardElement.querySelector(heartQuerySelector);
        this._heart.addEventListener('click', () => this._setLike());
        this._updateLike();

        // Удаление
        this._trash.addEventListener('click', () => { this.handleDeleteClick(this) });

        // Попап изображения
        this._cardElement.querySelector(imageQuerySelector).addEventListener('click', () => this.handleCardClick(this._item));
    }

    // Лайк
    _setLike = () => {
        this.like = !this.like;
        this.handleLikeClick(this);
        this._updateLike();
    }

    // Ставит ярлык - лайкнута ли карточка
    _updateLike() {
        this.like
            ? this._heart.classList.add('elements__heart_active')
            : this._heart.classList.remove('elements__heart_active');
    }

    // Проверяет, лайкнута ли уже карточка
    isLiked() {
        return this._likes.some(user => user._id === this._currentUserId);
    }

    // Обновляет отображение лайков в карточке
    setLikes(dataCard) {
        this._likes = dataCard.likes;
        this._numberLikesText.textContent = dataCard.likes.length;
    }

    // Удаление
    deleteCard() {
        this._trash.closest('.elements__card').remove();
    }

}

export default Card;