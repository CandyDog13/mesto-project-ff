// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardTemplatePlacesItem = cardTemplate.querySelector('.places__item');

// Функция создания карточки
export function createCard(cardData, deleteCardFunc, handleLikeButton, openPopupImg) {
    const cardElement = cardTemplatePlacesItem.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src =  cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__like-number').textContent = cardData.likes.length;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCardFunc(cardElement));
    cardElement.querySelector('.card__like-button').addEventListener('click', handleLikeButton);
    cardImage.addEventListener('click',() => openPopupImg(cardData.link, cardData.name));
      return cardElement;
  }
  
  // Функция удаления карточки
  export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  // Добавление лайка
  export function handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }