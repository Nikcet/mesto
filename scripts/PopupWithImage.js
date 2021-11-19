import Popup from './Popup.js';
import { popupImageIdSelector, imagePopupSelector, descriptionPopupSelector } from './constants.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupSelector = document.querySelector(popupImageIdSelector);
    }

    open(event) {
        this._imagePopup = this.popupSelector.querySelector(imagePopupSelector);
        this._descrPopup = this.popupSelector.querySelector(descriptionPopupSelector);
        this._imagePopup.src = event.target.src;
        this._imagePopup.alt = event.target.alt;
        this._descrPopup.textContent = event.target.alt;

        super.open();
        super.setEventListeners();
    }
}

export default PopupWithImage;