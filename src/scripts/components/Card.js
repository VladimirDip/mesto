export default class Card {
  constructor(cardData, templateSelector, popUpOpenImage) {
    this._cardData = cardData;
    // console.log(this._cardData);
    this._templateSelector = templateSelector;
    this._popUpOpenImage = popUpOpenImage;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._likeTarget = this._element.querySelector('.card__like');
    this._deleteImageButton = this._element.querySelector('.card__delete');
    this._imageTarget = this._element.querySelector('.card__image');
    this._imageTarget.src = this._cardData.link;
    this._imageTarget.alt = this._cardData.name;
    this._element.querySelector('.card__title').textContent =
      this._cardData.name;

    this._setEventListenerCards();
    return this._element;
  };

  _handleLikeClick = (evt) => {
    evt.target.classList.toggle('card__like_active');
  };

  _handleDeleteButton = (evt) => {
    const parentDeleteButton = evt.target.closest('.card');
    parentDeleteButton.remove();
  };

  _handleOpenImagePopup = (evt) => {
    this._cardData = { name: evt.target.alt, link: evt.target.src };

    this._popUpOpenImage(this._cardData);
  };

  _setEventListenerCards() {
    this._likeTarget.addEventListener('click', (e) => this._handleLikeClick(e));
    this._deleteImageButton.addEventListener('click', (e) =>
      this._handleDeleteButton(e)
    );

    this._imageTarget.addEventListener('click', this._handleOpenImagePopup);
  }
}