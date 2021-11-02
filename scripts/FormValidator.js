export class FormValidator {
    constructor(config, form) {
        this.config = config;
        this.form = form;
    }

    // Запускает процесс валидации форм
    enableValidation(config) {
        const formList = Array.from(document.querySelectorAll(this.config.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (event) => {
                event.preventDefault();
            })
            this._setEventListener(formElement, this.config);
        });
    }

    // Устанавливает слушатель события input на поле
    _setEventListener = (form, config) => {
        const inputList = Array.from(form.querySelectorAll(config.inputSelector));
        const buttonElement = form.querySelector(config.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement, config);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(form, inputElement, config);
                this._toggleButtonState(inputList, buttonElement, config);
            })
        })
    };

    // Переключает кнопку из активного состояния в неактивное и обратно
    _toggleButtonState = (inputList, button, config) => {
        if (this._hasInvalidInput(inputList)) {
            button.disabled = true;
            button.classList.add(config.inactiveButtonClass);
        } else {
            button.disabled = false;
            button.classList.remove(config.inactiveButtonClass);
        }
    }

    // Проверяет, валидны ли поля формы
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputItem) => {
            return !inputItem.validity.valid;
        })
    };

    // Проверяет поле на валидность
    _isValid = (form, inputElement, config) => {
        if (!inputElement.validity.valid) {
            this._showInputError(form, inputElement, inputElement.validationMessage, config);
        } else {
            this._hideInputError(form, inputElement, config);
        }
    };


    // Функция, которая добавляет класс с ошибкой
    _showInputError = (form, element, errorMessage, config) => {
        const errorElement = form.querySelector(`.${element.id}-error`);
        element.classList.add(config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${element.id}-error_active`);
    };

    // Функция, которая удаляет класс с ошибкой
    _hideInputError = (form, element, config) => {
        const errorElement = form.querySelector(`.${element.id}-error`);
        element.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(`${element.id}-error_active`);
        errorElement.textContent = '';
    };
}