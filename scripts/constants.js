const elems = document.querySelector('.elements');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('#edit-prof');
const popupAddCard = document.querySelector('#add-card');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const formSelector = '.popup__form';
const inputSelector = '.popup__input';

const KEY_CODE = 'Escape';

export { elems, editButton, addButton, popupAddCard, popupEditProfile, KEY_CODE, inputSelector, formSelector, profileName, profileDescription };