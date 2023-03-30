const configSelectors = {
  inputSelector: 'popup__input-form',
  formSelector: 'popup__form',
  inputErrorClass: 'popup__input-form_type_error',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  errorClass: 'popup__input-error_active',
};
// console.log(configSelectors.errorClass);

const hideAllInputError = (form, inputList, configSelectors) => {
  inputList.forEach((inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-input-error`);

    if (!inputElement.validity.valid) {
      inputElement.classList.remove(`${configSelectors.inputErrorClass}`);
      errorElement.textContent = '';
      errorElement.classList.remove(`${configSelectors.errorClass}`);
    }
  });
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configSelectors
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add(`${configSelectors.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${configSelectors.errorClass}`);
};

const hideInputError = (formElement, inputElement, configSelectors) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  console.log(formElement);
  console.log(inputElement);
  inputElement.classList.remove(`${configSelectors.inputErrorClass}`);
  errorElement.classList.remove(`${configSelectors.errorClass}`);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // console.log(inputElement.value);
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, configSelectors) => {
  // console.log(inputList);
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(`${configSelectors.inactiveButtonClass}`);
  } else {
    buttonElement.removeAttribute('disabled');

    buttonElement.classList.remove(`${configSelectors.inactiveButtonClass}`);
  }
};

const checkInputValidity = (formElement, inputElement, configSelectors) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configSelectors
    );
  } else {
    hideInputError(formElement, inputElement, configSelectors);
  }
};

const setEventListener = (formElement, configSelectors) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`.${configSelectors.inputSelector}`)
  );
  // console.log(inputList);
  const buttonElement = formElement.querySelector(
    `.${configSelectors.submitButtonSelector}`
  );
  toggleButtonState(inputList, buttonElement, configSelectors);
  /*console.log(inputList);
  console.log(buttonElement);*/
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, configSelectors);
      toggleButtonState(inputList, buttonElement, configSelectors);
    });
  });
};

const enableValidation = (configSelectors) => {
  // console.log(configSelectors);
  document.querySelectorAll(`.${configSelectors.formSelector}`);
  const formList = Array.from(
    document.querySelectorAll(`.${configSelectors.formSelector}`)
  );
  // console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // console.log(formElement);
    setEventListener(formElement, configSelectors);
  });
};

enableValidation(configSelectors);
