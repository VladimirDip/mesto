export const configSelectors = {
  inputSelector: 'popup__input-form',
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

  _showInputError() {
    // console.log(errorElement.classList);
    this._inputElement.classList.add(this._validatorConfig.inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    // console.log(errorElement.textContent);
    this._errorElement.classList.add(this._validatorConfig.errorClass);
  }

  _hideInputError() {
    // console.log(this._inputElement.classList);
    this._inputElement.classList.remove(this._validatorConfig.inputErrorClass);
    this._errorElement.classList.remove(this._validatorConfig.errorClass);
    this._errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      // console.log(!inputElement.validity.valid, ' -has invalid');
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

  _checkInputValidity() {
    this._errorElement = this._formElement.querySelector(
      `.${this._inputElement.id}-input-error`
    );
    // console.log(this._errorElement);
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _setEventListener() {
    // console.log(this._buttonElement);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        // console.log(this._inputElement);
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._errorElement = this._formElement.querySelector(
        `.${this._inputElement.id}-input-error`
      );

      if (!inputElement.validity.valid) {
        this._hideInputError();
      }
    });
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
