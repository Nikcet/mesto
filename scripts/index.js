import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { validationConfig } from './validationConfig.js';

const elems = document.querySelector('.elements');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('#edit-prof');
const popupAddCard = document.querySelector('#add-card');

const nameInput = document.querySelector('#popup__name');
const aboutInput = document.querySelector('#popup__about');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const popupList = document.querySelectorAll('.popup');

const ESC_CODE = 'Escape';

const validationProfile = new FormValidator(validationConfig, popupEditProfile);
const validationAddCard = new FormValidator(validationConfig, popupAddCard);

// Создает 6 карточек
initialCards.forEach(function (item) {
    addCard(item);
});

// Добавляет карточку через класс Card
function addCard(item) {
    let card = new Card(item, elems).addCard();
    elems.prepend(card);
};

// Кнопка редактирования данных формы
editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    fillInUserInputs();
    // Запускает валидатор данных формы
    validationProfile.enableValidation();
});

// Заполняет поля формы данными из профиля
function fillInUserInputs() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileDescription.textContent;
};

// Кнопка добаления новых карточек
addButton.addEventListener('click', function () {
    clearDatasFromPopup(popupAddCard);
    openPopup(popupAddCard);
    toggleButtonState(popupAddCard);
    // Запускает валидатор данных формы
    validationAddCard.enableValidation();
});

// Очищает форму добавления карточки во время ее открытия
function clearDatasFromPopup(form) {
    const inputList = form.querySelectorAll('.popup__input');
    inputList.forEach(function (inputItem) {
        inputItem.value = '';
    })
}

// Переключение состояния кнопки
function toggleButtonState(popup) {
    const button = popup.querySelector('.popup__submit-btn');

    button.disabled = true;
    button.classList.add('popup__submit-btn_disabled');
}

// Кнопка сохранения данных в профиль
popupEditProfile.addEventListener('submit', function (event) {
    event.preventDefault();
    saveInfoFromEditPopup();
    closePopup(popupEditProfile);
});

// Сохраняет данные из формы в профиль
function saveInfoFromEditPopup() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
};

// Сохраняет данные из формы добавления карточки и начинает процесс добавления
function saveInfoFromAddPopup() {
    const inputCardName = document.querySelector('#popup__title');
    const inputCardLink = document.querySelector('#popup__pic-link');
    const datas = {
        name: inputCardName.value,
        link: inputCardLink.value
    }
    addCard(datas);
};

// Кнопка сохранения данных для новой карточки
popupAddCard.addEventListener('submit', function (event) {
    event.preventDefault();
    saveInfoFromAddPopup();
    closePopup(popupAddCard);
});

// Открывает попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
    // Добавляет слушатель событый для кливиши Esc
    document.addEventListener('keydown', closeByEsc);
};

// Закрывает попап
function closePopup(activeModal) {
    activeModal.classList.remove('popup_opened');
    // Удаляет слушатель событый для кливиши Esc
    document.removeEventListener('keydown', closeByEsc);
};

// Функция закрытия попапов по нажатию на клавишу esc
function closeByEsc(event) {
    if (event.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// Вешает слушатели на все кнопки закрытия попапов
popupCloseButtons.forEach(function (item) {
    item.addEventListener('click', function (event) {
        closePopup(event.target.closest('.popup_opened'));
    });
});

// Закрывает попапы, если нажать на оверлей
popupList.forEach((popupItem) => {
    popupItem.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup_opened')) {
            closePopup(popupItem);
        };
    });
});
