import { initialCardsDatas } from './initialCards.js';

const doc = document.querySelector('.page');
const editWindow = doc.querySelector('#edit-prof');
const addWindow = doc.querySelector('#add-card');
const popupCloseButtons = doc.querySelectorAll('.popup__close');
const editButton = doc.querySelector('.profile__edit-button');

const addButton = doc.querySelector('.profile__add-button');

const nameInput = doc.querySelector('#popup__name');
const aboutInput = doc.querySelector('#popup__about');

const profileName = doc.querySelector('.profile__name');
const profileDescription = doc.querySelector('.profile__description');

const popupImage = doc.querySelector('#popupImage');
const elems = doc.querySelector('.elements');

const popupTitle = doc.querySelector('#popup__title');
const popupPicLink = doc.querySelector('#popup__pic-link');

const initialCardsData = initialCardsDatas();

// Создает 6 карточек
initialCardsData.forEach(function (item) {
    createCard(item.name, item.link);
});

// Создает карточку
function createCard(name, image) {
    // Копирует шаблон разметки
    const cardTemplate = doc.querySelector('.elements__template').content.cloneNode(true);
    // Заполняет шаблон данными
    const cardTemplateImage = cardTemplate.querySelector('.elements__image');
    const cardTemplateName = cardTemplate.querySelector('.elements__name');
    cardTemplateImage.src = image;
    cardTemplateImage.alt = name;
    cardTemplateName.textContent = name;

    addCard(cardTemplate);
}

// Добавляет карточку
function addCard(card) {
    // Лайк
    card.querySelector('.elements__heart').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__heart_active');
    });

    // Удаление
    card.querySelector('.elements__delete').addEventListener('click', function (event) {
        event.target.closest('.elements__card').remove();
    })

    // Попап изображения
    card.querySelector('.elements__image').addEventListener('click', function (event) {
        openImagePopup(event.target);
    })

    // В начало списка добавляется готовая карточка
    elems.prepend(card);
}

// Открывает попап с изображением
function openImagePopup(targetImage) {
    const imagePopup = popupImage.querySelector('.image-popup__image');
    const descrPopup = popupImage.querySelector('.image-popup__description');
    imagePopup.src = targetImage.src;
    imagePopup.alt = targetImage.alt;
    descrPopup.textContent = targetImage.alt;

    openPopup(popupImage);
}

// Открывает попап
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Закрывает попап
function closePopup(activeModal) {
    const popup = activeModal.closest('.popup_opened');
    if (popup) {
        popup.classList.remove('popup_opened');
    }
}

// Заполняет поля формы данными из профиля
function fillInUserInputs() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileDescription.textContent;
}

// Сохраняет данные из формы в профиль
function saveInfoFromEditPopup() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
}

// Сохраняет данные из формы добавления карточки и начинает процесс добавления
function saveInfoFromAddPopup() {
    createCard(popupTitle.value, popupPicLink.value);
}

// Кнопка сохранения данных в профиль
editWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    saveInfoFromEditPopup();
    closePopup(event.target);
});

// Кнопка сохранения данных для новой карточки
addWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    saveInfoFromAddPopup();
    closePopup(event.target);
});

// Кнопка редактирования данных формы
editButton.addEventListener('click', function () {
    openPopup(editWindow);
    fillInUserInputs();
});

// Кнопка добаления новых карточек
addButton.addEventListener('click', function () {
    openPopup(addWindow);
})

popupCloseButtons.forEach(function (item) {
    item.addEventListener('click', function (event) {
        closePopup(event.target);
    })
})