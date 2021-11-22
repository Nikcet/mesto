import Popup from './Popup.js';
import { inputQuerySelector, formQuerySelector } from '../scripts/constants.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = popupSelector.querySelector(formQuerySelector);
        this._inputList = popupSelector.querySelectorAll(inputQuerySelector);
        this._inputValues = {};
    }

    _getInputValues = () => {
        this._inputList.forEach(item => {
            if (item.value.length > 0) {
                this._inputValues[item.name] = item.value;
            }
        })
        return this._inputValues;
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', event => {
            event.preventDefault();
            this._submitHandler(this._getInputValues());
            this.close();
        })
    }
}
