export const configSelectors = {
  inputSelector: 'popup__input-form',
  // formSelector: 'popup__form',
  inputErrorClass: 'popup__input-form_type_error',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  errorClass: 'popup__input-error_active',
};

export class FormValidator {
  constructor(validatorConfig, formElement) {
    this._validatorConfig = validatorConfig;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(`.${validatorConfig.inputSelector}`)
    );
    this._buttonElement = formElement.querySelector(
      `.${configSelectors.submitButtonSelector}`
    );
  }

  _hideAllInputError() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-input-error`
      );
      // console.log(inputElement.validity.valid);
      inputElement.classList.remove(`${this._validatorConfig.inputErrorClass}`);
      errorElement.textContent = '';
      errorElement.classList.remove(`${this._validatorConfig.errorClass}`);
    });
  }

  _showInputError(inputElement) {
    // this._inputList.forEach((inputElement) => {
    //   // console.log(inputElement.id);
    //   const errorElement = this._formElement.querySelector(
    //     `.${inputElement.id}-input-error`
    //   );
    //   // console.log(errorElement.classList);
    //   inputElement.classList.add(`${this._validatorConfig.inputErrorClass}`);
    //   errorElement.textContent = inputElement.validationMessage;
    //   // console.log(errorElement.textContent);
    //   errorElement.classList.add(`${this._validatorConfig.errorClass}`);
    //   console.log(nameInput.value);
    //
    //   console.log('сюда зашло ', inputElement.value);
    // });

    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    );

    // console.log(errorElement.classList);
    inputElement.classList.add(`${this._validatorConfig.inputErrorClass}`);
    errorElement.textContent = inputElement.validationMessage;
    // console.log(errorElement.textContent);
    errorElement.classList.add(`${this._validatorConfig.errorClass}`);
  }

  _hideInputError(inputElement) {
    // this._inputList.forEach((inputElement) => {
    //   const errorElement = this._formElement.querySelector(
    //     `.${inputElement.id}-input-error`
    //   );
    //   inputElement.classList.remove(`${this._validatorConfig.inputErrorClass}`);
    //   errorElement.classList.remove(`${this._validatorConfig.errorClass}`);
    //   errorElement.textContent = '';
    // });

    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    );
    inputElement.classList.remove(`${this._validatorConfig.inputErrorClass}`);
    errorElement.classList.remove(`${this._validatorConfig.errorClass}`);
    errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      console.log(!inputElement.validity.valid, ' -has invalid');
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    // console.log(this._hasInvalidInput(inputList));
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute('disabled', '');
      this._buttonElement.classList.add(
        `${this._validatorConfig.inactiveButtonClass}`
      );
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(
        `${this._validatorConfig.inactiveButtonClass}`
      );
    }
  }

  _checkInputValidity(inputElement) {
    // this._inputList.forEach((inputElement) => {
    //   if (!inputElement.validity.valid) {
    //     this._showInputError();
    //     console.log(inputElement, ' THis');
    //   } else {
    //     this._hideInputError();
    //   }
    // });

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  /*Если мы не передаем inputElement то,
   появляется баг при валидации, что текст ошибки затираеться. Мы не можем взять
   именно не валидный инпут через this._*/
  _setEventListener() {
    // console.log(this._buttonElement);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._hideAllInputError();
    this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // console.log(this._formElement);
    });

    this._setEventListener();
  }
}
