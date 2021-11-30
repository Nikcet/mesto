import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import validationConfig from "../scripts/validationConfig.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import LocalImages from "../scripts/LocalImages.js";
import Api from "../components/Api.js";
import {
    elems,
    editButton,
    addButton,
    agreementButton,
    popupEditProfile,
    popupAddCard,
    profileName,
    profileDescription,
    profileAvatar,
    nameInput,
    descriptionInput,
    popupImage,
    popupQuestion,
    popupAvatar,
    editAvatarButton,
} from "../scripts/constants.js";

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-30',
    headers: {
        authorization: '38da116f-1cff-4ad4-9431-1c3278c91d81',
        'Content-Type': 'application/json'
    }
})

// Формы
const validationProfileForm = new FormValidator(validationConfig, popupEditProfile);
validationProfileForm.enableValidation();
const validationAddCardForm = new FormValidator(validationConfig, popupAddCard);
validationAddCardForm.enableValidation();

// Разметка и отрисовка карточек
const section = new Section(renderer, elems);

// Попапы и их слушатели
const editProfilePopup = new PopupWithForm(popupEditProfile, profileFormSubmit);
editProfilePopup.setEventListeners();
const addCardPopup = new PopupWithForm(popupAddCard, cardFormSubmit);
addCardPopup.setEventListeners();
const imageModalWindow = new PopupWithImage(popupImage);
imageModalWindow.setEventListeners();
const questionPopup = new Popup(popupQuestion);
questionPopup.setEventListeners();
agreementButton.addEventListener('click', () => deleteCardResolver(card));
const popupAvatarForm = new PopupWithForm(popupAvatar, avatarFormSubmit);
popupAvatarForm.setEventListeners();

// Управление информацией профиля
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

let userId = null;
let card = null;

// Старт проекта
Promise.all([api.getCards(), api.getUserInfo()])
    .then(([dataCards, dataUser]) => {
        userId = dataUser._id;
        userInfo.setUserInfo(dataUser.name, dataUser.about)
        userInfo.setAvatar(dataUser.avatar);
        section.renderItems(dataCards);
    })
    .catch(err => console.log('Что-то не так c дефолтной информацией.', err))

// Создает разметку карточки
function createCard(data) {
    return new Card({
        data: { ...data, currentUserId: userId },
        handleCardClick,
        handleLikeClick,
        handleDeleteClick,
    }, elems).createCard();
}

// Кнопка редактирования профиля
editButton.addEventListener("click", () => {
    editProfilePopup.open();
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    descriptionInput.value = data.description;
    validationProfileForm.resetValidation();
});

// Кнопка добаления новых карточек
addButton.addEventListener("click", () => {
    addCardPopup.open();
    validationAddCardForm.resetValidation();
});

// Кнопка редактирования аватара
editAvatarButton.addEventListener("click", () => {
    popupAvatarForm.open();
    // popupAvatarForm.resetValidation();
})

// Колбек формы редактирования профиля
function profileFormSubmit({ name, description }) {
    editProfilePopup.loading(true);
    api.sendProfileDatasToServer(name, description)
        .then(() => {
            userInfo.setUserInfo(name, description);
        })
        .catch(err => {
            console.log('Не удалось загрузить данные в профиль. ', err);
        })
        .finally(() => {
            editProfilePopup.close();
            editProfilePopup.loading(false);
        })
}

// Колбек сабмита формы добавления карточек
function cardFormSubmit(data) {
    addCardPopup.loading(true);
    api.postCard(data)
        .then(res => {
            section.addItem(createCard(res));
            addCardPopup.loading(false);
        })
        .catch(err => console.log('Карточка не добавилась. ', err))
        .finally(() => {
            addCardPopup.close();
        })
}

// Колбек сабмита формы обновления аватара
function avatarFormSubmit(data) {
    popupAvatarForm.loading(true);
    api.sendAvatarToServer(data.link)
        .then(res => {
            userInfo.setAvatar(res.avatar);
        })
        .catch(err => {
            console.log('Неудалось загрузить аватар', err);
        })
        .finally(() => {
            popupAvatarForm.close();
            popupAvatarForm.loading(false);
        })
}

// Колбэк для попапа удаления
function handleDeleteClick(cardData) {
    questionPopup.open();
    card = cardData;
}

// Удаляет карточку с сервера и из DOMа
function deleteCardResolver(cardData) {
    questionPopup.loading(true);
    api.deleteCard(cardData.id)
        .then(() => {
            cardData.deleteCard();
        })
        .catch(err => {
            console.log('Что-то пошло не так с удалениями: ', err)
        })
        .finally(() => {
            questionPopup.loading(false);
            questionPopup.close();
        });
}

// Колбэк класса попапа с картинкой - открывает модальное окно с изображением
function handleCardClick(data) {
    imageModalWindow.open(data);
}

// Колбэк класса Card - ставит лайк карточке на сервере
function handleLikeClick(card) {
    if (card.isLiked()) {
        return api.toggleCardLike(card.id, 'DELETE')
            .then(dataCard => {
                card.setLikes(dataCard);
            })
            .catch(err => {
                console.log('Что-то не так с удалением лайка: ', err)
            })
    } else {
        return api.toggleCardLike(card.id, 'PUT')
            .then(dataCard => {
                card.setLikes(dataCard);
            })
            .catch(err => {
                console.log('Что-то не так с лайком: ', err)
            });
    }
}


// Рисует карточку в DOMе
function renderer(item) {
    section.addItem(createCard(item));
}

// Вставляет локальные изображения в DOM
new LocalImages();
