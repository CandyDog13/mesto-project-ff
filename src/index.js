// Импорты необходимых функций и параметров
import { data, event } from "jquery";
import "./pages/index.css";
import { createCard, deleteCard, handleLikeButton } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getProfileInformation,
  editProfileServer,
  postNewCardServer,
  editAvatarServer,
} from "./components/api.js";
import { renderLoading } from "./components/loader.js";

// Переменные для работы с попапами через DOM

const editButton = document.querySelector(".profile__edit-button");
const editWindow = document.querySelector(".popup_type_edit");
const editAvatar = document.querySelector(".popup_edit_avatar");

const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardButton = document.querySelector(".profile__add-button");

const popupImgOpen = document.querySelector(".popup_type_image");

const popupImgOpenSoursePic = popupImgOpen.querySelector(".popup__image");
const popupImgOpenCaption = popupImgOpen.querySelector(".popup__caption");

// Переменные для работы с Редактированием
const profileFormElement = document.forms["edit-profile"];
const profileTitle = document
  .querySelector(".profile")
  .querySelector(".profile__title");
const profileDescription = document
  .querySelector(".profile")
  .querySelector(".profile__description");
const profileImage = document
  .querySelector(".profile")
  .querySelector(".profile__image");

// Переменные для работы с созданием новой карточки
const formNewCard = document.forms["new-place"];
const formAvatarEdit = document.forms["edit-avatar"];

// Переменные для лоадера
const buttonSubmitPrifileEdit =
  profileFormElement.querySelector(".popup__button");
const buttonSubmitNewCard = formNewCard.querySelector(".popup__button");
const buttonSubmitAvatarEdit = formAvatarEdit.querySelector(".popup__button");

// DOM узлы
const cardsContainer = document.querySelector(".places__list");

// Попап удаления
const popupDeleteElement = document.querySelector(".popup_delete_card");
const popupDeleteButton = document.forms["delete-button"];

const dataInformation = {
  id: "",
  element: "",
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Получение информации с сервера
Promise.all([getInitialCards(), getProfileInformation()])
  .then(([cardsServerAnswer, informationServerAnswer]) => {
    profileTitle.textContent = informationServerAnswer.name;
    profileDescription.textContent = informationServerAnswer.about;
    profileImage.style.backgroundImage = `url(${informationServerAnswer.avatar})`;
    cardsServerAnswer.forEach(function (element) {
      cardsContainer.append(
        createCard(
          element,
          handleLikeButton,
          openPopupImg,
          informationServerAnswer._id,
          popupDeleteElement,
          openPopup,
          dataInformation
        )
      );
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

// Открытие попапа c картинкой
function openPopupImg(linkCard, nameCard) {
  openPopup(popupImgOpen);
  popupImgOpenSoursePic.src = linkCard;
  popupImgOpenSoursePic.alt = nameCard;
  popupImgOpenCaption.textContent = nameCard;
}

enableValidation(validationConfig);

// Вызовы открытия попапов
profileImage.addEventListener("click", () => {
  clearValidation(editAvatar, validationConfig);
  openPopup(editAvatar);
});
editButton.addEventListener("click", () => openProfilePopup(editWindow));
newCardButton.addEventListener("click", () => {
  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard);
});

// Функция добавления стандартных значений при открытии
function openProfilePopup(editWindow) {
  profileFormElement["name"].value = profileTitle.textContent;
  profileFormElement["description"].value = profileDescription.textContent;
  clearValidation(profileFormElement, validationConfig);
  openPopup(editWindow);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitPrifileEdit);
  const nameInput = profileFormElement["name"].value;
  const jobInput = profileFormElement["description"].value;
  editProfileServer(nameInput, jobInput)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      closePopup(editWindow);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderLoading(false, buttonSubmitPrifileEdit));
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitNewCard);
  const placeName = formNewCard["place-name"].value;
  const linkInput = formNewCard["link"].value;

  postNewCardServer(placeName, linkInput)
    .then((card) => {
      cardsContainer.prepend(
        createCard(
          card,
          handleLikeButton,
          openPopupImg,
          card.owner._id,
          popupDeleteElement,
          openPopup,
          dataInformation
        )
      );
      evt.target.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderLoading(false, buttonSubmitNewCard));
}

function handleEditAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitAvatarEdit);
  const linkAvatar = formAvatarEdit["link"].value;
  editAvatarServer(linkAvatar)
    .then((serverAvatar) => {
      profileImage.style.backgroundImage = `url(${serverAvatar.avatar})`;
      evt.target.reset();
      closePopup(editAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderLoading(false, buttonSubmitAvatarEdit));
}
// слушатели на форму редактирования
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// слушатели на форму создания новой карточки
formNewCard.addEventListener("submit", handleNewCardSubmit);

// слушатель на форму смены аватара
formAvatarEdit.addEventListener("submit", handleEditAvatar);

popupDeleteButton.addEventListener("submit", () => {
  deleteCard(dataInformation.element, dataInformation.id, popupDeleteElement);
});
