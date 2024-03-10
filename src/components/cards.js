const arkhyzImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinskOblastImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const kholmogorskyRayonImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url)

export const initialCards = [
    {
      name: "Архыз",
      link: arkhyzImage,
    },
    {
      name: "Челябинская область",
      link: chelyabinskOblastImage,
    },
    {
      name: "Иваново",
      link: ivanovoImage,
    },
    {
      name: "Камчатка",
      link: kamchatkaImage,
    },
    {
      name: "Холмогорский район",
      link: kholmogorskyRayonImage,
    },
    {
      name: "Байкал",
      link: baikalImage,
    }
];