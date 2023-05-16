import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._deleteCard = deleteCard;
    this._submitButton = this._popup.querySelector(".popup__delete");
    this._cardToDelete = null;
  }

  open(cardToDelete) {
    super.open();
    this._cardToDelete = cardToDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      this._deleteCard(this._cardToDelete);
    });
  }
}
