import Popup from './Popup.js';
import { popupImageIdSelector } from './constants.js';

class PopupWithImage extends Popup {
    // Вообще весь не нужен
    constructor(popupSelector) {
        super(popupSelector);
        this.popupSelector = document.querySelector(popupImageIdSelector); // Не нужен
    }

    // Открывает попап изображения
    open() {
        super.open(); // нафиг
        super.setEventListeners(); // вызываем в index.js
    }
}

export default PopupWithImage;