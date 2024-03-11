// Импорты необходимых функций и параметров
import { event } from 'jquery';
import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, handleLikeButton} from './components/card.js';
import { openPopup, closePopup, handleEscapeKey, closePopupWindow} from './components/modal.js';

// Переменные для работы с попапами через DOM

    const editButton = document.querySelector('.profile__edit-button');
    const editWindow = document.querySelector('.popup_type_edit');

    const popupNewCard = document.querySelector('.popup_type_new-card');
    const newCardButton = document.querySelector('.profile__add-button');

    const popupImgOpen = document.querySelector('.popup_type_image');

    const popupImgOpenSoursePic = popupImgOpen.querySelector('.popup__image');
    const popupImgOpenCaption = popupImgOpen.querySelector('.popup__caption');

// Переменные для работы с Редактированием
    const formElement=document.forms['edit-profile'];
    const profileTitle = document.querySelector('.profile').querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile').querySelector('.profile__description');

// Переменные для работы с созданием новой карточки
    const formNewCard=document.forms['new-place'];

// DOM узлы
    const cardsContainer = document.querySelector('.places__list');

// Вывести карточки на страницу
initialCards.forEach(function(element) {
    cardsContainer.append(createCard(element, deleteCard, handleLikeButton, openPopupImg));
});

// Открытие попапа c картинкой
function openPopupImg(linkCard, nameCard) {
    openPopup(popupImgOpen);
    popupImgOpenSoursePic.src = linkCard;
    popupImgOpenSoursePic.alt = nameCard;
    popupImgOpenCaption.textContent = nameCard;
}

// Вызовы открытия попапов
editButton.addEventListener('click', () => openProfilePopup(editWindow));
newCardButton.addEventListener('click',() => openCardPopup(popupNewCard));

// Функция добавления стандартных значений при открытии
function openProfilePopup (editWindow) {
    formElement['name'].value = profileTitle.textContent;
    formElement['description'].value = profileDescription.textContent;
    openPopup(editWindow);    
}

function openCardPopup (popupNewCard) {
    openPopup(popupNewCard);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameInput = formElement['name'].value;
    const jobInput = formElement['description'].value;
    profileTitle.textContent = nameInput;
    profileDescription.textContent = jobInput;
    closePopup(editWindow);
}

function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const placeName = formNewCard['place-name'].value;
    const linkInput = formNewCard['link'].value;

    const cardData = {name:placeName, link:linkInput};

    cardsContainer.prepend(createCard(cardData, deleteCard, handleLikeButton, openPopupImg));
    evt.target.reset()
    // formNewCard['link'].value = '';
    // formNewCard['place-name'].value = '';
    closePopup(popupNewCard);
}

formElement.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', handleNewCardSubmit);