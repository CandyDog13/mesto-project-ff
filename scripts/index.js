// @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
    const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(nameCard, linkCard, deleteCardFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = linkCard;
    cardElement.querySelector('.card__title').textContent = nameCard;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCardFunc(cardElement));
      return cardElement;
  }

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function(element){
    cardsContainer.append(createCard(element.name, element.link, deleteCard));
});
