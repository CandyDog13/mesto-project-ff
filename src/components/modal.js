const closePopupElements = document.querySelectorAll('.popup');
// Общая функция открытия попапа
function openPopup(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('mousedown', closePopupWindow);
    document.addEventListener('keydown', closeEscapeBtn);
}

// Общая функция закрытия попапа
function closePopup(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('mousedown', closePopupWindow);
    document.removeEventListener('keydown', closeEscapeBtn);
}

// Закрытие попапа по кликам (обработка событий)
function closePopupWindow (evt) {
    const needClassContain = evt.target.classList;
    if (needClassContain.contains('popup__close') ||
        needClassContain.contains('popup') ||
        needClassContain.contains('popup__image')) {
            closePopupElements.forEach((element)=> closePopup(element));
        }
}
// Закрытие по кнопре Escape
function closeEscapeBtn (evt) {
    if (evt.key === 'Escape') {
        closePopupElements.forEach((element)=> closePopup(element));
    }
}

export {openPopup, closePopup, closeEscapeBtn, closePopupWindow}