import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._deleteCard = deleteCard;
    this._submitButton = this._popup.querySelector(".popup__delete");
    this._cardToDelete = null;
  }

  open(cardToDelete, indent) {
    super.open();
    this._cardToDelete = cardToDelete;
    this._indent = indent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) => {
      this._deleteCard(this._indent, this._cardToDelete, evt.target);
    });
  }
}
