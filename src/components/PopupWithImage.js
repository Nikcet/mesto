import Popup from './Popup.js';
import {
    imagePopupQuerySelector,
    descriptionPopupSelector,
} from '../scripts/constants.js';

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = popup.querySelector(imagePopupQuerySelector);
        this._description = popup.querySelector(descriptionPopupSelector);
    }

    // Открывает попап изображения
    open(data) {
        this._image.src = data.link;
        this._image.alt = data.name;
        this._description.textContent = data.name;
        super.open();
    }
}

export default PopupWithImage;