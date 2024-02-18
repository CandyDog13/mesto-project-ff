// @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
    const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(nameCard, linkCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = linkCard;
    cardElement.querySelector('.card__title').textContent = nameCard;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function(event) {
        deleteCard(event.target);
      })
    console.log(cardElement);
    cardsContainer.append(cardElement);
  }

// @todo: Функция удаления карточки
function deleteCard(indexOfDelete) {
    indexOfDelete.closest('.places__item').remove();

}
// @todo: Вывести карточки на страницу

initialCards.forEach(function(element){
    return addCard(element.name, element.link);
});
