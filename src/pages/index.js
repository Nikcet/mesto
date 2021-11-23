import "./index.css";
import initialCards from "../scripts/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import validationConfig from "../scripts/validationConfig.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import LocalImages from "../scripts/LocalImages.js";
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
    popupImage,
} from "../scripts/constants.js";

// Формы
const validationProfileForm = new FormValidator(
    validationConfig,
    popupEditProfile
);
validationProfileForm.enableValidation();
const validationAddCardForm = new FormValidator(validationConfig, popupAddCard);
validationAddCardForm.enableValidation();

// Разметка и отрисовка дефолтных карточек
const section = new Section(initialCards, renderer, elems);
section.renderItems();

// Попапы и их слушатели
const editProfilePopup = new PopupWithForm(popupEditProfile, profileFormSubmit);
editProfilePopup.setEventListeners();
const addCardPopup = new PopupWithForm(popupAddCard, cardFormSubmit);
addCardPopup.setEventListeners();
const imageModalWindow = new PopupWithImage(popupImage);
imageModalWindow.setEventListeners();

// Управление информацией профиля
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
}

// Кнопка редактирования профиля
editButton.addEventListener("click", () => {
    editProfilePopup.open();
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    descriptionInput.value = data.description;
});

// Кнопка добаления новых карточек
addButton.addEventListener("click", () => {
    addCardPopup.open();
});

// Колбэк класса попапа с картинкой - открывает модальное окно с изображением
function handleCardClick(data) {
    imageModalWindow.open(data);
}

// Рисует карточку в DOMе
function renderer(item) {
    const card = createCard(item);
    section.addItem(card);
}

// Вставляет локальные изображения в DOM
new LocalImages();
