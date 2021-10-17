const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__input_no-valid',
};

// Запускает процесс валидации форм
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        setEventListener(formElement, config);
    });
};

// Устанавливает слушатель события input на поле
const setEventListener = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(form, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        })
    })
};

// Переключает кнопку из активного состояния в неактивное и обратно
const toggleButtonState = (inputList, button, config) => {
    if (hasInvalidInput(inputList)) {
        button.disabled = true;
        button.classList.add(config.inactiveButtonClass);
    } else {
        button.disabled = false;
        button.classList.remove(config.inactiveButtonClass);
    }
}

// Проверяет, валидны ли поля формы
const hasInvalidInput = (inputList) => {
    return inputList.some((inputItem) => {
        return !inputItem.validity.valid;
    })
};

// Проверяет поле на валидность
const isValid = (form, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(form, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(form, inputElement, config);
    }
};


// Функция, которая добавляет класс с ошибкой
const showInputError = (form, element, errorMessage, config) => {
    const errorElement = form.querySelector(`.${element.id}-error`);
    element.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${element.id}-error_active`);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, element, config) => {
    const errorElement = form.querySelector(`.${element.id}-error`);
    element.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(`${element.id}-error_active`);
    errorElement.textContent = '';
};


enableValidation(validationConfig);
