// Функция, которая добавляет класс с ошибкой
const showInputError = (form, element, errorMessage) => {
    const errorElement = form.querySelector(`.${element.id}-error`);
    element.classList.add('popup__input_no-valid');
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${element.id}-error_active`);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, element) => {
    const errorElement = form.querySelector(`.${element.id}-error`);
    element.classList.remove('popup__input_no-valid');
    errorElement.classList.remove(`${element.id}-error_active`);
    errorElement.textContent = '';
};

// Проверяет поле на валидность
const isValid = (form, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(form, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(form, inputElement);
    }
};

// Устанавливает слушатель события input на поле
const setEventListener = (form) => {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const buttonElement = form.querySelector('.popup__submit-btn');

    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(form, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
};

// Запускает процесс валидации формы
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        })
        setEventListener(formElement);
    });
};

// Проверяет, валидно ли поле формы
const hasInvalidInput = (inputList) => {
    return inputList.some((inputItem) => {
        return !inputItem.validity.valid;
    })
};

// Переключает кнопку из активного состояния в неактивное и обратно
const toggleButtonState = (inputList, button) => {
    if (hasInvalidInput(inputList)) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

enableValidation();