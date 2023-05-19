import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitClickFunction) {
    super(popupSelector);

    this._submitClickFunction = submitClickFunction.bind(this);
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input-form");
    this._submitButton = this._form.querySelector(".popup__button");
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // console.log("getInputValue => ", this._getInputsValue());
      // console.log(this);
      this._submitClickFunction(this._getInputsValue(), this._submitButton);
    });
  }

  _getInputsValue() {
    // console.log(Object.fromEntries(new FormData(this._form)));
    return Object.fromEntries(new FormData(this._form));
  }

  setInputsValue(data) {
    this._inputList.forEach((input) => {
      // console.log(input.name);
      input.value = data[input.name];
    });
  }
}
