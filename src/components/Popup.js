import {
    KEY_CODE,
    popupOpenedClassSelector,
    popupCloseQuerySelector,
} from '../scripts/constants.js';

export default class Popup {
    constructor(popup) {
        this._currentPopup = popup;
        this._popupClose = this._currentPopup.querySelector(popupCloseQuerySelector);
        this._button = this._currentPopup.querySelector('.popup__submit-btn');

    }

    // Открывает попап
    open() {
        this._currentPopup.classList.add(popupOpenedClassSelector);
        document.addEventListener('keydown', this._handleEscClose);
        this.loading(false);
    }

    // Закрывает попап
    close() {
        this._currentPopup.classList.remove(popupOpenedClassSelector);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // Вешает слушатели кликов по крестовине и оверлею на попап
    setEventListeners() {
        this._popupClose.addEventListener('click', () => this.close());
        this._currentPopup.addEventListener('click', this._closePopup);
    }

    // Закрывает попап по клику на оверлей
    _closePopup = (event) => {
        if (event.target.classList.contains(popupOpenedClassSelector)) this.close();
    }

    // Закрывает попап ко нажатию на клавишу Esc
    _handleEscClose = (event) => {
        if (event.key === KEY_CODE) this.close();
    }

    // Отображает процесс сохранения
    loading = (isLoading) => {
        isLoading
            ? this._button.textContent = 'Сохранение...'
            : this._button.textContent = 'Сохранить';
    }

}
