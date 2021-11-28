const elems = document.querySelector('.elements');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__avatar-edit-btn');
const agreementButton = document.querySelector('#popup__delete');

const popupEditProfile = document.querySelector('#edit-prof');
const popupAddCard = document.querySelector('#add-card');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');

const nameInput = document.querySelector('#popup__name');
const descriptionInput = document.querySelector('#popup__about');

const popupImage = document.querySelector('#popupImage')

const popupQuestion = document.querySelector('#popupQuestion');
const popupAvatar = document.querySelector('#popupAvatar');

const formQuerySelector = '.popup__form';
const inputQuerySelector = '.popup__input';

const KEY_CODE = 'Escape';

const popupOpenedClassSelector = 'popup_opened';
const popupCloseQuerySelector = '.popup__close'

const popupImageIdSelector = '#popupImage';
const imagePopupQuerySelector = '.image-popup__image';
const descriptionPopupSelector = '.image-popup__description';

const heartQuerySelector = '.elements__heart';
const deleteQuerySelector = '.elements__delete';
const imageQuerySelector = '.elements__image';
const heartNumberQuerySelector = '.elements__heart-number';

const elementsImageQuerySelector = '.elements__image';
const elementsNameQuerySelector = '.elements__name';


export {
    elems,
    editButton,
    addButton,
    agreementButton,
    popupAddCard,
    popupEditProfile,
    KEY_CODE,
    inputQuerySelector,
    formQuerySelector,
    profileName,
    profileDescription,
    profileAvatar,
    popupImageIdSelector,
    imagePopupQuerySelector,
    descriptionPopupSelector,
    nameInput,
    descriptionInput,
    popupOpenedClassSelector,
    popupCloseQuerySelector,
    heartQuerySelector,
    deleteQuerySelector,
    imageQuerySelector,
    heartNumberQuerySelector,
    elementsImageQuerySelector,
    elementsNameQuerySelector,
    popupImage,
    popupQuestion,
    popupAvatar,
    editAvatarButton,
};