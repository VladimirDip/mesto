export const configSelectors = {
  inputSelector: 'popup__input-form',
  // formSelector: 'popup__form',
  inputErrorClass: 'popup__input-form_type_error',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  errorClass: 'popup__input-error_active',
};
// console.log(configSelectors.errorClass);

/*const hideAllInputError = (form, inputList, configSelectors) => {
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
  /!*console.log(inputList);
  console.log(buttonElement);*!/
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

enableValidation(configSelectors);*/

export class FormValidator {
  constructor(settingObject, formElement) {
    this._settingObject = settingObject;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(`.${settingObject.inputSelector}`)
    );
    this._buttonElement = formElement.querySelector(
      `.${configSelectors.submitButtonSelector}`
    );
  }

  _hideAllInputError(form, inputList, settingObject) {
    inputList.forEach((inputElement) => {
      const errorElement = form.querySelector(
        `.${inputElement.id}-input-error`
      );
      console.log(inputElement.validity.valid);
      inputElement.classList.remove(`${settingObject.inputErrorClass}`);
      errorElement.textContent = '';
      errorElement.classList.remove(`${settingObject.errorClass}`);
    });
  }
  _showInputError(formElement, inputElement, errorMessage, settingObject) {
    const errorElement = formElement.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.add(`${settingObject.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${settingObject.errorClass}`);
  }

  _hideInputError(formElement, inputElement, settingObject) {
    const errorElement = formElement.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.remove(`${settingObject.inputErrorClass}`);
    errorElement.classList.remove(`${settingObject.errorClass}`);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, settingObject) {
    // console.log(this._hasInvalidInput(inputList));
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', '');
      buttonElement.classList.add(`${settingObject.inactiveButtonClass}`);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(`${settingObject.inactiveButtonClass}`);
    }
  }

  _checkInputValidity(formElement, inputElement, settingObject) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settingObject
      );
    } else {
      this._hideInputError(formElement, inputElement, settingObject);
    }
  }

  _setEventListener(formElement, settingObject) {
    // console.log(this._buttonElement);

    this._toggleButtonState(
      this._inputList,
      this._buttonElement,
      settingObject
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, settingObject);
        this._toggleButtonState(
          this._inputList,
          this._buttonElement,
          settingObject
        );
      });
    });
  }

  resetValidation() {
    this._hideAllInputError(
      this._formElement,
      this._inputList,
      this._settingObject
    );
    this._toggleButtonState(
      this._inputList,
      this._buttonElement,
      this._settingObject
    );
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // console.log(this._formElement);
    });

    this._setEventListener(this._formElement, this._settingObject);
  }
}
