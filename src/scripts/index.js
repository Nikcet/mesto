import '../pages/index.css';
import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import validationConfig from './validationConfig.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js'
import UserInfo from './UserInfo.js';
import LocalImages from './LocalImages.js';
import {
    elems,
    editButton,
    addButton,
    popupEditProfile,
    popupAddCard,
    profileName,
    profileDescription,
    nameInput,
    descriptionInput,
    popupImageIdSelector,
    imagePopupQuerySelector,
    descriptionPopupSelector,
} from './constants.js';


const validationProfileForm = new FormValidator(validationConfig, popupEditProfile);
const validationAddCardForm = new FormValidator(validationConfig, popupAddCard);

const section = new Section(initialCards, renderer, elems);
section.renderItems();

const editProfilePopup = new PopupWithForm(popupEditProfile, profileFormSubmit);
const addCardPopup = new PopupWithForm(popupAddCard, cardFormSubmit);
const imagePopup = new PopupWithImage(document.querySelector(popupImageIdSelector));

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

const userInfo = new UserInfo(profileName, profileDescription);

// Колбек формы редактирования профиля
function profileFormSubmit({ name, description }) {
    userInfo.setUserInfo(name, description);
}

// Колбек сабмита формы добавления карточек
function cardFormSubmit(data) {
    section.addItem(createCard(data));
}

// Создает разметку карточки
function createCard(item) {
    return new Card({ item, handleCardClick }, elems).createCard();
};

// Кнопка редактирования данных формы
editButton.addEventListener('click', () => {
    editProfilePopup.open();
    let data = userInfo.getUserInfo();
    nameInput.value = data.name;
    descriptionInput.value = data.description;

    // Запускает валидатор данных формы
    validationProfileForm.enableValidation();
});

// Кнопка добаления новых карточек
addButton.addEventListener('click', () => {
    addCardPopup.open();
    toggleButtonState(popupAddCard);
    // Запускает валидатор данных формы
    validationAddCardForm.enableValidation();
});


// Колбек класса попапа с картинкой - заполняет попап картинки данными
function handleCardClick(data) {
    const popupSelector = document.querySelector(popupImageIdSelector);
    const imageElementPopup = popupSelector.querySelector(imagePopupQuerySelector);
    const descrPopup = popupSelector.querySelector(descriptionPopupSelector);
    imageElementPopup.src = data.link;
    imageElementPopup.alt = data.name;
    descrPopup.textContent = data.name;

    imagePopup.open();
}

// Рисует карточку в DOMе
function renderer(item) {
    let card = createCard(item);
    section.addItem(card);
}

// ИЗМЕНИТЬ !!!!!Очищает форму добавления карточки во время ее открытия!!!!!
function clearDatasFromPopup(form) {
    const inputList = form.querySelectorAll('.popup__input');
    inputList.forEach(function (inputItem) {
        inputItem.value = '';
    })
}

// ИЗМЕНИТЬ !!!!!Переключение состояния кнопки!!!!!
function toggleButtonState(popup) {
    const button = popup.querySelector('.popup__submit-btn');

    button.disabled = true;
    button.classList.add('popup__submit-btn_disabled');
}

new LocalImages();