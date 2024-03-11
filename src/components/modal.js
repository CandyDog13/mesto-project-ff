const popups = document.querySelectorAll('.popup');
// Общая функция открытия попапа
function openPopup(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('mousedown', closePopupWindow);
    document.addEventListener('keydown', handleEscapeKey);
}

// Общая функция закрытия попапа
function closePopup(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('mousedown', closePopupWindow);
    document.removeEventListener('keydown', handleEscapeKey);
}

// Закрытие попапа по кликам (обработка событий)
function closePopupWindow (evt) {
    const needClassContain = evt.target.classList;
    if (needClassContain.contains('popup__close') ||
        needClassContain.contains('popup')) {
            popups.forEach(closePopup);
        }
}
// Закрытие по кнопре Escape
function handleEscapeKey (evt) {
    if (evt.key === 'Escape') {
        popups.forEach(closePopup);
    }
}

export {openPopup, closePopup, handleEscapeKey, closePopupWindow}