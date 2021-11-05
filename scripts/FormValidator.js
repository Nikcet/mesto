export class FormValidator {
    constructor(config, form) {
        this.config = config;
        this.form = form;
    }

    // Запускает процесс валидации форм
    enableValidation() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        this._setEventListener(this.form, this.config);
    }

    // Устанавливает слушатель события input на поле
    _setEventListener = () => {
        const inputList = Array.from(this.form.querySelectorAll(this.config.inputSelector));
        const buttonElement = this.form.querySelector(this.config.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    };

    // Переключает кнопку из активного состояния в неактивное и обратно
    _toggleButtonState = (inputList, button) => {
        if (this._hasInvalidInput(inputList)) {
            button.disabled = true;
            button.classList.add(this.config.inactiveButtonClass);
        } else {
            button.disabled = false;
            button.classList.remove(this.config.inactiveButtonClass);
        }
    }

    // Проверяет, валидны ли поля формы
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputItem) => {
            return !inputItem.validity.valid;
        })
    };

    // Проверяет поле на валидность
    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };


    // Функция, которая добавляет класс с ошибкой
    _showInputError = (element, errorMessage) => {
        const errorElement = this.form.querySelector(`.${element.id}-error`);
        element.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${element.id}-error_active`);
    };

    // Функция, которая удаляет класс с ошибкой
    _hideInputError = (element) => {
        const errorElement = this.form.querySelector(`.${element.id}-error`);
        element.classList.remove(this.config.inputErrorClass);
        errorElement.classList.remove(`${element.id}-error_active`);
        errorElement.textContent = '';
    };
}