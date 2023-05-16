import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitClickFunction) {
    super(popupSelector);

    this._submitClickFunction = submitClickFunction;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input-form");
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitClickFunction(this._getInputsValue());
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
