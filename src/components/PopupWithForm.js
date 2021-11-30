import Popup from './Popup.js';
import { inputQuerySelector, formQuerySelector } from '../scripts/constants.js';

export default class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup);
        this._submitHandler = submitHandler;
        this._form = popup.querySelector(formQuerySelector);
        this._inputList = popup.querySelectorAll(inputQuerySelector);
        this._inputValues = {};
    }

    // Закрывает попап с формой
    close() {
        this._form.reset();
        super.close();
    }

    // Вешает слушатель события сабмит
    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', event => {
            event.preventDefault();
            this._submitHandler(this._getInputValues());
        })
    }

    // Собирает данные из полей ввода
    _getInputValues = () => {
        this._inputList.forEach(item => {
            // Проверяет, есть ли вообще хоть какая-то информация в полях, чтобы не добавлять undefined'ы в список
            if (item.value.length > 0) {
                this._inputValues[item.name] = item.value;
            }
        })
        return this._inputValues;
    }

    // Переключает кнопку в выключенное состояние
    _toggleButtonState() {
        this._button = this._form.querySelector('.popup__submit-btn');
        this._button.disabled = true;
        this._button.classList.add('popup__submit-btn_disabled');
    }
}
