const doc = document.querySelector('.page');
const editWindow = doc.querySelector('#edit-prof');
const addWindow = doc.querySelector('#add-card');
const popupClose = doc.querySelectorAll('.popup__close');
const editButton = doc.querySelector('.profile__edit-button');

const addButton = doc.querySelector('.profile__add-button');

const likeButton = doc.querySelectorAll('.elements__heart');

const nameInput = doc.querySelector('#popup__name');
const aboutInput = doc.querySelector('#popup__about');

const profileName = doc.querySelector('.profile__name');
const profileDescription = doc.querySelector('.profile__description');

const elems = doc.querySelector('.elements');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


function initializeCards() {
    for (let i = 0; i < initialCards.length; i++) {
        addCard(initialCards[i].name, initialCards[i].link);
    }
}

function addCard(name, image) {
    const cardTemplate = doc.querySelector('.elements__template').content.cloneNode(true);
    cardTemplate.querySelector('.elements__image').src = image;
    cardTemplate.querySelector('.elements__image').alt = name;
    cardTemplate.querySelector('.elements__name').textContent = name;

    cardTemplate.querySelector('.elements__heart').addEventListener('click', function (event) {
        const likeButton = event.target;
        if (likeButton.classList.contains('elements__heart_active')) {
            likeButton.classList.remove('elements__heart_active');
        } else {
            likeButton.classList.add('elements__heart_active');
        }
    });

    cardTemplate.querySelector('.elements__delete').addEventListener('click', function (event) {
        event.target.closest('.elements__card').remove();
    })
    elems.prepend(cardTemplate);
}

function openPopup(object) {
    object.classList.add('popup_opened');
}

function closePopup() {
    const activeModal = doc.querySelector('.popup_opened');
    if (activeModal) {
        activeModal.classList.remove('popup_opened');
    } else {
        console.log(activeModal);
    }
}

function setPopupFormFromProfile() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileDescription.textContent;
}

function saveInfoFromEditPopup() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = aboutInput.value;
}

function saveInfoFromAddPopup() {
    const popupTitle = doc.querySelector('#popup__title');
    const popupPicLink = doc.querySelector('#popup__pic-link');
    addCard(popupTitle.value, popupPicLink.value);
}


editWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    saveInfoFromEditPopup();
    closePopup();
});

addWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    saveInfoFromAddPopup();
    closePopup();
});

editButton.addEventListener('click', function () {
    openPopup(editWindow);
    setPopupFormFromProfile();
});

addButton.addEventListener('click', function () {
    openPopup(addWindow);
})

for (let i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener('click', closePopup);
}


initializeCards();
