export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close');
  }

  _closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _closeByButton = () => {
    this.close();
  };

  _closeByEmptyArea = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEscape);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEscape);
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._closeByButton);
    this._popup.addEventListener('click', this._closeByEmptyArea);
  }
}
