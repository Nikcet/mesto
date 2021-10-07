import { initialCardsDatas } from './initialCards.js';

const doc = document.querySelector('.page');
const popupEditProfile = doc.querySelector('#edit-prof');
const popupAddCard = doc.querySelector('#add-card');
const popupCloseButtons = doc.querySelectorAll('.popup__close');
const editButton = doc.querySelector('.profile__edit-button');

const addButton = doc.querySelector('.profile__add-button');

const nameInput = doc.querySelector('#popup__name');
const aboutInput = doc.querySelector('#popup__about');

const profileName = doc.querySelector('.profile__name');
const profileDescription = doc.querySelector('.profile__description');

const popupImage = doc.querySelector('#popupImage');
const imagePopup = popupImage.querySelector('.image-popup__image');
const descrPopup = popupImage.querySelector('.image-popup__description');

const elems = doc.querySelector('.elements');

const inputCardName = doc.querySelector('#popup__title');
const inputCardLink = doc.querySelector('#popup__pic-link');

const initialCardsData = initialCardsDatas();

// Создает 6 карточек
initialCardsData.forEach(function (item) {
    addCard(item.name, item.link);
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

    // Лайк
    cardTemplate.querySelector('.elements__heart').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__heart_active');
    });

    // Удаление
    cardTemplate.querySelector('.elements__delete').addEventListener('click', function (event) {
        event.target.closest('.elements__card').remove();
    })

    // Попап изображения
    cardTemplate.querySelector('.elements__image').addEventListener('click', function (event) {
        openImagePopup(event.target);
    })

    return cardTemplate;
}

// Добавляет карточку
function addCard(name, image) {
    const card = createCard(name, image)
    // В начало списка добавляется готовая карточка
    elems.prepend(card);
}

// Открывает попап с изображением
function openImagePopup(targetImage) {
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
    activeModal.classList.remove('popup_opened');
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
    addCard(inputCardName.value, inputCardLink.value);
}

// Кнопка сохранения данных в профиль
popupEditProfile.addEventListener('submit', function () {
    event.preventDefault();
    saveInfoFromEditPopup();
    closePopup(popupEditProfile);
});

// Кнопка сохранения данных для новой карточки
popupAddCard.addEventListener('submit', function () {
    event.preventDefault();
    saveInfoFromAddPopup();
    closePopup(popupAddCard);
});

// Кнопка редактирования данных формы
editButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    fillInUserInputs();
});

// Кнопка добаления новых карточек
addButton.addEventListener('click', function () {
    openPopup(popupAddCard);
})

popupCloseButtons.forEach(function (item) {
    item.addEventListener('click', function (event) {
        closePopup(event.target.closest('.popup_opened'));
    })
})