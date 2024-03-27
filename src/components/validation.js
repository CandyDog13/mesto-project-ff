
const validDomElement = {};

// const validDomElement = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// }

// Новые функции
function enableValidation(validDomElement) {
    const formList = Array.from(document.querySelectorAll(validDomElement.formSelector));
    formList.forEach((formElement)=> {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(formElement, validDomElement);
    });
}

function setEventListeners(formElement, validDomElement) {
    const inputList = Array.from(formElement.querySelectorAll(validDomElement.inputSelector));
    const buttonElement = formElement.querySelector(validDomElement.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validDomElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validDomElement);
        toggleButtonState(inputList, buttonElement, validDomElement);
      });
    });
};

function checkInputValidity(formElement, inputElement, validDomElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      showErrorInput(formElement, inputElement, inputElement.validationMessage, validDomElement);
    } else {
      hideErrorInput(formElement, inputElement, validDomElement);
    }
}


// Функция показывает ошибку в строке при невалидной форме
function showErrorInput(formElement, inputElement, errorMessage, validDomElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validDomElement.inputErrorClass);
    errorElement.textContent=errorMessage;
    errorElement.classList.add(validDomElement.errorClass);
    //из примера:
    //input.classList.add('form__input_type_error');
    //formError.textContent = errorMessage;
    //formError.classList.add('form__input-error_active');
}

function hideErrorInput(formElement, inputElement, validDomElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validDomElement.inputErrorClass);
    errorElement.textContent='';
    errorElement.classList.remove(validDomElement.errorClass);
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement)=>{
      return !inputElement.validity.valid;
    });
};


function toggleButtonState(inputList, buttonElement, validDomElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validDomElement.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validDomElement.inactiveButtonClass);
      buttonElement.disabled = false;
    };
  };

  function clearValidation (formElement, validDomElement) {
  const inputList = Array.from(formElement.querySelectorAll(validDomElement.inputSelector));
  const buttonElement = formElement.querySelector(validDomElement.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideErrorInput(formElement, inputElement, validDomElement)
  });
  toggleButtonState(inputList, buttonElement, validDomElement);
  }

export {enableValidation, clearValidation}