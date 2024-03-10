// Импорты необходимых функций и параметров
import { event } from 'jquery';
import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeButtonOn} from './components/card.js';
import { openPopup, closePopup, closeEscapeBtn, closePopupWindow} from './components/modal.js';

// Переменные для работы с попапами через DOM

    const editButton = document.querySelector('.profile__edit-button');
    const editWindow = document.querySelector('.popup_type_edit');

    const popupNewCard = document.querySelector('.popup_type_new-card');
    const newCardButton = document.querySelector('.profile__add-button');

    const popupImgOpen = document.querySelector('.popup_type_image');

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
    cardsContainer.append(createCard(element.name, element.link, deleteCard, likeButtonOn, openPopupImg));
});

// Открытие попапа c картинкой
function openPopupImg(linkCard, nameCard) {
    openPopup(popupImgOpen);
    popupImgOpen.querySelector('.popup__image').src = linkCard;
    popupImgOpen.querySelector('.popup__caption').textContent = nameCard;
}

// Вызовы открытия попапов
editButton.addEventListener('click', () => fillEditProfile(editWindow));
newCardButton.addEventListener('click',() => addNewCardOnPage(popupNewCard));

// Функция добавления стандартных значений при открытии
function fillEditProfile (editWindow) {
    formElement['name'].value = profileTitle.textContent;
    formElement['description'].value = profileDescription.textContent;
    openPopup(editWindow);
    formElement.addEventListener('submit', handleFormSubmit);    
}

function addNewCardOnPage (popupNewCard) {
    openPopup(popupNewCard);
    formNewCard.addEventListener('submit', handleNewCardSubmit);  
}

function handleFormSubmit(evt) {
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

    cardsContainer.prepend(createCard(placeName, linkInput, deleteCard, likeButtonOn, openPopupImg));
    formNewCard['link'].value = '';
    formNewCard['place-name'].value = '';
    closePopup(popupNewCard);
}