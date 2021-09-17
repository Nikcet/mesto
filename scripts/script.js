let doc = document.querySelector('.page');
let popupWindow = doc.querySelector('.popup');
let popupClose = doc.querySelector('.popup__close');

let editButton = doc.querySelector('.profile__edit-button');
let popupForm = doc.querySelector('.popup__form');

let profileName = doc.querySelector('.profile__name');
let profileDescription = doc.querySelector('.profile__description');

let nameInput = doc.querySelector('.popup__name');
let aboutInput = doc.querySelector('.popup__about');


function openPopup() {
    popupWindow.classList.add('popup_opened');
}


function setPopupFormFromProfile() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileDescription.textContent;
}


function closePopup() {
    popupWindow.classList.remove('popup_opened');
}


function saveInfoFromPopup() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
}


function formSubmitHandler(event) {
    event.preventDefault();
    saveInfoFromPopup();
    closePopup();
}


editButton.addEventListener('click', function () {
    openPopup();
    setPopupFormFromProfile();
});
popupClose.addEventListener('click', closePopup);

popupForm.addEventListener('submit', formSubmitHandler);
