export class Card {
    constructor(item, templateSelector) {
        this._name = item.name;
        this._image = item.link;
        this._templateSelector = templateSelector;
        this.ESC_CODE = 'Escape';
    };
    // Возвращает полностью готовую карточку
    addCard = () => {
        this._card = this._createCard();
        return this._card;
    };
    // Собирает карточку
    _createCard = () => {
        // Копирует шаблон разметки
        this._cardTemplate = this._templateSelector
            .querySelector('.elements__template')
            .content
            .cloneNode(true);

        // Заполняет шаблон данными
        this._cardTemplateImage = this._cardTemplate.querySelector('.elements__image');
        this._cardTemplateName = this._cardTemplate.querySelector('.elements__name');
        this._cardTemplateImage.src = this._image;
        this._cardTemplateImage.alt = this._name;
        this._cardTemplateName.textContent = this._name;

        // Лайк
        this._cardTemplate.querySelector('.elements__heart').addEventListener('click', this._setLike);

        // Удаление
        this._cardTemplate.querySelector('.elements__delete').addEventListener('click', this._deleteCard);

        // Попап изображения
        this._cardTemplate.querySelector('.elements__image').addEventListener('click', this._openImagePopup);

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

    // Открывает попап с изображением
    _openImagePopup = (event) => {
        this._popupImage = document.querySelector('#popupImage');
        this._imagePopup = this._popupImage.querySelector('.image-popup__image');
        this._descrPopup = this._popupImage.querySelector('.image-popup__description');
        this._imagePopup.src = event.target.src;
        this._imagePopup.alt = event.target.alt;
        this._descrPopup.textContent = event.target.alt;

        this._openPopup(this._popupImage);
    };
    // Открывает попап изображения карточки
    _openPopup = (popup) => {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEsc);
    }
    // Закрывает попап изображения карточки
    _closePopup = (popup) => {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeByEsc);
    }
    // Закрывает попап изображения карточки по нажатию на клавишу Esc
    _closeByEsc = (event) => {
        if (event.key === this.ESC_CODE) {
            this._openedPopup = document.querySelector('.popup_opened');
            this._closePopup(this._openedPopup);
        }
    }

}
