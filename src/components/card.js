// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(nameCard, linkCard, deleteCardFunc, likeButtonOn, openPopupImg) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = linkCard;
    cardElement.querySelector('.card__title').textContent = nameCard;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCardFunc(cardElement));
    cardElement.querySelector('.card__like-button').addEventListener('click', likeButtonOn);
    cardElement.querySelector('.card__image').addEventListener('click',() => openPopupImg(linkCard, nameCard));
      return cardElement;
  }
  
  // Функция удаления карточки
  export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  // Добавление лайка
  export function likeButtonOn(evt) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        evt.target.classList.remove('card__like-button_is-active');
    } else {
        evt.target.classList.add('card__like-button_is-active');
    }
  }