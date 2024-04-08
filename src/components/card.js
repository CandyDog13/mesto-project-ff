import {cardDeleteFromServer, putLikeCardServer, deleteLikeCardServer} from './api';
import { closePopup } from './modal';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardTemplatePlacesItem = cardTemplate.querySelector('.places__item');

// Функция создания карточки
export function createCard(cardData, handleLikeButton, openPopupImg, profileId, popupDeleteElement, openPopup, dataInformation) {
    const cardElement = cloneCard(cardTemplatePlacesItem);
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardLikeNumber = cardElement.querySelector('.card__like-number');
    cardImage.src =  cardData.link;
    cardImage.alt = cardData.name;
    cardLikeNumber.textContent = cardData.likes.length;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    if (checkMyLikeCard(cardData.likes, profileId)) {
      likeButton.classList.add('card__like-button_is-active');
    };
    if (profileId === cardData.owner._id) {
      cardDeleteButton.addEventListener('click', () => {
        openPopup(popupDeleteElement);
        dataInformation.id = cardData._id;
        dataInformation.element = cardElement;
      })
      // } deleteCardFunc(cardElement, cardData._id));
    } else {
      cardDeleteButton.remove();
    }
    // cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCardFunc(cardElement));
    likeButton.addEventListener('click', ()=> handleLikeButton(cardLikeNumber, likeButton, cardData, profileId));
    cardImage.addEventListener('click',() => openPopupImg(cardData.link, cardData.name));
      return cardElement;
  }
  
  // Функция удаления карточки
  export function deleteCard(cardElement, cardId, deleteElement) {
    cardDeleteFromServer(cardId)
    .then(()=>{
      cardElement.remove();
      closePopup(deleteElement);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  }
  
  // Добавление лайка
  export function handleLikeButton(cardLikeNumber, likeButton, cardData, profileId) {
    if (checkMyLikeCard(cardData.likes, profileId)) {
      deleteLikeCardServer(cardData._id)
      .then(card=>{
        likeButton.classList.remove('card__like-button_is-active');
        cardLikeNumber.textContent = card.likes.length;
        cardData.likes = card.likes;
    }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
    } else {
      putLikeCardServer(cardData._id)
      .then(card=>{
        likeButton.classList.add('card__like-button_is-active');
        cardLikeNumber.textContent = card.likes.length;
        cardData.likes = card.likes;
      }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
    };
    // evt.target.classList.toggle("card__like-button_is-active");
  }

  function checkMyLikeCard(likesArray, profileId) {
    return likesArray.some(element=>{
      return element._id === profileId;
    })
  }

  function cloneCard(cloneElement) {
    return cloneElement.cloneNode(true)
  }