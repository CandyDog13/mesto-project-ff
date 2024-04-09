// Общая функция открытия попапа
function openPopup(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('mousedown', closeByOverlayClick);
    document.addEventListener('keydown', handleEscapeKey);
}

// Общая функция закрытия попапа
function closePopup(modal) {
    modal.classList.remove('popup_is-opened');
    // openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('mousedown', closeByOverlayClick);
    document.removeEventListener('keydown', handleEscapeKey);
}

// Закрытие попапа по кликам (обработка событий)
function closeByOverlayClick (evt) {
    const needClassContain = evt.target.classList;
    if (needClassContain.contains('popup__close') ||
        needClassContain.contains('popup')) {
            const openedPopup = document.querySelector('.popup_is-opened');
            closePopup(openedPopup);
        }
}
// Закрытие по кнопре Escape
function handleEscapeKey (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

export {openPopup, closePopup, handleEscapeKey, closeByOverlayClick}