const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id} + .popup__error`);
  inputElement.classList.add(enableValidation.inputErrorClass);
  errorElement.classList.add(enableValidation.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id} + .popup__error`);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  errorElement.classList.remove(enableValidation.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(enableValidation.inactiveButtonClass);
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove(enableValidation.inactiveButtonClass);
    submitButtonSelector.disabled = false;
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const submitButtonSelector = formElement.querySelector(enableValidation.submitButtonSelector);
  // toggleButtonState(inputList, submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
};

const enableValidate = () => {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      closePopup(profilePopup);
    });
    setEventListeners(formElement);
  });
};

enableValidate(enableValidation);