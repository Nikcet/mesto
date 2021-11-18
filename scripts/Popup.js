import { KEY_CODE } from './constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._currentPopup = popupSelector;
    }

    open() {
        this._currentPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._currentPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._currentPopup.querySelector('.popup__close').addEventListener('click', () => this.close());

        this._currentPopup.addEventListener('click', event => {
            if (event.target.classList.contains('popup_opened')) this.close();
        })
    }

    _handleEscClose = (event) => {
        if (event.key === KEY_CODE) this.close();
    }
}
