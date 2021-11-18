import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupSelector = document.querySelector('#popupImage');
    }

    open(event) {
        this._imagePopup = this.popupSelector.querySelector('.image-popup__image');
        this._descrPopup = this.popupSelector.querySelector('.image-popup__description');
        this._imagePopup.src = event.target.src;
        this._imagePopup.alt = event.target.alt;
        this._descrPopup.textContent = event.target.alt;

        super.open();
        super.setEventListeners();
    }
}

export default PopupWithImage;