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

// Создает 6 карточек
function initializeCards() {
    for (let i = 0; i < initialCards.length; i++) {
        addCard(initialCards[i].name, initialCards[i].link);
    }
}

// Добавляет новую карточку
function addCard(name, image) {
    // Копирует шаблон разметки
    const cardTemplate = doc.querySelector('.elements__template').content.cloneNode(true);
    // Заполняет шаблон данными
    cardTemplate.querySelector('.elements__image').src = image;
    cardTemplate.querySelector('.elements__image').alt = name;
    cardTemplate.querySelector('.elements__name').textContent = name;

    // Лайк
    cardTemplate.querySelector('.elements__heart').addEventListener('click', function (event) {
        const likeButton = event.target;
        if (likeButton.classList.contains('elements__heart_active')) {
            likeButton.classList.remove('elements__heart_active');
        } else {
            likeButton.classList.add('elements__heart_active');
        }
    });

    // Удаление
    cardTemplate.querySelector('.elements__delete').addEventListener('click', function (event) {
        event.target.closest('.elements__card').remove();
    })

    // Попап изображения
    cardTemplate.querySelector('.elements__image').addEventListener('click', function (event) {
        const popupImage = doc.querySelector('#popupImage');
        openImagePopup(event.target, popupImage);
    })

    // В начало списка добавляется готовая карточка
    elems.prepend(cardTemplate);
}

// Открывает попап с изображением
function openImagePopup(targetImage, popupImage) {
    popupImage.querySelector('.image-popup__image').src = targetImage.src;
    popupImage.querySelector('.image-popup__image').alt = targetImage.alt;
    popupImage.querySelector('.image-popup__description').textContent = targetImage.alt;

    openPopup(popupImage);

    // Кнопка закрытия попапа
    popupImage.querySelector('.image-popup__close-btn').addEventListener('click', function () {
        closePopup(popupImage);
    })
}

// Открывает попап
function openPopup(object) {
    object.classList.add('popup_opened');
}

// Закрывает попап
function closePopup() {
    const activeModal = doc.querySelector('.popup_opened');
    if (activeModal) {
        activeModal.classList.remove('popup_opened');
    }
}

// Заполняет поля формы данными из профиля
function setPopupFormFromProfile() {
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
    const popupTitle = doc.querySelector('#popup__title');
    const popupPicLink = doc.querySelector('#popup__pic-link');
    addCard(popupTitle.value, popupPicLink.value);
}

// Кнопка сохранения данных в профиль
editWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    saveInfoFromEditPopup();
    closePopup();
});

// Кнопка сохранения данных для новой карточки
addWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    saveInfoFromAddPopup();
    closePopup();
});

// Кнопка редактирования данных формы
editButton.addEventListener('click', function () {
    openPopup(editWindow);
    setPopupFormFromProfile();
});

// Кнопка добаления новых карточек
addButton.addEventListener('click', function () {
    openPopup(addWindow);
})

// Находит все кнопки закрытия форм и вешает на них закрывалку
for (let i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener('click', closePopup);
}

// Собирает карточки
initializeCards();
